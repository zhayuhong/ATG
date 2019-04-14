import React, {Component} from "react"
import {Redirect, Route, HashRouter} from "react-router-dom"

class History extends Component {

	constructor(props) {
		super(props)
	}

	componentDidMount() {
		this.props.handleAppBarTitleChange("History")
	}

	render() {
		var teamName = this.props.teamName
		return(
			<div className="container">
				<p style={{marginTop: '100px'}}>
					{ "Submit Success!" }
				</p>
			</div>
		)
	}
}

export default History