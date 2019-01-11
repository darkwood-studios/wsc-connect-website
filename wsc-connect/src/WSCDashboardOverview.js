import React, { Component } from 'react';
import WSCInput from './WSCInput';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { config } from './config.js';
import { FormattedMessage, FormattedHTMLMessage }  from 'react-intl';

class WSCDashboardOverview extends Component {
	constructor(props) {
		super(props);

		this.state = {
			app: props.app,
			modal: false,
			deleteError: false,
			validateErrors: {
				name: {
					error: false,
					message: ''
				},				
				url: {
					error: false,
					message: ''
				},				
				logo: {
					error: false,
					message: ''
				},
			}
		}

		this.toggleDeleteModal = this.toggleDeleteModal.bind(this);
	}

	updateApp(e) {
		e.preventDefault();
		let name = e.currentTarget.name.value;
		let url = e.currentTarget.url.value;
		let logo = e.currentTarget.logo.value;
		let apiUrl = e.currentTarget.apiUrl.value;
		let button = e.currentTarget.submit;
		let visible = e.currentTarget.visible.checked;
		let error = false;
		let validateErrors = {...this.state.validateErrors};

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
			// still check for empty values. The `required` attribute is not working in safari
			if (name.trim().length === 0 || url.trim().length === 0 || apiUrl.trim().length === 0 || logo.trim().length === 0) {
				error = true;
			}

			if (error) {
				return;
			}
			
			let data = {
				name,
				url,
				apiUrl,
				logo,
				visible
			};

			button.disabled = true;
			fetch(config.apiUrl + 'apps/' + this.state.app._id, {
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'Authorization': 'Bearer ' + window.sessionStorage.getItem('loginToken')
				},
				method: "PUT",
				body: JSON.stringify(data)
			})
			.then(function(response) {
				if (response.status === 200) {
					return response.json();
				}

				return response.text().then((text) => {
					let error = {
						status: response.status,
						statusText: text
					}
					throw new Error(JSON.stringify(error));
				});
			})
			.then((json) => {
				button.disabled = false;

				window.sessionStorage.setItem('appName', json.name);
				this.props.updateApp();
			})
			.catch((error) => {
				button.disabled = false;
				if (error.status === 401) {
					this.logout();
				} else {
					console.log(error);
				}
			});
		}.bind(this);
		img.src = logo;
	}

	deleteApp(e) {
		var button = e.currentTarget;

		button.disabled = true;
		fetch(config.apiUrl + 'apps/' + this.state.app._id, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Authorization': 'Bearer ' + window.sessionStorage.getItem('loginToken')
			},
			method: "DELETE"
		})
		.then(function(response) {
			if (response.status === 200) {
				return response;
			}

			return response.text().then((text) => {
				let error = {
					status: response.status,
					statusText: text
				}
				throw new Error(JSON.stringify(error));
			});
		})
		.then((response) => {
			this.logout();
		})
		.catch((error) => {
			error = JSON.parse(error.message);
			button.disabled = false;
			this.toggleDeleteModal();

			if (error.status === 401) {
				this.logout();
			} else {
				this.setState({
					deleteError: true
				});
				window.scroll(0, 0);
			}
		});
	}

	revalidate(e) {
		let button = e.currentTarget;
		button.disabled = true;

		fetch(config.apiUrl + 'validate', {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			method: "POST",
			body: JSON.stringify({
				'apiUrl': this.state.app.apiUrl,
				'appID': this.state.app._id,
				'appSecret': this.state.app.appSecret,
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
			this.props.updateApp();
		})
		.catch((error) => {
			button.disabled = false;
		});
	}

	logout() {
		window.sessionStorage.removeItem('loginToken');
		window.sessionStorage.removeItem('appID');
		window.sessionStorage.removeItem('appName');

		// redirect to apps
		window.location = '/login';
	}

	toggleDeleteModal() {
		this.setState({
			modal: !this.state.modal
		});
	}

	render() {
		let formInputs = [];
		let inputs = [
			{
				id: 'name',
				label: 'wsc.register.form.name.label',
				inputType: 'text',
				value: this.state.app.name
			},
			{
				id: 'appID',
				label: 'wsc.register.form.appID.label',
				readOnly: true,
				inputType: 'text',
				value: this.state.app._id
			},
			{
				id: 'appSecret',
				label: 'wsc.register.form.appSecret.label',
				readOnly: true,
				inputType: 'text',
				value: this.state.app.appSecret
			},
			{
				id: 'url',
				label: 'wsc.register.form.url.label',
				inputType: 'url',
				value: this.state.app.url
			},
			{
				id: 'apiUrl',
				label: 'wsc.register.form.apiUrl.label',
				inputType: 'url',
				value: this.state.app.apiUrl
			},
			{
				id: 'logo',
				label: 'wsc.register.form.logo.label',
				inputType: 'url',
				value: this.state.app.logo
			}
		];

		inputs.forEach((input) => {
			formInputs.push(<WSCInput input={input} readonly={input.readOnly} validateErrors={this.state.validateErrors[input.id]} key={input.id} />);
		});

		return (
			<main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
				<h2><FormattedMessage id="wsc.dashboard.overview" /></h2>
				{this.state.app.enabled === true  &&
					<Alert color="success">
						<FormattedHTMLMessage id="wsc.dashboard.overview.enabled" />
					</Alert>
				}
				{this.state.deleteError  &&
					<Alert color="danger">
						<FormattedMessage id="wsc.dashboard.overview.delete.error" />
					</Alert>
				}

				{this.state.app.enabled === false && !this.state.updateSucess &&
					<div>
						<Alert color="danger">
							<FormattedHTMLMessage id="wsc.dashboard.overview.disabled" values={{apiUrl: this.state.app.apiUrl}} />
						</Alert>

						{formInputs}

						<Button color="warning" onClick={this.revalidate.bind(this)} id="submit"><FormattedMessage id="wsc.dashboard.overview.revalidate" /></Button>
					</div>
				}
				{this.state.app.enabled === true && !this.state.updateSucess &&
				   	<form onSubmit={this.updateApp.bind(this)}>

						{formInputs}
						<div className="mb-3">
						<input type="checkbox" id="visible" name="visible" defaultChecked={!this.state.app.hasOwnProperty('visible') || this.state.app.visible === true} /> <label style={{display: 'inline'}} htmlFor="visible"><FormattedMessage id="wsc.dashboard.form.visible" /></label>
						</div>

						<Button color="primary" id="submit"><FormattedMessage id="wsc.dashboard.overview.update" /></Button>{' '}
						<Button color="danger" onClick={this.toggleDeleteModal.bind(this)}><FormattedMessage id="wsc.dashboard.overview.delete" /></Button>
					</form>
				}

				<Modal isOpen={this.state.modal} toggle={this.toggleDeleteModal}>
					<ModalHeader toggle={this.toggleDeleteModal}><FormattedMessage id="wsc.dashboard.overview.delete.modal.title" /></ModalHeader>
					<ModalBody>
						<FormattedHTMLMessage id="wsc.dashboard.overview.delete.modal.body" />
					</ModalBody>
					<ModalFooter>
						<Button color="secondary" onClick={this.toggleDeleteModal}><FormattedMessage id="wsc.dashboard.overview.delete.modal.cancel" /></Button>{' '}
						<Button color="danger" onClick={this.deleteApp.bind(this)}><FormattedMessage id="wsc.dashboard.overview.delete" /></Button>
					</ModalFooter>
				</Modal>
			</main>
		);
	}
}

export default WSCDashboardOverview;
