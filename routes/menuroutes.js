const express = require('express');
const router = express.Router();

const DayMenus = require('../models/DayMenusModel.js');

// GET ALL 
router.get('/all', (req, res) => {
    DayMenus.find()
    .sort({date: 1})
    .then( dayMenus => {
        res.json(dayMenus);
    })
});

// GET ONE BY ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    DayMenus.find(id, (err, daymenu) => {
        if (!daymenu) {
            res.status(404).json({
                msg:`Failed to find data with id ${id}`
            });
        } else {
            res.json(daymenu);
        }
    });
});

// GET ALL WITHIN STARTDATE AND ENDDATE (INCLUSIVE)
router.get('/', (req, res) => {
    const {startDate, endDate} = req.query;
    DayMenus.find({
        date: {$gte: startDate, $lte: endDate}
    }).sort({date: 1}) //sort by ascending dates
    .then(daymenus => {
        res.json(daymenus);
    }).catch(err => {
        res.json({
            msg: "Failed",
            err
        });
    });
})

// Add new menu
router.post('/', (req, res) => {
    const newMenu = new DayMenus({
        ...req.body
    });

    console.log(newMenu);
    newMenu.save()
    .then(() => res.json({
        msg: "Successfully added menu entry",
        item: newMenu
    })).catch(err => console.log(err));
});

// Delete menu by date
router.delete('/:date', (req, res) => {
    const date = req.params.date;
    DayMenus.deleteOne({date}, (err) => {
        if (err) {
            console.log(err);
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

//modify menu
router.post('/:date', (req, res) => {
    const date = req.params.date;
    const updatedMenu = new DayMenus({
        ...req.body
    });
    console.log(updatedMenu);
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