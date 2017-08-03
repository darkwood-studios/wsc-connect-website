import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom'
import { FormattedMessage }  from 'react-intl';

class WSCFooter extends Component {
	render() {
		let dashboard = (this.props.location.pathname.indexOf('/dashboard') !== -1);

		return (
			<footer className={dashboard ? 'col-sm-9 offset-sm-3 col-md-10 offset-md-2 footer' : 'footer'}>
				<div className="container">
					<a className="btn" href="https://play.google.com/store/apps/details?id=wscconnect.android&pcampaignid=wsc-connect.com"><img alt="Get it on Google Play" src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" style={{width: '140px'}}  /></a>
					<Link className="btn" to="#"><FormattedMessage id="wsc.footer.plugin" /></Link>
					<NavLink className="btn" to="/about"><FormattedMessage id="wsc.footer.about" /></NavLink>
				</div>
			</footer>
		);
	}
}

export default WSCFooter;
