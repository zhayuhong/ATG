import React, {Component} from "react"
import {Redirect, Route, HashRouter} from "react-router-dom"
import './TicketForm.css'

class TicketForm extends Component {

	constructor(props) {
		super(props)
		this.state = {
			redirectToComfirmation: false, 
			error: false
		}
	}

	componentDidMount() {
		this.props.handleAppBarTitleChange("Upload")
	}

	handleSubmit = (e) => {
		e.preventDefault()
		if (this.props.state.teamName === "") {
			this.setState({
				error: true
			})
		}
		else {
			this.setState({
				redirectToComfirmation: true
			})
		}
	}

	render() {
		const {redirectToComfirmation, error} = this.state
		return(
			<div className="container ticketform">
				{
					error && 
					<div className="alert alert-danger" role="alert">
				  		A simple danger alert—check it out!
					</div>
				}
				{
					redirectToComfirmation && 
					<Redirect to="/history" />
				}
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group">
				    <label>Team Name</label>
				    <input type="text" className="form-control" placeholder="Enter Team Name" onChange={this.props.handleTeamChange}/>
				  </div>
				  <div className="form-group">
				    <label>Ticket ID</label>
				    <input type="text" className="form-control" placeholder="Ticket ID" onChange={this.props.handleTicketChange}/>
				  </div>
				  <label>Report</label>
				  <div className="form-group">
				    <input type="file" className="" onChange={this.props.handleFile}/>
				    <label className="custom-file-label">Choose file...</label>
				  </div>
				  <button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
		)
	}
}

export default TicketForm