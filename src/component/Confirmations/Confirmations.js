import React, {Component} from "react"
import {Redirect, Route, HashRouter, Link} from "react-router-dom"
import axios from 'axios';
import { Tooltip } from 'reactstrap';
import ReactDom from 'react-dom';
import Popup from 'reactjs-popup';

class History extends Component {

	constructor(props) {
		super(props)
		this.state = {
			tooltipOpenCWEType: false
		}
		this.toggleCWEType = this.toggleCWEType.bind(this);
		// this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentDidMount() {
		this.props.handleAppBarTitleChange("Confirmations")
		
	}

	toggleCWEType() {
		this.setState({
			tooltipOpenCWEType: !this.state.tooltipOpenCWEType,
		});
	}

	// handleSubmit() {
	// 	return (
	// 		<Popup trigger={<button> Trigger</button>} position="right center">
 //    <div>Popup content here !!</div>
 //  </Popup>)
	// }

	addComponent() {
		return(
			<div className="form-group">
				  <label>{ "Ticket ID: " +  "vln-Provider_Directory_Search-01\n"}</label><br/>
				  <label>{ "Finding: HTTP Strict Transport Security (HSTS) Not Implemented\n" }</label><br/>
				  <label>{ "Severity: Low\n" }</label><br/>
				  <label>
				  <span style={{textDecoration: "underline", color:"black"}} href="#" id="autohide">
				  	<label>PDF pages:</label>
				  </span>
				  <Tooltip placement="top" isOpen={this.state.tooltipOpenCWEType} target="autohide" toggle={this.toggleCWEType}>
				  	Enter the PDF pages related to this Ticket.
				  </Tooltip>
				</label>
				  <input type="text" className="form-control" placeholder="ex: 11-13" onChange={this.props.handleTicketChange}/><br/>
				  <label>{ " "}</label><br/>
				</div>
			)
	}

	

	render() {
		
		var teamName = this.props.teamName
		var ticketID = this.props.ticketID
		// return(
		// 	<div className="container">
		// 		<p style={{marginTop: '100px'}}>
		// 		</p>
		// 		<div className="form-group">
		// 		  <label>{ "Team Assigned To:" + teamName }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ " "}</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Ticket ID:" + ticketID + "_finding_1"}</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Finding: HTTP Strict Transport Security (HSTS) Not Implemented" }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Severity: Low" }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Description: The server does not implement the ''HTTP Strict -Transport Security'' (HSTS) web security policy mechanism. When HSTS is enabled, the web application sends a special response header, ''Strict -Transport -Security'' to the client with a duration of time specified. Once a supported browser receives this header, that browser will only make requests to the application over HTTPS for the duration of time specified in the header. Any links to resources over HTTP will be rewritten to HTTPS before the request is made. Applications that do not utilize the ''HTTP Strict -Transport Security'' policy are more susceptible to man -in -the -middle attacks via SSL stripping, which occurs when an attacker transparently downgrades a victim's communication with the server from HTTPS to HTTP. Once this is accomplished, the attacker will gain the ability to view and potentially modify the victim's traffic, exposing sensitive information and gaining access to unauthorized functionality." }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Remediation: The application server should send the ''Strict -Transport -Security'' HTTP header in each response indicating that future requests to the domain use only HTTPS. The following is a basic example of the HSTS HTTP header, setting a max -age of one year: Strict -Transport -Security: max -age=31536000 Subdomains should also be configured in this manner, by including the ''includeSubDomains'' flag: Strict -Transport -Security: max -age=31536000; includeSubDomains;" }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ " "}</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Ticket ID:" + ticketID + "_finding_2"}</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Finding: TLSv1.0 Supported" }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Severity: Low" }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Description: The server -side SSL /TLS endpoint is configured to allow connections using TLS protocol version 1.0 (''TLSv1.0''), which contains known weaknesses. The TLS protocol provides secure transport between endpoints over a network, with the intended effect of offering data integrity and confidentiality. Certain configurations of TLS version 1.0 are vulnerable to known man -in -the -middle (''MitM'') attacks, including the BEAST and POODLE attacks. In addition, multiple standards organizations including NIST and PCI have declared that TLSv1.0 no longer provides sufficient data protection. Weaknesses in TLSv1.0 connections may allow an attacker to decrypt traffic passed between a victim's client and the server. Any sensitive information passed over this connection may be exposed, such as credentials, account data, personally identifiable information (PII), financial records, etc. Exposure of session identifiers may allow an attacker to hijack a victim's session and impersonate the victim in the application. An attacker who decrypts traffic in transit between a victim's client and the server may also modify data in transit, allowing them to modify requests the victim has initiated and any data being returned to the client." }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Remediation: The server -side TLS endpoint's configuration should be updated to allow only TLSv1.2 connections with cipher suites that use: Ephemeral Diffie -Hellman for key exchange (optionally, allow RSA for key exchange if necessary for supporting some clients) Block ciphers with key lengths of at least 128 bits (AES -128 and AES -256; optionally allow 3DES with 112 -bit keys if necessary for supporting some clients) Block ciphers in GCM mode (optionally, allow block ciphers in CBC mode if necessary for supporting some clients) The SHA2 family of hash functions (SHA256, SHA384, SHA512) for block ciphers in CBC mode if necessary; optionally, allow SHA1 if necessary for supporting some clients Note that all modern browsers support TLSv1.2. For further information on NIST policies surrounding TLS deprecation, please refer to the following link: http: / /nvlpubs.nist.gov /nistpubs /SpecialPublications /NIST.SP.800 -52r1.pdf" }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ " "}</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Ticket ID:" + ticketID + "_finding_3"}</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Finding: Missing Content-Security-Policy Header" }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Severity: Low" }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Description: The application server does not set the Content -Security -Policy (CSP) header in HTTP responses, and, therefore, the application is at a greater risk of having cross -site scripting or other modern application vulnerabilities. The CSP header sets a policy that instructs the browser to only fetch resources, such as scripts, images, or objects, from the specified locations. A compliant browser will deny loading any resources from locations not listed in the policy. CSP allows browsers to differentiate between trusted and untrusted content requested by the page. By default, it also prohibits inline script execution, as well as dynamic script evaluation. When implemented correctly, the CSP reduces an attacker's ability to inject malicious content and helps protect a web page from attacks like cross -site scripting (XSS), dynamic code execution, clickjacking, remote file inclusion (RFI), and others. The CSP adds an additional line of defense and reduces the overall security risk." }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Remediation: The application server must set the Content -Security -Policy (CSP) header in each HTTP response with the appropriate directives defined to provide the browser with granular control over the resources loaded by the application. Implementing a CSP should be considered a security best practice as part of a larger defense in depth strategy to reduce the risk of various attacks. CSP alone should not be relied on to prevent attacks such as cross -site scripting, dynamic code execution, clickjacking, remote file inclusion, or other injection attacks. To implement a secure CSP, the application would need to use no inline"}</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ " "}</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Ticket ID:" + ticketID + "_finding_4"}</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Finding: Missing X-XSS-Protection Header" }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Severity: Low" }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Description: The application server does not set the ''X -XSS -Protection'' header in HTTP responses. The X -XSS -Protection response header is a mechanism supported by some modern web browsers to provide an additional layer of defense against reflected cross -site scripting attacks. A missing X -XSS -Protection header increases the likelihood of a successful reflected cross -site scripting attack which can give the attacker full control over the HTML and JavaScript running in the victim's browser. Without the X -XSS -Protection header defined, an application has fewer defense layers to prevent reflected cross -site scripting attacks." }</label>
		// 		</div>
		// 		<div className="form-group">
		// 		  <label>{ "Remediation: The application or the web server should set the X -XSS -Protection header to reduce the likelihood of successful reflected cross -site scripting attacks. The X -XSS -Protection should be set to the following: X -XSS -Protection: 1; mode=block Setting the X -XSS -Protection header to ''1'' enables the browser's built -in cross -site scripting auditor to analyze the response content for malicious scripts. If the browser detects unsafe or malicious content, the browser will sanitize the response before rendering. However, if the value ''1'' is followed by ''mode=block'', the browser will prevent the page from rendering in case a cross -site scripting attack is detected. Instead, the browser will display an error message to the user. Note: Using the X -XSS -Protection header should be considered a security best practice as part of a defense -in -depth strategy to harden the application. The X -XSS -Protection header alone does not guarantee protection against reflected cross -site scripting attacks. The header is not supported by all modern browsers and can also be bypassed using targeted attacks against specific browser versions. To prevent reflected cross -site scripting attacks, output encoding should be implemented in the application whenever data is inserted into a web page." }</label>
		// 		</div>
		// 	</div>
		// )
		return(
			<div className="container">
			<form onSubmit={this.handleSubmit}>
				<p style={{marginTop: '100px'}}>
				</p>
				{this.addComponent()}
				<div className="form-group">
				  <label>{ "Ticket ID:" +  "vln-Provider_Directory_Search-02"}</label>
				</div>
				<div className="form-group">
				  <label>{ "Finding: TLSv1.0 Supported" }</label>
				</div>
				<div className="form-group">
				  <label>{ "Severity: Low" }</label>
				</div>
				<div className="form-group">
				  <label>PDF pages:</label>
				  <input type="text" className="form-control" placeholder="ex: 11-13" onChange={this.props.handleTicketChange}/>
				</div>
				<div className="form-group">
				  <label>{ " "}</label>
				</div>
				<div className="form-group">
				  <label>{ "Ticket ID:" +  "vln-Provider_Directory_Search-03"}</label>
				</div>
				<div className="form-group">
				  <label>{ "Finding: Missing Content-Security-Policy Header" }</label>
				</div>
				<div className="form-group">
				  <label>{ "Severity: Minimal" }</label>
				</div>
				<div className="form-group">
				  <label>PDF pages:</label>
				  <input type="text" className="form-control" placeholder="ex: 11-13" onChange={this.props.handleTicketChange}/>
				</div>
				<div className="form-group">
				  <label>{ " "}</label>
				</div>
				<div className="form-group">
				  <label>{ "Ticket ID:" +  "vln-Provider_Directory_Search-04"}</label>
				</div>
				<div className="form-group">
				  <label>{ "Finding: Missing X-XSS-Protection Header" }</label>
				</div>
				<div className="form-group">
				  <label>PDF pages:</label>
				  <input type="text" className="form-control" placeholder="ex: 11-13" onChange={this.props.handleTicketChange}/>
				</div>
				<div className="form-group">
				  <label>{ "Severity: Minimal" }</label>
				</div>
				<br/>
				<Popup trigger={<button> submit</button>} width = '100px' modal>
				    <div  align="center">
				    	<br/>
				    	You have successfully sumitted the Ticket!<br/>
				    	Click "Done" to view History<br/>
				    	<br/>
				    	<button color="secondary" >
				    		<Link to="/history" color='black'>Done</Link>
				    	</button>
				    </div>
				  </Popup>
			</form>
			</div>

		)
	}
}

export default History