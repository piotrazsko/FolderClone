import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Layout } from 'antd'
import PropTypes from 'prop-types'

import { Title } from 'components'
import {
	getManualPaymentDataSelector,
	getManualPaymentRequest,
	editManualPaymentRequest,
} from 'modules/businessProcesses/manualPayments'

import ManualPaymentForm from '../ManualPaymentForm'

const { Content } = Layout

class EditManualPayment extends Component {
	componentDidMount() {
		const { actions } = this.props
		actions.getManualPaymentRequest(1)
	}

	handleSubmit = data => {
		const { actions } = this.props
		actions.editManualPaymentRequest(data)
	}

	render() {
		const { manualPayment } = this.props
		const initialData = {
			blockNumber: Math.floor(Math.random() * 1000),
			blockName: `test name of block`,
			blockType: '3',
		}
		return (
			<Content>
				<Title>Редактировать блок</Title>
				<ManualPaymentForm initialData={initialData} isEdit onSubmit={this.handleSubmit} />
			</Content>
		)
	}
}
EditManualPayment.propTypes = {
	manualPayment: PropTypes.object.isRequired,
	actions: PropTypes.shape({
		getManualPaymentRequest: PropTypes.func.isRequired,
		editManualPaymentRequest: PropTypes.func.isRequired,
	}).isRequired,
}

const mapStateToProps = state => ({ manualPayment: getManualPaymentDataSelector(state) })

const mapDispatchToProps = dispatch => ({
	actions: {
		getManualPaymentRequest: bindActionCreators(getManualPaymentRequest, dispatch),
		editManualPaymentRequest: bindActionCreators(editManualPaymentRequest, dispatch),
	},
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditManualPayment)
