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

export function getPreviousMonday()
{
    let date = new Date();
    let day = date.getDay();
    let prevMonday;
    if(date.getDay() === 0){
        prevMonday = new Date().setDate(date.getDate() - 7);
    }
    else{
        prevMonday = new Date().setDate(date.getDate() - day);
    }

    return prevMonday;
}

export function displayDate(date_in) { // accepts a date object, turns it into string representation
	let day = dayToString(date_in.getDay());
	let date = zeroPad(date_in.getDate());
	let month = zeroPad(date_in.getMonth() + 1); 
	let year = zeroPad(date_in.getFullYear());

	return `${day} \n ${date}/${month}/${year}`;
}