import React, { Component } from 'react';
import WSCInput from './WSCInput';
import { Button, Form, Alert} from 'reactstrap';
import { FormattedMessage, FormattedHTMLMessage, injectIntl } from 'react-intl';
import { config } from './config.js';

class WSCForgot extends Component {
	constructor(props) {
		super(props);

		this.state = {
			success: false,
			email: '',
			error: 0
		};
	}

	validate(e) {
		e.preventDefault();

		let email = e.currentTarget.email.value;
		let button = e.currentTarget.submit;

		button.disabled = true;

		fetch(config.apiUrl + 'requestSecret', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({
				email: email,
				subject: this.props.intl.formatMessage({id: 'wsc.forgot.email.subject'}),
				text: this.props.intl.formatMessage({id: 'wsc.forgot.email.text'})
			})
		})
		.then(function(response) {
			if (response.status === 200) {
				return response.text();
			}

			throw new Error(response.status);
		})
		.then((json) => {
			this.setState({
				success: true,
				email: email
			});
		})
		.catch((error) => {
			this.setState({
				error: error.message
			});
		});
	}

	render() {
		let formInputs = [];
		let inputs = [
			{
				id: 'email',
				label: 'wsc.register.form.email.label',
				inputType: 'email',
				placeholder: 'wsc.register.form.email.placeholder',
				description: 'wsc.forgot.form.email.description'
			}
		];
		inputs.forEach((input) => {
			formInputs.push(<WSCInput input={input} key={input.id} />);
		});

		if (this.state.success) {
			return (
				<div>
					<h2><FormattedMessage id="wsc.forgot.title" /></h2>
					<Alert color="success">
						<FormattedHTMLMessage values={{email: this.state.email}} id="wsc.forgot.success" />
					</Alert>
				</div>
			);
		} else if (this.state.error !== 0) {
			var error = 'wsc.forgot.error' + this.state.error;
			return (
				<div>
					<h2><FormattedMessage id="wsc.forgot.title" /></h2>
					<Alert color="danger">
						<FormattedMessage id={error} defaultMessage="Error, please try again later." />
					</Alert>
				</div>
			);
		} else {
			return (
				<div>
					<h2><FormattedMessage id="wsc.forgot.title" /></h2>
					<Form method="post" onSubmit={this.validate.bind(this)}>
						{formInputs}

						<Button type="submit" color="primary" id="submit"><FormattedMessage id="wsc.forgot.submit" /></Button>
					</Form>
				</div>
			);
		}
	}
}

export default injectIntl(WSCForgot);
