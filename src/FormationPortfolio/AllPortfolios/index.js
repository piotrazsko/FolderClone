import React, { Component } from 'react'
import { Layout } from 'antd'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import PropTypes from 'prop-types'

import {
	getAllPortfoliosSelector,
	getPortfoliosRequest,
	removePortfolioRequest,
} from 'modules/businessProcesses/portfolios'
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

class AllPortfolios extends Component {
	componentDidMount() {
		const { actions } = this.props
		// TEMP: need set default data.
		actions.getPortfoliosRequest({ result: 250 })
	}

	handleParamsChange = params => {
		const { actions } = this.props

		actions.getPortfoliosRequest(params)
	}

	handleDeleteBtnClick = ids => {
		const { actions } = this.props
		actions.removePortfolioRequest(ids)
	}

	handleResendBtnClick = ids => {
		// заглушка
		console.log('resend', ids)
	}

	render() {
		const { portfolios } = this.props
		return (
			<Content>
				<Title>Формирование портфеля</Title>
				<BaseTable
					columns={columns}
					data={portfolios}
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
	portfolios: getAllPortfoliosSelector(state),
})

const mapDispatchToProps = dispatch => ({
	actions: {
		getPortfoliosRequest: bindActionCreators(getPortfoliosRequest, dispatch),
		removePortfolioRequest: bindActionCreators(removePortfolioRequest, dispatch),
	},
})

AllPortfolios.propTypes = {
	portfolios: PropTypes.array.isRequired,
	actions: PropTypes.shape({
		getPortfoliosRequest: PropTypes.func.isRequired,
		removePortfolioRequest: PropTypes.func.isRequired,
	}).isRequired,
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AllPortfolios)
