import React, { Component } from 'react';
import { Table } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage, FormattedDate, FormattedTime }  from 'react-intl';

class WSCDashboardUsers extends Component {
	constructor(props) {
		super(props);

		this.state = {
			app: props.app,
			loaded: (props.app._id) ? true : false
		}
	}

	render() {
		var users = [];

		if (this.state.app._users) {
			this.state.app._users.forEach(function(user) {
				users.push(<WSCUser user={user} key={user._id} />);
			});
		}

		return (
			<main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
				<h2><FormattedMessage id="wsc.dashboard.users.title" /> ({this.state.app._users.length})</h2>

				<Table striped responsive>
					<thead>
						<tr>
							<th><FormattedMessage id="wsc.dashboard.users.id" /></th>
							<th><FormattedMessage id="wsc.dashboard.users.date" /></th>
							<th><FormattedMessage id="wsc.dashboard.users.platforms" /></th>
						</tr>
					</thead>
					<tbody>
						{this.state.loaded ? users : 
						<tr>
							<td colSpan="3" className="text-center">
								<FontAwesome name='spinner' spin />
							</td>
						</tr>}
					</tbody>
				</Table>
			</main>
		);
	}
}

class WSCUser extends Component {
	render() {
		return (
			<tr>
				<td className="text-left">{this.props.user.userID}</td>
				<td className="text-left"><FormattedDate value={new Date(this.props.user.createdAt)} />, <FormattedTime value={new Date(this.props.user.createdAt)} /></td>
				<td className="text-left">
					{this.props.user.platforms}
				</td>
			</tr>
		);
	}
}

export default WSCDashboardUsers;
