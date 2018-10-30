import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Layout } from 'antd'
import PropTypes from 'prop-types'

import { Title } from 'components'
import { addPortfolioRequest } from 'modules/businessProcesses/portfolios'
import FormationPortfolioForm from '../FormationPortfolioForm'

const { Content } = Layout

class AddPortfolio extends Component {
	handleSubmit = data => {
		const { actions } = this.props
		actions.addPortfolioRequest(data)
	}

	render() {
		return (
			<Content>
				<Title>Добавить блок</Title>
				<FormationPortfolioForm onSubmit={this.handleSubmit} />
			</Content>
		)
	}
}
AddPortfolio.propTypes = {
	actions: PropTypes.shape({
		addPortfolioRequest: PropTypes.func.isRequired,
	}).isRequired,
}

const mapDispatchToProps = dispatch => ({
	actions: {
		addPortfolioRequest: bindActionCreators(addPortfolioRequest, dispatch),
	},
})

export default connect(
	null,
	mapDispatchToProps
)(AddPortfolio)
