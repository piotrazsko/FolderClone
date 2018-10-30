import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Layout } from 'antd'
import PropTypes from 'prop-types'

import { Title } from 'components'
import { addManualPaymentRequest } from 'modules/businessProcesses/manualPayments'
import ManualPaymentForm from '../ManualPaymentForm'

const { Content } = Layout

class AddManualPayment extends Component {
	handleSubmit = data => {
		const { actions } = this.props
		actions.addManualPaymentRequest(data)
	}

	render() {
		return (
			<Content>
				<Title>Добавить блок</Title>
				<ManualPaymentForm onSubmit={this.handleSubmit} />
			</Content>
		)
	}
}
AddManualPayment.propTypes = {
	actions: PropTypes.shape({
		addManualPaymentRequest: PropTypes.func.isRequired,
	}).isRequired,
}

const mapDispatchToProps = dispatch => ({
	actions: {
		addManualPaymentRequest: bindActionCreators(addManualPaymentRequest, dispatch),
	},
})

export default connect(
	null,
	mapDispatchToProps
)(AddManualPayment)
