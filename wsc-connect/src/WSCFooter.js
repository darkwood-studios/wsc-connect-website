import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { FormattedMessage }  from 'react-intl';

class WSCFooter extends Component {
	render() {
		let dashboard = (this.props.location.pathname.indexOf('/dashboard') !== -1);

		return (
			<footer className={dashboard ? 'col-sm-9 offset-sm-3 col-md-10 offset-md-2 footer' : 'footer'}>
				<div className="container">
					<a className="btn" href="https://play.google.com/store/apps/details?id=wscconnect.android&pcampaignid=wsc-connect.com"><FormattedMessage id="wsc.footer.android" /></a>
					<a className="btn" href="https://pluginstore.woltlab.com/file/2666-wsc-connect-wsc-version/"><FormattedMessage id="wsc.footer.plugin.wsc" /></a>
					<a className="btn" href="https://pluginstore.woltlab.com/file/2667-wsc-connect-wcf-2-1-version/"><FormattedMessage id="wsc.footer.plugin.wcf" /></a>
					<NavLink className="btn" to="/about"><FormattedMessage id="wsc.footer.about" /></NavLink>
					<NavLink className="btn" to="/privacy"><FormattedMessage id="wsc.footer.privacy" /></NavLink>
				</div>
			</footer>
		);
	}
}

export default WSCFooter;
