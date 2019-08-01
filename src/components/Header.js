import React from "react"
import DatePicker from  "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { displayDate } from "../utils/helpers.js";

class Header extends React.Component {
	constructor(props){
		super(props);
	}

	changeStartDate = (date) => {
		let date_ = date.setHours(0,0,0,0);
		this.props.changeStartDate(date_);
		
	}

	changeEndDate = (date) => {
		let date_ = date.setHours(0,0,0,0);
		this.props.changeEndDate(date_);
		
	}

	render() {
		return (
		<div className="header">
			<h1> Welcome to the cookhouse </h1>
			<div className="date-pickers">
				<span>
					<DatePicker 
					className="startDatePicker"
					selectsStart 
					dateFormat="dd/MM/yyyy" 
					selected={this.props.startDate} 
					onChange={this.changeStartDate}/>
				</span> - 
				<span>
					<DatePicker 
					className="endDatePicker"
					selectsEnd 
					dateFormat="dd/MM/yyyy" 
					selected={this.props.endDate} 
					onChange={this.changeEndDate}
					minDate={this.props.startDate}/>
				</span>
			</div>
		</div>
		)
	}
	
}


export default Header;