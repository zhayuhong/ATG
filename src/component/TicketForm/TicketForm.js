import React, {Component} from "react"
import {Redirect, Route, HashRouter} from "react-router-dom"
import './TicketForm.css'
import axios from 'axios';

var querystring = require('querystring');
var http = require('http');
var fs = require('fs');

function PostCode(codestring) {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
      'Access-Control-Allow-origin' : 'localhost:3000',
      'output_format': 'json',
      'output_info': 'compiled_code',
        'warning_level' : 'QUIET',
        'js_code' : codestring
      // 'name' : 'x',
      // 'path' : 'y'
  });

  var dataToSendObj = {'title': 'Your Website Title', 'message': 'Hello'};
  var JSONdata = querystring.stringify(dataToSendObj);

  // An object of options to indicate where to post to
  var post_options = {
      host: 'localhost',
      port: '7777',
      path: '/',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
      console.log('JSONdata: ' + JSONdata);
  });

  // post the data
  // console.log('JSONdata: ' + JSONdata);
  post_req.write(JSONdata);
  post_req.end();

}
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
			// const data = new FormData()
			// axios.post("http://localhost:7777/api/test", data, { 
			// })
			// .then(res => {
			// 	console.log(res.data.result)
			// })

			const data = new FormData()
			data.append('file', this.props.state.file)
			console.log("save")
			axios.post("http://localhost:7777/api/save", data, { 
			})
			.then(res => {
				console.log("res.data")
				console.log(res.data)
				var path = res.data.file_name;
				axios({
					method: 'post',
					url: 'http://localhost:7777/api/upload',
					params: {
						file_name: path,
						application_name: this.props.state.ticketID,
						team_name: this.props.state.teamName
					}
				})
				.then(r => {
					console.log(r.data)
				})
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
					<Redirect to="/confirmations" />
				}
				<form onSubmit={this.handleSubmit}>
				  <div className="form-group">
				    <label>Team Assigned To</label>
				    <input type="text" className="form-control" placeholder="Enter Team Name" onChange={this.props.handleTeamChange}/>
				  </div>
				  <div className="form-group">
				    <label>Application Name</label>
				    <input type="text" className="form-control" placeholder="Application Name" onChange={this.props.handleTicketChange}/>
				  </div>
				  <label>Report</label>
				  <div className="form-group">
				    <input type="file" className="" onChange={this.props.handleFile}/>
				    <label className="custom-file-label">Choose file...</label>
				  </div>
				  <label>PDF Report</label>
				  <div className="form-group">
				    <input type="file" className="" onChange={this.props.handleFile}/>
				    <label className="custom-file-label">Choose file...</label>
				  </div>
				  <button type="submit" className="btn btn-primary" >Submit</button>
				</form>
			</div>
		)
	}
}

export default TicketForm