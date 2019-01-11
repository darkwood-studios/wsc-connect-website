import React, { Component } from 'react';
import { FormattedMessage, FormattedHTMLMessage }  from 'react-intl';
import { Col, CardText, Card, CardHeader, CardBlock} from 'reactstrap';

class WSCPrivacy extends Component {
	render() {
		let privacyElements = [];
		for (var i=1; i <= 6; i++) {
			privacyElements.push(<WSCPrivacyElement key={i} index={i} />);
		};
		return (
			<div>
				<p><small><FormattedMessage id="wsc.privacy.updated" /></small></p>
				<h2><FormattedMessage id="wsc.privacy.title" /></h2>
				{privacyElements}
			</div>
		);
	}
}

class WSCPrivacyElement extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
				<Col style={{marginTop: 10 + 'px'}}>
					<Card>
						<CardHeader><FormattedMessage id={"wsc.privacy.header" + this.props.index} /></CardHeader>
						
						<CardBlock>
							<CardText><FormattedHTMLMessage id={"wsc.privacy.text" + this.props.index} /></CardText>
						</CardBlock>
					</Card>
				</Col>
		);
	}
}

export default WSCPrivacy;
