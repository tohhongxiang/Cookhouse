const express = require('express');
const router = express.Router();
const verify = require('./verifyToken'); // middleware which we will include for private routes
const DayMenus = require('../models/DayMenusModel.js');

// /api/menus/all
// gets all menus 
// PUBLIC
router.get('/all', (req, res) => {
    DayMenus.find()
    .sort({date: 1})
    .then( dayMenus => {
        return res.json(dayMenus);
    })
});

// /api/menus/:id
// gets 1 menu by id
// PUBLIC
router.get('/:id', (req, res) => {
    const id = req.params.id;
    DayMenus.find(id, (err, daymenu) => {
        if (err) {
            return res.status(400).send(err);
        }
        if (!daymenu) {
            return res.status(404).json({
                msg:`Failed to find data with id ${id}`
            });
        } else {
            return res.json(daymenu);
        }
    });
});

// /api/menus/
// GET ALL WITHIN STARTDATE AND ENDDATE (INCLUSIVE)
// PUBLIC
router.get('/', (req, res) => {
    const {startDate, endDate} = req.query;
    DayMenus.find({
        date: {$gte: startDate, $lte: endDate}
    }).sort({date: 1}) //sort by ascending dates
    .then(daymenus => {
        return res.json(daymenus);
    }).catch(err => {
        return res.json({
            msg: "failed",
            err
        });
    });
})

// /api/menus
// Add new menu
// PRIVATE
router.post('/', verify, (req, res) => {
    const newMenu = new DayMenus({
        ...req.body
    });

    newMenu.save()
    .then(() => res.json({
        msg: "Successfully added menu entry",
        item: newMenu
    })).catch(err => {
        return res.json({
            msg: 'failed',
            err
        })
    });
});

// /api/menus/:date
// Delete menu by date
// PRIVATE
router.delete('/:date', verify, (req, res) => {
    const date = req.params.date;
    DayMenus.deleteOne({date}, (err) => {
        if (err) {
            res.json({
                msg: "Failed",
                err
            });
        } else {
            res.json({
                msg: "Success",
                date
            });
        } 
    })
});

// /api/menu/:date
// Modify menu by date
// PRIVATE
router.post('/:date', verify, (req, res) => {
    const date = req.params.date;
    const updatedMenu = new DayMenus({
        ...req.body
    });
    DayMenus.updateOne({date}, updatedMenu, (err, daymenu) => {
        if (err) {
            res.json({
                msg:"Failed"
            });
        } else {
            res.json({
                msg:"success",
                updatedMenu
            })
        }
    });
});

module.exports = router;