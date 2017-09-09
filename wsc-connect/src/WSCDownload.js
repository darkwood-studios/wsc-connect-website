import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMessage }  from 'react-intl';
import { Badge } from 'reactstrap';

class WSCDownload extends Component {
	render() {
		return (
			<div>
				<h2><FormattedMessage id="wsc.download.title" /></h2>
				<div>
					<FormattedHTMLMessage id="wsc.download.android" />
					<div><Badge color="info"><FormattedMessage id="wsc.version" values={{version: "1.0.8"}} /></Badge></div>
					<div><small className="text-muted"><FormattedMessage id="wsc.download.android.description" /></small></div>
				</div>
				<div className="mt-3">
					<FormattedHTMLMessage id="wsc.download.wsc" />
					<div><Badge color="info"><FormattedMessage id="wsc.version" values={{version: "3.0.8"}} /></Badge></div>
					<div><small className="text-muted"><FormattedHTMLMessage id="wsc.download.wsc.description" /></small></div>
				</div>
				<div className="mt-3">
					<FormattedHTMLMessage id="wsc.download.wcf" />
					<div><Badge color="info"><FormattedMessage id="wsc.version" values={{version: "2.0.8"}} /></Badge></div>
					<div><small className="text-muted"><FormattedHTMLMessage id="wsc.download.wcf.description" /></small></div>
				</div>
			</div>
		);
	}
}

export default WSCDownload;
