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

DaySchema.statics.findByDate = function(date, callback) {
    return this.find({date}, callback);
}

DaySchema.statics.updateByDate = function(date, updatedDay) {
    let currentDay = this.find({date});
    currentDay = {...updatedDay};
    currentDay.save()
}

module.exports = mongoose.model("DayMenus", DaySchema);