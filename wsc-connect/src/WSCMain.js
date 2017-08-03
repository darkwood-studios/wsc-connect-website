import React, { Component } from 'react';
import SplashImg from './splash.png';
import { FormattedMessage, FormattedHTMLMessage }  from 'react-intl';

class WSCMain extends Component {
	render() {
		return (
			<div className="main-container">
				<img src={SplashImg} className="img-thumbnail float-right img-fluid splash-image" alt="" />

				<h2><FormattedMessage id="wsc.main.title" /></h2>
				<div className="main-container-teaser"><FormattedHTMLMessage id="wsc.main.teaser" /></div>

				<div className="mt-4">
					<ul>
						<li><FormattedMessage id="wsc.main.reason1" /></li>
						<li><FormattedMessage id="wsc.main.reason2" /></li>
						<li><FormattedMessage id="wsc.main.reason3" /></li>
						<li><FormattedHTMLMessage id="wsc.main.reason4" /></li>
					</ul>

					<a href='https://play.google.com/store/apps/details?id=wscconnect.android&pcampaignid=wsc-connect.com'>
						<img alt='Get it on Google Play' style={{width: '190px'}} src='https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png'/>
					</a>
				</div>
			</div>
		);
	}
}

export default WSCMain;
