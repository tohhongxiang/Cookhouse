const express = require('express');
const router = express.Router();

const DayMenus = require('../models/DayMenusModel.js');

// GET ALL 
router.get('/', (req, res) => {
    DayMenus.find()
    .sort({date: -1})
    .then( dayMenus => {
        res.json(dayMenus);
    })
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    DayMenus.findById(id, (err, daymenu) => {
        if (!daymenu) {
            res.status(404).json({
                msg:`Failed to find data with id ${id}`
            });
        } else {
            res.json(daymenu);
        }
    });
});

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

router.put('/:id', (req, res) => {
    const id = req.params.id;
    console.log(req.body);
    const updatedMenu = new DayMenus({
        ...req.body
    });
    DayMenus.findById(id, (err, daymenu) => {
        if (!daymenu) {
            res.status(404).json({
                msg:`Failed to find data with id ${id}`
            });
        } else {
            daymenu.date = updatedMenu.date;
            daymenu.menu = updatedMenu.menu;
            console.log("DAT DAYMENYU", daymenu);
            daymenu.save().then(daymenu => {
                console.log("Updated daymenu");
                res.json({
                    msg: "Updated menu successfully",
                    daymenu
                });
            }).catch(err => {
                console.log(err);
                res.json({
                    msg: "Failed to update menu",
                    err
                });
            });
        }
    }).catch(err => {
        console.log(err);
        res.json({
            msg: "Failed to update menu",
            err
        });
    });
});

module.exports = router;