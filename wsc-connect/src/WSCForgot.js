import React, { Component } from 'react';
import WSCInput from './WSCInput';
import { Button, Form} from 'reactstrap';
import { FormattedMessage } from 'react-intl';

class WSCForgot extends Component {
	constructor(props) {
		super(props);

		this.state = {
			validateErrors: {
				email: {
					error: false,
					message: ''
				}
			}
		};
	}

	validate(e) {
		e.preventDefault();

		/*let email = e.currentTarget.email.value;
		let button = e.currentTarget.submit;

		button.disabled = true;
		// TODO
		/*fetch(config.apiUrl + 'forgotSecret', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({
				email
			})
		})
		.then(function(response) {
			if (response.status === 200) {
				return response.json();
			}

			throw new Error(response.status);
		})
		.then((json) => {
		})
		.catch((error) => {
			console.log("error");
			console.log(error);
		});*/
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
			formInputs.push(<WSCInput input={input} validateErrors={this.state.validateErrors[input.id]} key={input.id} />);
		});

		return (
			<div>
				<h2><FormattedMessage id="wsc.forgot.title" /></h2>
				<Form method="post" onSubmit={this.validate.bind(this)}>
					{formInputs}

					<Button type="submit" disabled color="primary" id="submit"><FormattedMessage id="wsc.forgot.submit" /></Button>
				</Form>
			</div>
		);
	}
}

export default WSCForgot;
