export function dayToString(day) {
	// gets an integer (day) and return the string representation of the day
	const day_array = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	return day_array[day];
}

export function zeroPad(number){
	// if number is single digit, add a zero infront
	number = parseInt(number);
	return number < 10 ? "0"+ number.toString() : number;
}

export function getNearestMonday()
{
    var date = new Date();
    var day = date.getDay();
    var monday;
    if(date.getDay() === 1){
        monday = new Date().setDate(date.getDate());
    }
    else{
        monday = new Date().setDate(date.getDate() - day + 1);
    }

    return new Date(new Date(monday).setHours(0,0,0,0));
}

export function getCurrentWeek() {
	let startDate = getNearestMonday();
	let endDate = new Date(startDate);
	endDate.setDate(endDate.getDate() + 4);

	return {startDate, endDate};
}

export function displayDate(date_in) { // accepts a date object, turns it into string representation
	let date = zeroPad(date_in.getDate());
	let month = zeroPad(date_in.getMonth() + 1); 
	let year = zeroPad(date_in.getFullYear());

	return `${date}/${month}/${year}`;
}

export function displayDay(date_in) {
	return dayToString(date_in.getDay());
}

export function getTodayDate() {
	return new Date(new Date().setHours(0,0,0,0));
}