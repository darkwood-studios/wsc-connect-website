import React, { Component } from 'react';
import { config } from './config.js';
import { NavLink, Route } from 'react-router-dom'
import WSCDashboardOverview from './WSCDashboardOverview';
import WSCDashboardMessages from './WSCDashboardMessages';
import WSCDashboardMessageAdd from './WSCDashboardMessageAdd';
import WSCDashboardUsers from './WSCDashboardUsers';
import WSCDashboardStatistics from './WSCDashboardStatistics';
import WSCDashboardTabs from './WSCDashboardTabs';
import { FormattedMessage }  from 'react-intl';

class WSCDashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loginToken: window.sessionStorage.getItem('loginToken'),
			appID: window.sessionStorage.getItem('appID'),
			appName: window.sessionStorage.getItem('appName'),
			app: {
				_users: [],
				_messages: []
			}
		}
	}

	updateApp() {
		fetch(config.apiUrl + 'apps/' + this.state.appID, {
			headers: {
				'Authorization': 'Bearer ' + this.state.loginToken
			}
		})
		.then(function(response) {
			if (response.status === 200) {
				return response.json();
			}

			throw new Error(response.status);
		})
		.then((app) => {
			this.setState({app: app});
		})
		.catch((error) => {
			let status = parseInt(error.message, 10);
			switch(status) {
				case 401:
				case 403:
				case 404:
				case 500:
					// jwt token is not valid anymore or other error
					this.logout();
					break;
				default:
					console.log(error);
			}
		});
	}

	componentWillMount() {
		if (this.state.loginToken === null) {
			this.logout();
			return;
		}

		this.updateApp();
	}

	logout() {
		window.sessionStorage.removeItem('loginToken');
		window.sessionStorage.removeItem('appID');
		window.sessionStorage.removeItem('appName');

		// redirect to apps
		window.location = '/login';
	}

	render() {
		return (
			<div>
				<nav className="col-sm-3 col-md-2 hidden-xs-down bg-faded sidebar">
					<ul className="nav nav-pills flex-column">
						<li className="nav-item">
							<NavLink className="nav-link" to={`${this.props.match.url}/overview`}><FormattedMessage id="wsc.dashboard.overview" /></NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={`${this.props.match.url}/messages`}><FormattedMessage id="wsc.dashboard.messages" /></NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={`${this.props.match.url}/tabs`}><FormattedMessage id="wsc.dashboard.tabs" /></NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={`${this.props.match.url}/users`}><FormattedMessage id="wsc.dashboard.users" /></NavLink>
						</li>
						<li className="nav-item">
							<NavLink className="nav-link" to={`${this.props.match.url}/statistics`}><FormattedMessage id="wsc.dashboard.statistics" /></NavLink>
						</li>
					</ul>
				</nav>

				<Route path={`${this.props.match.url}/overview`} component={props => <WSCDashboardOverview updateApp={() => this.updateApp()} app={this.state.app} {...props} />} />
				<Route path={`${this.props.match.url}/messages`} exact component={props => <WSCDashboardMessages app={this.state.app} {...props} />} />
				<Route path={`${this.props.match.url}/tabs`} exact component={props => <WSCDashboardTabs updateApp={() => this.updateApp()} app={this.state.app} {...props} />} />
				<Route path={`${this.props.match.url}/messages/add`} component={props => <WSCDashboardMessageAdd  updateApp={() => this.updateApp()} app={this.state.app} {...props} />} />
				<Route path={`${this.props.match.url}/users`} component={props => <WSCDashboardUsers app={this.state.app} {...props} />} />
				<Route path={`${this.props.match.url}/statistics`} component={props => <WSCDashboardStatistics app={this.state.app} {...props} />} />
			</div>
		);
	}
}

export default WSCDashboard;
