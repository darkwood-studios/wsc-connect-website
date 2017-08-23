import React, { Component } from 'react';
import { Table } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { config } from './config.js';
import { FormattedMessage } from 'react-intl';

class WSCApps extends Component {
	constructor(props) {
		super(props);

		this.state = {
			apps: [],
			loaded: false
		}

		window.document.apps = this;
	}

	componentDidMount() {
		return fetch(config.apiUrl + 'apps')
			.then((response) => response.json())
			.then((apps) => {
				let visibleApps = [];

				apps.forEach(function(app) {
					if (!app.hasOwnProperty('visible') || app.visible === true) {
						visibleApps.push(app);
					}
				});

				this.setState({
					apps: visibleApps,
					loaded: true
				});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	render() {
		var apps = [];
		this.state.apps.forEach(function(app) {
			apps.push(<AppRow app={app} key={app._id} />);
		});

		return (
			<div>
				<h2><FormattedMessage id="wsc.apps.title" /> ({apps.length})</h2>
				<Table id="apps-table" striped responsive>
					<thead>
						<tr>
							<th><FormattedMessage id="wsc.apps.name" /></th>
							<th><FormattedMessage id="wsc.apps.url" /></th>
						</tr>
					</thead>
					<tbody>
						{this.state.loaded ? apps : 
						<tr>
							<td colSpan="2" className="text-center">
								<FontAwesome name='spinner' spin />
							</td>
						</tr>}
					</tbody>
				</Table>
			</div>
		);
	}
}

class AppRow extends React.Component {
	render() {
		var logo = `https://images.weserv.nl/?url=` + this.props.app.logo.replace(/^https?:\/\//,'');
		return (
			<tr>
				<td className="text-left"><img alt="" className="mg-fluid rounded" src={logo} /> <span>{this.props.app.name}</span></td>
				<td className="text-left"><a href={this.props.app.url} target="_blank">{this.props.app.url}</a></td>
			</tr>
		);
	}
}

export default WSCApps;
