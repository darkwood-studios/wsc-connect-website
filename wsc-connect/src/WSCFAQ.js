import React, { Component } from 'react';
import { Collapse, Card, CardHeader, CardBlock} from 'reactstrap';
import { FormattedMessage }  from 'react-intl';

class WSCFAQ extends Component {
	render() {
		let faqUsersElements = [];
		let faqUsers = [
			{
				title: 'wsc.faq.title1',
				text: 'wsc.faq.text1'
			},
			{
				title: 'wsc.faq.title2',
				text: 'wsc.faq.text2'
			},
		];
		faqUsers.forEach((faq, index) => {
			faqUsersElements.push(<WSCFAQItem faq={faq} key={index} />);
		});

		let faqOwnersElements = [];
		let faqOwners = [
			{
				title: 'wsc.faq.title3',
				text: 'wsc.faq.text3'
			},
			{
				title: 'wsc.faq.title4',
				text: 'wsc.faq.text4',
			}
		];
		faqOwners.forEach((faq, index) => {
			faqOwnersElements.push(<WSCFAQItem faq={faq} key={index} />);
		});
		return (
			<div>
				<h2><FormattedMessage id="wsc.faq.title" /></h2>

				<h5><FormattedMessage id="wsc.faq.users" /></h5>
				{faqUsersElements}

				<h5 className="mt-4"><FormattedMessage id="wsc.faq.owners" /></h5>
				{faqOwnersElements}
			</div>
		);
	}
}

class WSCFAQItem extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			collapse: false 
		};
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({ 
			collapse: !this.state.collapse 
		});
	}

	render() {
		return (
				<Card className="mt-2">
					<CardHeader role="button" onClick={this.toggle}><FormattedMessage id={this.props.faq.title} /></CardHeader>
					<Collapse isOpen={this.state.collapse}>
						<CardBlock>
							<FormattedMessage id={this.props.faq.text} />
						</CardBlock>
					</Collapse>
				</Card>
		);
	}
}

export default WSCFAQ;
