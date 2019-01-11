import React, { Component } from 'react';
import WSCNav from './WSCNav';
import WSCMain from './WSCMain';
import WSCApps from './WSCApps';
import WSCRegister from './WSCRegister';
import WSCAbout from './WSCAbout';
import WSCLogin from './WSCLogin';
import WSCFooter from './WSCFooter';
import WSCDashboard from './WSCDashboard';
import WSCForgot from './WSCForgot';
import WSCFAQ from './WSCFAQ';
import WSCDownload from './WSCDownload';
import WSCPrivacy from './WSCPrivacy';
import WSCSupport from './WSCSupport';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import { addLocaleData, IntlProvider } from 'react-intl';
import en from 'react-intl/locale-data/en';
import de from 'react-intl/locale-data/de';

addLocaleData([...en, ...de]);

let i18n = {};
let lang = window.localStorage.getItem('language');

if (lang === null) {
	if (navigator.language.indexOf("de") !== -1)  {
		lang = 'de';
	} else {
		lang = 'en';
	}
}

i18n.locale = lang;
i18n.messages = require(`./${lang}.json`);


class App extends Component {
	render() {
		return (
			<IntlProvider locale={i18n.locale} messages={i18n.messages}>
				<Router>
					<div className="App">
						<WSCNav />
						<div className="layout container">
							<Route exact path="/" component={WSCMain} />
							<Route path="/apps" component={WSCApps} />
							<Route path="/about" component={WSCAbout} />
							<Route path="/register" component={WSCRegister} />
							<Route path="/login" component={WSCLogin} />
							<Route path="/dashboard" component={WSCDashboard} />
							<Route path="/forgot" component={WSCForgot} />
							<Route path="/faq" component={WSCFAQ} />
							<Route path="/download" component={WSCDownload} />
							<Route path="/privacy" component={WSCPrivacy} />
							<Route path="/support" component={WSCSupport} />
						</div>
						<Route component={WSCFooter} />
					</div>
				</Router>
			</IntlProvider>
		);
	}
}

export default App;
