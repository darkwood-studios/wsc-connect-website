import React, { Component } from 'react';
import { Table, Alert } from 'reactstrap';
import FontAwesome from 'react-fontawesome';
import { FormattedMessage, FormattedDate }  from 'react-intl';

class WSCDashboardStatistics extends Component {
	constructor(props) {
		super(props);

		this.state = {
			app: props.app,
			statistics: [],
			empty: false
		}
	}

	componentDidMount() {
		this.calculateStatistics();
	}

	calculateStatistics() {
		var monthlyStatistic = {};
		var statistics = [];

		if (this.state.app._statistics && this.state.app._statistics.length) {
			this.state.app._statistics.forEach(function(statistic) {
				var date = new Date(statistic.createdAt);
				var monthDateString = date.getFullYear() + "-" + date.getMonth();
				if (!monthlyStatistic.hasOwnProperty(monthDateString)) {
					monthlyStatistic[monthDateString] = {
						count: 0,
						days: {}
					};
				}

				monthlyStatistic[monthDateString]['count']++;

				var dayDateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
				if (!monthlyStatistic[monthDateString]['days'].hasOwnProperty(dayDateString)) {
					monthlyStatistic[monthDateString]['days'][dayDateString] = {
						count: 0,
						hours: {}
					};
				}

				monthlyStatistic[monthDateString]['days'][dayDateString]['count']++;

				var hourDateString = date.getHours();;
				if (!monthlyStatistic[monthDateString]['days'][dayDateString]['hours'].hasOwnProperty(hourDateString)) {
					monthlyStatistic[monthDateString]['days'][dayDateString]['hours'][hourDateString] = 0;
				}

				monthlyStatistic[monthDateString]['days'][dayDateString]['hours'][hourDateString]++;
			});

			for (var key in monthlyStatistic) {
				if (!monthlyStatistic.hasOwnProperty(key)) {
					continue;
				}

				var count = monthlyStatistic[key]['count'];
				var splittedDate = key.split('-');
				var year = splittedDate[0];
				var month = splittedDate[1];
				var date = new Date(year, month, 1, 0, 0, 0, 0);
				var days = monthlyStatistic[key]['days'];
				statistics.push(<WSCMonthStatistic date={date} count={count} days={days} key={key} />);
			}

			this.setState({
				statistics
			});
	 	} else {
			this.setState({
				empty: true
			});
	 	}
	}

	render() {
		return (
			<main className="col-sm-9 offset-sm-3 col-md-10 offset-md-2 pt-3">
				<h2><FormattedMessage id="wsc.dashboard.statistics.title" /></h2>

				<Table striped responsive hover className="statistics">
					<thead>
						<tr>
							<th><FormattedMessage id="wsc.dashboard.statistics.date" /></th>
							<th><FormattedMessage id="wsc.dashboard.statistics.request" /></th>
						</tr>
					</thead>
						{this.state.empty &&
							<tbody>
								<tr>
									<td colSpan="2" className="text-center">
										<Alert color="info"><FormattedMessage id="wsc.dashboard.statistics.empty" /></Alert>
									</td>
								</tr>
							</tbody>
						}

						{this.state.statistics.length ? this.state.statistics : null}

						{(!this.state.statistics.length && !this.state.empty) &&
						<tbody>
							<tr>
								<td colSpan="2" className="text-center">
									<FontAwesome name='spinner' spin />
								</td>
							</tr>
						</tbody>}
				</Table>
			</main>
		);
	}
}

class WSCMonthStatistic extends Component {
	constructor(props) {
		super(props);

		this.state = {
			details: false
		}
	}

	toggleDetails() {
		this.setState({
			details: !this.state.details
		})
	}

	render() {
		var days = [];

		for (var key in this.props.days) {
			if (!this.props.days.hasOwnProperty(key)) {
				continue;
			}

			var splittedDate = key.split('-');
			var year = splittedDate[0];
			var month = splittedDate[1];
			var day = splittedDate[2];
			var date = new Date(year, month, day, 0, 0, 0, 0);
			days.push(<WSCDayStatistic key={key} date={date} hours={this.props.days[key]['hours']} count={this.props.days[key]['count']} stats={this.props.stats} />);
		}

		days.reverse();

		return (
			<tbody>
				<tr onClick={this.toggleDetails.bind(this)}>
					<td className="text-left"><FormattedDate month="long" year="numeric" value={new Date(this.props.date)} /></td>
					<td className="text-left">{this.props.count}</td>
				</tr>
				{this.state.details && days}
			</tbody>
		);
	}
}

class WSCDayStatistic extends WSCMonthStatistic {
	render() {
		if (!this.state.details) {
			return (
				<tr className="small" /*onClick={this.toggleDetails.bind(this)}*/>
					<td><FormattedDate month="long" day="numeric" value={new Date(this.props.date)} /></td>
					<td>{this.props.count}</td>
				</tr>
			);
		} else {
		}
	}
}

export default WSCDashboardStatistics;
