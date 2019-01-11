import React, { Component } from 'react';
import WSCInput from './WSCInput';
import { Button, Form, Alert, Badge } from 'reactstrap';
import { Link } from 'react-router-dom'
import { config } from './config.js';
import { FormattedMessage, FormattedHTMLMessage }  from 'react-intl';

class WSCDashboardMessageAdd extends Component {
	constructor(props) {
		super(props);

		this.state = {
			app: props.app,
			error: ''
		}
	}

	updateTabs(e) {
		e.preventDefault();

		let conversations = e.currentTarget.conversations.checked;
		let button = e.currentTarget.submit;

		button.disabled = true;

		let data = {
			conversations
		};

		fetch(config.apiUrl + 'tabs/' + this.state.app._id, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + window.sessionStorage.getItem('loginToken')
			},
			method: "PUT",
			body: JSON.stringify(data)
		})
		.then(function(response) {
			if (response.ok) {
				return response.text().then((text) => {
					let success = {
						status: response.status,
						statusText: text
					}

					return success;
				});
			}

			return response.text().then((text) => {
				let error = {
					status: response.status,
					statusText: text
				}
				throw new Error(JSON.stringify(error));
			});
		})
		.then((success) => {
			this.props.updateApp();
		})
		.catch((error) => {
			button.disabled = false;

			var json = JSON.parse(error.message);
			if (json.status === 500 && json.statusText == "notAvailable") {
				this.setState({
					error: 'wsc.dashboard.tabs.conversations.error'
				});
			} else {
				this.setState({
					error: 'wsc.dashboard.tabs.error'
				});
			}
			
		});
	}

	render() {
		return (
			<main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
				<h2><FormattedMessage id="wsc.dashboard.tabs.title" /></h2>
				<div><small className="text-muted"><FormattedMessage id="wsc.dashboard.tabs.intro" /></small></div>
				<Form className="mt-3" method="post" onSubmit={this.updateTabs.bind(this)}>
					{this.state.error &&
						<div className="alert alert-danger" role="alert"><FormattedMessage id={this.state.error} /></div>
					}

					<div><input type="checkbox" id="webview" name="webview" disabled defaultChecked={this.state.app.tabs && this.state.app.tabs.indexOf("webview") !== -1} /> <label style={{display: 'inline'}} htmlFor="webview"><FormattedMessage id="wsc.dashboard.tabs.webview" /></label></div>
					<div><input type="checkbox" id="notifications" name="notifications" disabled defaultChecked={this.state.app.tabs && this.state.app.tabs.indexOf("notifications") !== -1} /> <label style={{display: 'inline'}} htmlFor="notifications"><FormattedMessage id="wsc.dashboard.tabs.notifications" /></label></div>
					<div><input type="checkbox" id="conversations" name="conversations" defaultChecked={this.state.app.tabs && this.state.app.tabs.indexOf("conversations") !== -1} /> <label style={{display: 'inline'}} htmlFor="conversations"><FormattedMessage id="wsc.dashboard.tabs.conversations" /></label></div>
					<div><input type="checkbox" id="messages" name="messages" disabled defaultChecked={this.state.app.tabs && this.state.app.tabs.indexOf("messages") !== -1} /> <label style={{display: 'inline'}} htmlFor="messages"><FormattedMessage id="wsc.dashboard.tabs.messages" /></label></div>
					<div><small className="text-muted"><FormattedMessage id="wsc.dashboard.tabs.description" /></small></div>

					<div className="mt-3"><Button type="submit" color="primary" id="submit"><FormattedMessage id="wsc.dashboard.tabs.submit" /></Button></div>
				</Form>
			</main>
		);
	}
}

export default WSCDashboardMessageAdd;
