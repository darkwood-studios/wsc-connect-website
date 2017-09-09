import React, { Component } from 'react';
import WSCInput from './WSCInput';
import { Button, Form} from 'reactstrap';
import { Link } from 'react-router-dom';
import { config } from './config.js';
import { FormattedMessage }  from 'react-intl';

class WSCLogin extends Component {
	constructor(props) {
		super(props);


		this.state = {
			validateErrors: {
				email: {
					error: false,
					message: ''
				},
				appSecret: {
					error: false,
					message: ''
				}
			}
		};
	}
	
	validate(e) {
		e.preventDefault();

		let email = e.currentTarget.email.value;
		let appSecret = e.currentTarget.appSecret.value;
		let button = e.currentTarget.submit;

		button.disabled = true;
		fetch(config.apiUrl + 'auth', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({
				email,
				appSecret
			})
		})
		.then(function(response) {
			if (response.status === 200) {
				return response.json();
			}

			throw new Error(response.status);
		})
		.then((json) => {
			button.disabled = false;

			// login successful
			window.sessionStorage.setItem('loginToken', json.loginToken);
			window.sessionStorage.setItem('appID', json.appID);
			window.sessionStorage.setItem('appName', json.appName);

			// redirect to dashboard
			window.location = '/dashboard/overview';
		})
		.catch((error) => {
			button.disabled = false;
			let status = parseInt(error.message, 10);
			let validateErrors = {...this.state.validateErrors};

			console.log(status);

			validateErrors.email.error = true;
			validateErrors.appSecret.error = true;
			validateErrors.appSecret.message = 'wsc.login.unsuccessful';
			this.setState({validateErrors});
		});
	}

	render() {
		var params = new URLSearchParams(this.props.location.search);
		var email = (params.get('email') !== null) ? decodeURIComponent(params.get('email')) : '';
		var appSecret = (params.get('appSecret') !== null) ? decodeURIComponent(params.get('appSecret')) : '';

		let formInputs = [];
		let inputs = [
			{
				id: 'email',
				value: email,
				label: 'wsc.login.email',
				inputType: 'email',
				placeholder: 'wsc.login.email.placeholder'
			},
			{
				id: 'appSecret',
				value: appSecret,
				label: 'wsc.login.app_secret',
				inputType: 'password',
				description: 'wsc.login.app_secret.description',
				placeholder: 'wsc.login.app_secret.placeholder'
			},
		];
		inputs.forEach((input) => {
			formInputs.push(<WSCInput input={input} validateErrors={this.state.validateErrors[input.id]} key={input.id} />);
		});

		return (
			<div>
				<h2><FormattedMessage id="wsc.login.login" /></h2>
				<Form method="post" onSubmit={this.validate.bind(this)}>
					{formInputs}

					<Button type="submit" color="primary" id="submit"><FormattedMessage id="wsc.login.login" /></Button>{' '}
					<Link className="btn btn-secondary" to="/forgot"><FormattedMessage id="wsc.login.forgot" /></Link>
				</Form>
			</div>
		);
	}
}

export default WSCLogin;
