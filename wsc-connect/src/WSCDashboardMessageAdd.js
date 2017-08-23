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
			success: false,
			error: false,
			empty: false
		}
	}

	sendMessage(e) {
		e.preventDefault();

		let title = e.currentTarget.title.value;
		let message = e.currentTarget.message.value;
		let button = e.currentTarget.submit;

		if (!title.trim().length || !message.trim().length) {
			return;
		}

		button.disabled = true;

		let data = {
			title,
			message
		};

		fetch(config.apiUrl + 'message/' + this.state.app._id, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + window.sessionStorage.getItem('loginToken')
			},
			method: "POST",
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
			if (success.status === 200) {
				this.setState({success: true});
			} else if (success.status === 202) {
				button.disabled = false;
				this.setState({empty: true});
			}
		})
		.catch((error) => {
			error = JSON.parse(error.message);
			if (error.status === 401) {
				this.logout();
			} else if (error.status === 500) {
				button.disabled = false;
				this.setState({error: true});
			} else {
				console.log(error);
			}
		});
	}

	updateAndRedirect() {
		this.props.updateApp();
		this.props.history.push('/dashboard/messages');
	}

	logout() {
		window.sessionStorage.removeItem('loginToken');
		window.sessionStorage.removeItem('appID');
		window.sessionStorage.removeItem('appName');

		// redirect to apps
		window.location = '/login';
	}

	render() {
		//console.log(this.state.app._users);
		let formInputs = [];
		let userBadges = [];
		let inputs = [
			/*{
				id: 'receivers',
				label: 'wsc.dashboard.messages.form.receivers.label',
				inputType: 'text',
				readonly: true
			},*/
			{
				id: 'title',
				label: 'wsc.dashboard.messages.form.title.label',
				inputType: 'text',
				placeholder: 'wsc.dashboard.messages.form.title.placeholder'
			},
			{
				id: 'message',
				label: 'wsc.dashboard.messages.form.message.label',
				inputType: 'textarea',
				placeholder: 'wsc.dashboard.messages.form.message.placeholder'
			},
		];
		inputs.forEach((input) => {
			formInputs.push(<WSCInput input={input} key={input.id} />);
		});

		this.state.app._users.forEach((user) => {
			//userBadges.push(<Badge key={user.userID}>{user.username} ({user.userID})</Badge>);
		});


		if (this.state.app.enabled) {
			return (
				<main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
					<h2><FormattedMessage id="wsc.dashboard.messages.title" /></h2>

					{this.state.success &&
						<div>
							<Alert color="success"><FormattedMessage id="wsc.dashboard.messages.success" /></Alert>
							<Button color="success" onClick={() => this.updateAndRedirect()}><FormattedMessage id="wsc.dashboard.messages.back" /></Button>
						</div>
					}

					{!this.state.success &&
						<div>
							{this.state.error &&
								<Alert color="danger"><FormattedMessage id="wsc.dashboard.messages.error" /></Alert>
							}

							{this.state.empty &&
								<Alert color="info"><FormattedMessage id="wsc.dashboard.messages.empty" /></Alert>
							}
							<Form method="post" onSubmit={this.sendMessage.bind(this)}>
								{userBadges}
								{formInputs}

								<Button type="submit" color="primary" id="submit"><FormattedMessage id="wsc.dashboard.messages.submit" values={{users: this.state.app._users.length}} /></Button>{' '}

								<Link className="btn btn-secondary" to={'/dashboard/messages'}><FormattedMessage id="wsc.dashboard.messages.back" /></Link>
							</Form>
						</div>
					}
				</main>
			);
		} else {
			return (
				<main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
					<Alert color="danger">
						<FormattedHTMLMessage id="wsc.dashboard.overview.disabled" values={{apiUrl: this.state.app.apiUrl}} />
					</Alert>
				</main>
			);
		}
	}
}

export default WSCDashboardMessageAdd;
