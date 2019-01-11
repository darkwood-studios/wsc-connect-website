import React, { Component } from 'react';
import { FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
import { FormattedMessage, FormattedHTMLMessage, injectIntl }  from 'react-intl';

class WSCInput extends Component {
	toHTML(string) {
		return {__html: string};
	}

	render() {
  		const placeholder = (this.props.input.placeholder) ? this.props.intl.formatMessage({id: this.props.input.placeholder}) : '';
		return (
			<FormGroup className={this.props.validateErrors && this.props.validateErrors.error ? 'is-invalid' : null} color={this.props.validateErrors && this.props.validateErrors.error ? 'danger' : null}>
				<Label for={this.props.input.id}><FormattedMessage id={this.props.input.label} /></Label>
				<Input className={this.props.validateErrors && this.props.validateErrors.error ? 'is-invalid' : null} required readOnly={(this.props.readonly || this.props.input.readonly) ? true : false} type={this.props.input.inputType} name={this.props.input.id} id={this.props.input.id} defaultValue={this.props.input.value} placeholder={placeholder} />
				{this.props.input.description &&
					<FormText color="muted"><FormattedHTMLMessage id={this.props.input.description} /></FormText>
				}
				{this.props.validateErrors && this.props.validateErrors.message &&
					<FormFeedback><FormattedHTMLMessage id={this.props.validateErrors.message} /></FormFeedback>
				}
			</FormGroup>
		);
	}
}

export default injectIntl(WSCInput);
