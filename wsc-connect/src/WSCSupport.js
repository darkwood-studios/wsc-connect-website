import React, { Component } from 'react';
import { FormattedHTMLMessage, FormattedMessage }  from 'react-intl';

class WSCSupport extends Component {
	render() {
		return (
			<div>
				<h2><FormattedMessage id="wsc.support.title" /></h2>

				<FormattedHTMLMessage id="wsc.support.text" />
			</div>
		);
	}
}

export default WSCSupport;
