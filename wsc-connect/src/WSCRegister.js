import React, { Component } from 'react';
import { Button, Form, Alert } from 'reactstrap';
import { isHttpsUri } from 'valid-url';
import { Link } from 'react-router-dom'
import { config } from './config.js';
import WSCInput from './WSCInput';
import { FormattedMessage, FormattedHTMLMessage }  from 'react-intl';

class WSCRegister extends Component {
	constructor(props) {
		super(props);

		this.state = {
			step: 1,
			name: '',
			url: '',
			apiUrl: '',
			logo: '',
			email: '',
			appID: 'appID',
			appSecret: 'appSecret',
			formInputs: [
				{
					id: 'name',
					placeholder: 'wsc.register.form.name.placeholder',
					label: 'wsc.register.form.name.label',
					inputType: 'text',
					description: 'wsc.register.form.name.description'
				},
				{
					id: 'url',
					placeholder: 'wsc.register.form.url.placeholder',
					label: 'wsc.register.form.url.label',
					inputType: 'url',
					description: 'wsc.register.form.url.description'
				},
				{
					id: 'apiUrl',
					placeholder: 'wsc.register.form.apiUrl.placeholder',
					label: 'wsc.register.form.apiUrl.label',
					inputType: 'url',
					description: 'wsc.register.form.apiUrl.description'
				},
				{
					id: 'logo',
					placeholder: 'wsc.register.form.logo.placeholder',
					label: 'wsc.register.form.logo.label',
					inputType: 'url',
					description: 'wsc.register.form.logo.description'
				},
				{
					id: 'email',
					placeholder: 'wsc.register.form.email.placeholder',
					label: 'wsc.register.form.email.label',
					inputType: 'email',
					description: 'wsc.register.form.email.description'
				},
			],
			validateErrors: {
				apiUrl: {
					error: false,
					message: ''
				},
				logo: {
					error: false,
					message: ''
				},
				email: {
					error: false,
					message: ''
				},
				appID: {
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

	showForm() {
		this.setState({
			step: 2
		});
	}

	validate(e) {
		e.preventDefault();

		let name = e.currentTarget.name.value;
		let url = e.currentTarget.url.value;
		let apiUrl = e.currentTarget.apiUrl.value;
		let logo = e.currentTarget.logo.value;
		let email = e.currentTarget.email.value;
		let button = e.currentTarget.submit;
		let error = false;
		let validateErrors = {...this.state.validateErrors};

		if (!isHttpsUri(apiUrl)) {
			error = true;
			validateErrors.apiUrl.error = true;
			validateErrors.apiUrl.message = 'wsc.register.form.apiUrl.error.https';		
		} else {
			validateErrors.apiUrl.error = false;
			validateErrors.apiUrl.message = '';		
		}

		if (logo.match(/\.(jpeg|jpg|png)$/) === null) {
			error = true;
			validateErrors.logo.error = true;
			validateErrors.logo.message = 'wsc.register.form.logo.error.type';		
		} else {
			validateErrors.logo.error = false;
			validateErrors.logo.message = '';	
		}

		this.setState({validateErrors});

		if (error) {
			return;
		}

		let img = new Image();
		img.onload = function() {
			if (img.width !== img.height || img.width < 200 || img.width > 500) {
				error = true;
				validateErrors.logo.error = true;
				validateErrors.logo.message = 'wsc.register.form.logo.error.dimension';		
			} else {
				validateErrors.logo.error = false;
				validateErrors.logo.message = '';
			}

			this.setState({validateErrors});

			// still check for empty values. The `required` attribute is not working in safari
			if (name.trim().length === 0 || url.trim().length === 0 || apiUrl.trim().length === 0 || logo.trim().length === 0 || email.trim().length === 0) {
				error = true;
			}

			if (error) {
				return;
			}

			// no errors, save data
			this.setState({
				name,
				url,
				apiUrl,
				logo,
				email
			});

			button.disabled = true;

			fetch(config.apiUrl + 'validate', {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				method: "POST",
				body: JSON.stringify({
					'apiUrl': apiUrl,
					'type': 'apiUrlValidation'
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

				this.saveApp(button);
			})
			.catch((error) => {
				button.disabled = false;
				let status = parseInt(error.message, 10);
				let validateErrors = {...this.state.validateErrors};

				console.log(status);

				validateErrors.apiUrl.error = true;
				validateErrors.apiUrl.message = 'wsc.register.form.apiUrl.error.accessible';

				this.setState({validateErrors});
			});
		}.bind(this);
		img.src = logo;
	}

	saveApp(button) {
		let state = {...this.state};
		let data = {
			name: state.name,
			url: state.url,
			apiUrl: state.apiUrl,
			logo: state.logo,
			email: state.email
		};

		fetch(config.apiUrl + 'apps', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify(data)
		})
		.then(function(response) {
			if (response.status === 200) {
				return response.json();
			}
			console.log(response);
			return response.json().then((json) => {
				let error = {
					status: response.status,
					statusText: json
				}
				throw new Error(JSON.stringify(error));
			});
		})
		.then((json) => {
			button.disabled = false;

			this.setState({
				appID: json.appID,
				appSecret: json.appSecret,
				step: 3
			});
		})
		.catch((error) => {
			button.disabled = false;
			console.log(error);
			error = JSON.parse(error.message);

			switch (error.status) {
				case 409:
					let validateErrors = {...this.state.validateErrors};

					switch (error.statusText.field) {
						case 'email':
							validateErrors.email.error = true;
							validateErrors.email.message = 'wsc.register.form.email.error';
						break;
						case 'apiUrl':
							validateErrors.apiUrl.error = true;
							validateErrors.apiUrl.message = 'wsc.register.form.apiUrl.error.used';
						break;
						default:
							console.lg(error);
					}

					this.setState({validateErrors});
				break;
				default:
					console.log(error);
			}
		});
	}

	validateAppData(e) {
		let button = e.currentTarget;
		button.disabled = true;

		fetch(config.apiUrl + 'validate', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({
				'apiUrl': this.state.apiUrl,
				'appID': this.state.appID,
				'appSecret': this.state.appSecret,
				'type': 'apiDataValidation'
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

			this.setState({
				step: 4
			});
		})
		.catch((error) => {
			button.disabled = false;
			let validateErrors = {...this.state.validateErrors};

			validateErrors.appID.error = true;


			validateErrors.appSecret.error = true;
			validateErrors.appSecret.message = 'wsc.register.form.apiSecret.error'

			this.setState({validateErrors});
		});
	}

	render() {
		let formInputs = [];
		const step = this.state.step;
		if (step === 1) {
			return (
				<div>
					<h2><FormattedMessage id="wsc.register.step1.title" /></h2>
					<Alert color="info">
						<FormattedHTMLMessage id="wsc.register.step1" />
					</Alert>

					<div className="text-center">
						<Button color="primary" onClick={this.showForm.bind(this)}><FormattedMessage id="wsc.register.step1.done" /></Button>
					</div>
				</div>
			);
		} else if (step === 2) {
			this.state.formInputs.forEach((input) => {
				formInputs.push(<WSCInput input={input} validateErrors={this.state.validateErrors[input.id]} key={input.id} />);
			});

			return(
				<div>
					<h2><FormattedMessage id="wsc.register.step2.title" /></h2>
					<Form method="post" onSubmit={this.validate.bind(this)}>
						{formInputs}

						<Button color="primary" id="submit"><FormattedMessage id="wsc.register.step2.validate" /></Button>
					</Form>
				</div>
			);
		} else if (step === 3) {
			let inputs = [
				{
					id: 'appID',
					label: 'wsc.register.form.appID.label',
					inputType: 'text',
					value: this.state.appID,
					description: 'wsc.register.form.appID.description'
				},
				{
					id: 'appSecret',
					label: 'wsc.register.form.appSecret.label',
					inputType: 'text',
					value: this.state.appSecret,
					description: 'wsc.register.form.appSecret.description'
				},
			];
			inputs.forEach((input) => {
				formInputs.push(<WSCInput input={input} readonly="true" validateErrors={this.state.validateErrors[input.id]} key={input.id} />);
			});

			return(
				<div>
					<h2><FormattedMessage id="wsc.register.step3.title" /></h2>
					<Alert color="warning">
						<FormattedHTMLMessage id="wsc.register.step3" />
					</Alert>

					{formInputs}
					<Button color="primary" onClick={this.validateAppData.bind(this)}><FormattedMessage id="wsc.register.step3.validate" /></Button>
				</div>
			);
		} else if (step === 4) {
			return (
				<div>
					<h2><FormattedMessage id="wsc.register.step4.title" /></h2>
					<Alert color="success">
						<FormattedHTMLMessage id="wsc.register.step4" />
					</Alert>

					<Link to="/apps" className="btn btn-primary"><FormattedMessage id="wsc.register.step4.done" /></Link>
				</div>
			);
		}
	}
}

export default WSCRegister;
