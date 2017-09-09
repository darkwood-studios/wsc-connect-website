import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMessage }  from 'react-intl';

class WSCPrivacy extends Component {
	render() {
		return (
			<div>
				<p><small><FormattedMessage id="wsc.privacy.updated" /></small></p>
				<FormattedHTMLMessage id="wsc.privacy.text" />
			</div>
		);
	}
}

export default WSCPrivacy;
