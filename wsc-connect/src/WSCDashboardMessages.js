import React, { Component } from 'react';
import WSCInput from './WSCInput';
import { Button, Form, Alert, Table} from 'reactstrap';
import { Link } from 'react-router-dom'
import { config } from './config.js';
import { FormattedMessage, FormattedDate, FormattedTime }  from 'react-intl';

class WSCDashboardMessages extends Component {
	constructor(props) {
		super(props);

		this.state = {
			app: props.app
		}
	}

	componentDidMount() {
		if (this.props.location.hash && this.props.location.hash === '#refresh') {
			window.history.replaceState("", document.title, window.location.pathname);
			window.location.reload();
		}
	}

	render() {
		let messages = [];

		this.state.app._messages.forEach(function(message) {
			messages.unshift(<MessageRow message={message} key={message._id} />);
		});

		return (
			<main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
				<Link className="btn btn-success" style={{float: 'right'}} to={`${this.props.match.url}/add`}><FormattedMessage id="wsc.dashboard.messages.add" /></Link>
				<h2><FormattedMessage id="wsc.dashboard.messages.title" /> ({messages.length})</h2>
				<Table striped responsive>
					<thead>
						<tr>
							<th><FormattedMessage id="wsc.dashboard.messages.table.title" /></th>
							<th><FormattedMessage id="wsc.dashboard.messages.table.message" /></th>
							<th><FormattedMessage id="wsc.dashboard.messages.table.targets" /></th>
							<th><FormattedMessage id="wsc.dashboard.messages.table.date" /></th>
						</tr>
					</thead>
					<tbody>
						{messages.length ? messages : 
						<tr>
							<td colSpan="4" className="text-center">
								<FormattedMessage id="wsc.dashboard.messages.table.empty" />
							</td>
						</tr>}
					</tbody>
				</Table>
			</main>
		);
	}
}

class MessageRow extends React.Component {
	render() {
		return (
			<tr>
				<td className="text-left">{this.props.message.title}</td>
				<td className="text-left">{this.props.message.message}</td>
				<td className="text-left">~{this.props.message.targets}</td>
				<td className="text-left"><FormattedDate value={this.props.message.createdAt} />, <FormattedTime value={this.props.message.createdAt} /></td>
			</tr>
		);
	}
}

export default WSCDashboardMessages;
