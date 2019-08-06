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
			<Form className="date-pickers">
				<div className="startDatePicker-container">
					<Form.Label className="datePickerLabel">
					Start: 
					</Form.Label>
						<DatePicker 
						className="startDatePicker"
						popperPlacement="bottom"
						selectsStart 
						dateFormat="dd/MM/yyyy" 
						selected={this.props.startDate} 
						onChange={this.changeStartDate}
						/>
				</div>  
				<div className="endDatePicker-container">
					<Form.Label className="datePickerLabel">
					End:
					</Form.Label>
						<DatePicker 
						popperPlacement="bottom"
						className="endDatePicker"
						selectsEnd 
						dateFormat="dd/MM/yyyy" 
						selected={this.props.endDate} 
						onChange={this.changeEndDate}
						minDate={this.props.startDate}/>
				</div>
			</Form>
		</div>
		)
	}
	
}


export default Header;