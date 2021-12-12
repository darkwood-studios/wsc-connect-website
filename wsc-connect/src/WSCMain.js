import React, { Component } from 'react';

import SplashImg1 from './splash1.jpg';
import SplashImgIos1 from './splash1ios.jpg';
import SplashImg2 from './splash2.jpg';
import SplashImgIos2 from './splash2ios.jpg';
import SplashImg3 from './splash3.png';
import AppStoreImg from './app-store.svg';
import PlayStoreImg from './play-store.svg';
import { Link } from 'react-router-dom'
import { FormattedMessage, FormattedHTMLMessage }  from 'react-intl';
import { Alert } from 'reactstrap';

class WSCMain extends Component {
	render() {
		return (
			<div>
				<div className="main-container">
					<div className="clearfix">

						<Alert color="info">
							<FormattedMessage id="wsc.dashboard.ios.available" />
						</Alert>

						<img src={SplashImgIos1} className="img-thumbnail float-right img-fluid splash-image-right" alt="" />
						<img src={SplashImg1} className="img-thumbnail float-right img-fluid splash-image-right" alt="" />

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
								<img alt='Get it on Google Play' className="app-badge play-store-badge" src={PlayStoreImg} />
							</a>

							<a href='https://apps.apple.com/us/app/wsc-connect/id1462270360'>
								<img alt='' className="app-badge app-store-badge" src={AppStoreImg} />
							</a>
						</div>
					</div>

					<div className="pt-5 clearfix">
						<img src={SplashImg2} className="img-thumbnail float-left img-fluid splash-image-left" alt="" />
						<img src={SplashImgIos2} className="img-thumbnail float-left img-fluid splash-image-left" alt="" />

						<h2><FormattedMessage id="wsc.main.title2" /></h2>
						<div className="main-container-teaser"><FormattedHTMLMessage id="wsc.main.teaser2" /></div>
						<Link className="btn btn-secondary mt-4" to="/apps"><FormattedMessage id="wsc.main.showAllApps" /></Link>
					</div>

					<div className="pt-5 clearfix">
						<img src={SplashImg3} className="img-thumbnail float-right img-fluid splash-image-right splash-image-small" alt="" />

						<h2><FormattedMessage id="wsc.main.title3" /></h2>
						<div className="main-container-teaser"><FormattedHTMLMessage id="wsc.main.teaser3" /></div>
						<Link className="btn btn-primary mt-4" to="/register"><FormattedMessage id="wsc.nav.register" /></Link>
					</div>
				</div>
				<div className="clearfix" />
			</div>
		);
	}
}

export default WSCMain;
