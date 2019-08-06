import React, {Component} from "react"
import {Redirect, Route, HashRouter} from "react-router-dom"
import LinesEllipsis from 'react-lines-ellipsis'
import './History.css';

class History extends Component {

	constructor(props) {
		super(props)
		this.addComponentHigh = this.addComponentHigh.bind(this)
		this.addComponentLow = this.addComponentLow.bind(this)
		this.addComponentMinimal = this.addComponentMinimal.bind(this)
	}

	componentDidMount() {
		this.props.handleAppBarTitleChange("History")
		this.props.handleHistory()
	}

	addComponentHigh(item) {
		return(
			<div className = "col-md-6 col-lg-6 col-xl-4">
						<div className="card mb-3" style={{maxWidth: '24rem'}}>
							<div className="card-header bg-danger text-white ">{item.ticket_name}
								<div> 
									<small className="text-small">{item.team_name}</small>
								</div>
							</div>
							<div className="card-body">
								<h5 className="card-title">{item.summary}</h5>
								<div className="text-limit">
									{item.description}
								</div>
							</div>
							<div class="card-footer">
							    <small className="text-muted">{"Last Updated " + item.submission_date}</small>
							</div>
						</div>
					</div>
			)
	}

	addComponentLow(item) {
		return(
			<div className = "col-md-6 col-lg-6 col-xl-4">
						<div className="card mb-3" style={{maxWidth: '24rem'}}>
							<div className="card-header bg-warning text-white ">{item.ticket_name}
								<div> 
									<small className="text-small">HTTP team</small>
								</div>
							</div>
							<div className="card-body">
								<h5 className="card-title">HTTP Strict Transport Security (HSTS) Not Implemented</h5>
								<div className="text-limit">
									The server does not implement the ''HTTP Strict -Transport Security'' (HSTS) web security 
									policy mechanism. When HSTS is enabled, the web application sends a special response header, 
									'Strict -Transport -Security'' to the client with a duration of time specified. Once a 
									supported browser receives this header, that browser will only make requests to the application 
									er HTTPS for the duration of time specified in the header. Any links to resources over HTTP will 
									be rewritten to HTTPS before the request is made. Applications that do not utilize the ''HTTP 
									Strict -Transport Security'' policy are more susceptible to man -in -the -middle attacks via 
									SSL stripping, which occurs when an attacker transparently downgrades a victim's communication 
									with the server from HTTPS to HTTP. Once this is accomplished, the attacker will gain the ability 
									to view and potentially modify the victim's traffic, exposing sensitive information and gaining 
									access to unauthorized functionality.
								</div>
							</div>
							<div class="card-footer">
							    <small className="text-muted">Last Updated May 5th</small>
							</div>
						</div>
					</div>
			)
	}

	addComponentMinimal(item) {
		return(
			<div className = "col-md-6 col-lg-6 col-xl-4">
						<div className="card mb-3" style={{maxWidth: '24rem'}}>
							<div className="card-header bg-success text-white ">{item.ticket_name}
								<div> 
									<small className="text-small">HTTP team</small>
								</div>
							</div>
							<div className="card-body">
								<h5 className="card-title">HTTP Strict Transport Security (HSTS) Not Implemented</h5>
								<div className="text-limit">
									The server does not implement the ''HTTP Strict -Transport Security'' (HSTS) web security 
									policy mechanism. When HSTS is enabled, the web application sends a special response header, 
									'Strict -Transport -Security'' to the client with a duration of time specified. Once a 
									supported browser receives this header, that browser will only make requests to the application 
									er HTTPS for the duration of time specified in the header. Any links to resources over HTTP will 
									be rewritten to HTTPS before the request is made. Applications that do not utilize the ''HTTP 
									Strict -Transport Security'' policy are more susceptible to man -in -the -middle attacks via 
									SSL stripping, which occurs when an attacker transparently downgrades a victim's communication 
									with the server from HTTPS to HTTP. Once this is accomplished, the attacker will gain the ability 
									to view and potentially modify the victim's traffic, exposing sensitive information and gaining 
									access to unauthorized functionality.
								</div>
							</div>
							<div class="card-footer">
							    <small className="text-muted">Last Updated May 5th</small>
							</div>
						</div>
					</div>
			)
	}

	render() {
		var teamName = this.props.teamName
		var history = this.props.state.history
		console.log(history[0])
		var count = 0
		var hisArray = []
		// var totalComponent = this.addComponent()
		// for (count = 0; count < history.length; count++) {
		// 	hisArray = totalComponent + this.addComponent()
		// }
		for (var key in history) {
			hisArray.push(history[key])
			console.log(history[key])
		}

		// var com = this.addComponent()
		return(
			<div className="container" style={{marginTop: '100px'}}>
				<div className="row">
					{
					            hisArray.map ( (item) => {
					            	if (item.severity == 'High') {
					            		return this.addComponentHigh(item)
					            	} else if (item.severity == 'Low') {
					            		return this.addComponentLow(item)
					            	} else if (item.severity == 'Minimal') {
					            		return this.addComponentMinimal(item)
					            	}
					            })

					        }
					
				</div>
			</div>
		)
	}
}

export default History