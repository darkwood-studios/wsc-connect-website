import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMessage }  from 'react-intl';

class WSCAbout extends Component {
	render() {
		return (
			<div>
				<h2><FormattedMessage id="wsc.about.title" /></h2>
				Daniel Hass<br />
				Köpenicker Str. 36<br />
				15754 Heidesee<br />
				<FormattedMessage id="wsc.about.germany" /><br /><br />
				<a href="mailto:hello@wsc-connect.com">hello@wsc-connect.com</a><br /><br />
				<FormattedHTMLMessage id="wsc.about.associated" />
				<FormattedHTMLMessage id="wsc.about.references" />
			</div>
		);
	}
}

export default WSCAbout;
