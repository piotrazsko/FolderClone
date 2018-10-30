import React, { Component } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import {
	getAllManualPaymentsSelector,
	getManualPaymentsRequest,
	removeManualPaymentRequest,
} from 'modules/businessProcesses/manualPayments'
import { Title, BaseTable } from 'components'

const { Content } = Layout

const columns = [
	{
		title: '',
		dataIndex: 'edit',
	},
	{
		title: 'Номер блока',
		dataIndex: 'blockNumber',
		sorter: true,
		filters: true,
	},
	{
		title: 'Имя блока',
		dataIndex: 'blockName',
		sorter: true,
		filters: true,
	},
	{
		title: 'Тип блока',
		dataIndex: 'blockType',
		sorter: true,
	},
]

class AllManualPayments extends Component {
	componentDidMount() {
		const { actions } = this.props
		// TEMP: need set default data.
		actions.getManualPaymentsRequest({ result: 250 })
	}

	handleParamsChange = params => {
		const { actions } = this.props

		actions.getManualPaymentsRequest(params)
	}

	handleDeleteBtnClick = ids => {
		const { actions } = this.props
		actions.removeManualPaymentRequest(ids)
	}

	handleResendBtnClick = ids => {
		// заглушка
		console.log('resend', ids)
	}

	render() {
		const { manualPayments } = this.props
		return (
			<Content>
				<Title>Формирование портфеля</Title>
				<BaseTable
					columns={columns}
					data={manualPayments}
					total={100}
					isLoading={false}
					onParamsChange={this.handleParamsChange}
					onDeleteBtnClick={this.handleDeleteBtnClick}
					onResendBtnClick={this.handleResendBtnClick}
				/>
			</Content>
		)
	}
}

const mapStateToProps = state => ({
	manualPayments: getAllManualPaymentsSelector(state),
})

const mapDispatchToProps = dispatch => ({
	actions: {
		getManualPaymentsRequest: bindActionCreators(getManualPaymentsRequest, dispatch),
		removeManualPaymentRequest: bindActionCreators(removeManualPaymentRequest, dispatch),
	},
})

AllManualPayments.propTypes = {
	manualPayments: PropTypes.array.isRequired,
	actions: PropTypes.shape({
		getManualPaymentsRequest: PropTypes.func.isRequired,
		removeManualPaymentRequest: PropTypes.func.isRequired,
	}).isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AllManualPayments)
