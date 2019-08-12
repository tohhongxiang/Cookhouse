const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
    subMenuType: String,
    menuList: [String],
});

const MealSchema = new Schema({
    mealType: String,
    menuList: [MenuSchema]
});

const DaySchema = new Schema({
    date: Date,
    menu: [MealSchema]
});

module.exports = mongoose.model("DayMenus", DaySchema);