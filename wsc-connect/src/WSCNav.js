import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem, Badge } from 'reactstrap';
import { NavLink } from 'react-router-dom'
import { FormattedMessage } from 'react-intl';
import DeImg from './de.png';
import EnImg from './gb.png';

class WSCNav extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.state = {
			isOpen: false,
			loginAppName: null
		};
	}

	componentDidMount() {
		if (window.sessionStorage.getItem('loginToken')) {
			this.setState({
				loginAppName: window.sessionStorage.getItem('appName')
			});
		}
	}

	selectLang(lang) {
		window.localStorage.setItem('language', lang);
		window.location.reload();
	}

	logout(e) {
		e.preventDefault();

		window.sessionStorage.removeItem('loginToken');
		window.sessionStorage.removeItem('appID');
		window.sessionStorage.removeItem('appName');

		// redirect to apps
		window.location = '/apps';
	}

	toggle() {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	dashboardIsActive(match, location) {
		return location.pathname.indexOf('/dashboard') !== -1;
	}

	render() {
		return (
			<div>
				<Navbar color="faded" light fixed="top" className="navbar-expand-lg">
					<NavbarToggler onClick={this.toggle} />
					<NavLink className="navbar-brand" to="/"><FormattedMessage id="wsc.nav.wscConnect" /></NavLink>
					<Collapse isOpen={this.state.isOpen} navbar>
						<Nav pills className="mr-auto" navbar>
							<NavItem >
								<NavLink className="nav-link" activeClassName="active" to="/apps"><FormattedMessage id="wsc.nav.apps" /></NavLink>
							</NavItem>
							<NavItem >
								<NavLink className="nav-link" activeClassName="active" to="/faq"><FormattedMessage id="wsc.nav.faq" /></NavLink>
							</NavItem>
							{this.state.loginAppName &&
								<NavItem>
									<NavLink className="nav-link" activeClassName="active" isActive={this.dashboardIsActive} to="/dashboard/overview">Dashboard ({this.state.loginAppName})</NavLink>
								</NavItem>
							}
							<NavItem>
								<NavLink className="nav-link" to="/support"><Badge color="danger"><FormattedMessage id="wsc.nav.support" /></Badge></NavLink>
							</NavItem>
							<NavItem>
								<a className="nav-link" href="https://paypal.me/fitbitgym"><Badge color="info"><FormattedMessage id="wsc.nav.support.paypal" /></Badge></a>
							</NavItem>
						</Nav>

						<Nav navbar>
							<NavItem>
								<NavLink className="nav-link" to="/download"><Badge color="info"><FormattedMessage id="wsc.nav.version" values={{version: "X.0.5"}} /></Badge></NavLink>
							</NavItem>
							<NavItem className="languageChoose">
								<div className="nav-link" onClick={() => { this.selectLang("de") }}><img src={DeImg} alt="" /></div>
							</NavItem>
							<NavItem className="languageChoose">
								<div className="nav-link" onClick={() => { this.selectLang("en") }}><img src={EnImg} alt="" /></div>
							</NavItem>
						</Nav>
						{!this.state.loginAppName ? (
							<Nav pills navbar>
								<NavItem>
									<NavLink className="nav-link" activeClassName="active" to="/login"><FormattedMessage id="wsc.nav.login" /></NavLink>
								</NavItem>

								<NavItem>
									<NavLink className="nav-link btn btn-success" activeClassName="btn-warning" to="/register"><FormattedMessage id="wsc.nav.register" /></NavLink>
								</NavItem>
							</Nav>
							) : (
								<Nav navbar>
									<NavItem>
										<NavLink className="nav-link" activeClassName="active" to="#" onClick={this.logout.bind(this)}><FormattedMessage id="wsc.nav.logout" /></NavLink>
									</NavItem>
								</Nav>
							)
						}
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default WSCNav;
