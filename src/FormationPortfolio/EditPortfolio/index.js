import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Layout } from 'antd'
import PropTypes from 'prop-types'

import { Title } from 'components'
import {
	getPortfolioDataSelector,
	getPortfolioRequest,
	editPortfolioRequest,
} from 'modules/businessProcesses/portfolios'

import FormationPortfolioForm from '../FormationPortfolioForm'

const { Content } = Layout

class EditPortfolio extends Component {
	componentDidMount() {
		const { actions } = this.props
		actions.getPortfolioRequest(1)
	}

	handleSubmit = data => {
		const { actions } = this.props
		actions.editPortfolioRequest(data)
	}

	render() {
		const { portfolio } = this.props
		const initialData = {
			blockNumber: Math.floor(Math.random() * 1000),
			blockName: `test name of block`,
			blockType: '3',
		}
		return (
			<Content>
				<Title>Редактировать блок</Title>
				<FormationPortfolioForm initialData={initialData} isEdit onSubmit={this.handleSubmit} />
			</Content>
		)
	}
}
EditPortfolio.propTypes = {
	portfolio: PropTypes.object.isRequired,
	actions: PropTypes.shape({
		getPortfolioRequest: PropTypes.func.isRequired,
		editPortfolioRequest: PropTypes.func.isRequired,
	}).isRequired,
}

const mapStateToProps = state => ({ portfolio: getPortfolioDataSelector(state) })

const mapDispatchToProps = dispatch => ({
	actions: {
		getPortfolioRequest: bindActionCreators(getPortfolioRequest, dispatch),
		editPortfolioRequest: bindActionCreators(editPortfolioRequest, dispatch),
	},
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EditPortfolio)
