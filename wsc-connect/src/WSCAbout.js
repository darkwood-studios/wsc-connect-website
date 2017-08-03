import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMessage }  from 'react-intl';

class WSCAbout extends Component {
	render() {
		return (
			<div>
				<h2><FormattedMessage id="wsc.about.title" /></h2>
				Christopher Walz<br />
				Vesoulerstraße 5<br />
				70839 Gerlingen<br />
				<FormattedMessage id="wsc.about.germany" /><br /><br />
				<a href="mailto:hello@wsc-connect.com">hello@wsc-connect.com</a><br /><br />
				<FormattedHTMLMessage id="wsc.about.associated" />
			</div>
		);
	}
}

export default WSCAbout;
