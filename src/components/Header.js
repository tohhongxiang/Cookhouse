import React from "react"
import DatePicker from  "react-datepicker";
import Form from "react-bootstrap/Form"
import "react-datepicker/dist/react-datepicker.css";

class Header extends React.Component {
	changeStartDate = (date) => {
		this.props.changeStartDate(date.setHours(0,0,0,0));
		
	}

	changeEndDate = (date) => {
		this.props.changeEndDate(date.setHours(0,0,0,0));
		
	}

	render() {
		return (
		<div className="header">
			<h1> Welcome to the cookhouse </h1>
			<Form className="date-pickers">
				<Form.Label className="datePickerLabel">
				Start: 
				</Form.Label>
					<DatePicker 
					className="startDatePicker"
					selectsStart 
					dateFormat="dd/MM/yyyy" 
					selected={this.props.startDate} 
					onChange={this.changeStartDate}/>
				   
				<Form.Label className="datePickerLabel">
				End:
				</Form.Label>
					<DatePicker 
					className="endDatePicker"
					selectsEnd 
					dateFormat="dd/MM/yyyy" 
					selected={this.props.endDate} 
					onChange={this.changeEndDate}
					minDate={this.props.startDate}/>
				
			</Form>
		</div>
		)
	}
	
}


export default Header;