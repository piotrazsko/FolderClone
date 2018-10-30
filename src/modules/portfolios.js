import { createAction } from 'redux-actions'
import { helpers } from 'eco-api'
import { appName } from 'configs/app'

import AllPortfolios from './FormationPortfolio/AllPortfolios'
import EditPortfolio from './FormationPortfolio/EditPortfolio'
import AddPortfolio from './FormationPortfolio/AddPortfolio'

const setIn = helpers.obj.setIn
// constants
export const moduleName = 'businessProcesses'
const prefix = `${appName}/${moduleName}`

export const GET_PORTFOLIOS_REQUEST = `${prefix}/GET_PORTFOLIOS_REQUEST`
export const GET_PORTFOLIOS_SUCCESS = `${prefix}/GET_PORTFOLIOS_SUCCESS`
export const GET_PORTFOLIO_REQUEST = `${prefix}/GET_PORTFOLIO_REQUEST`
export const REMOVE_PORTFOLIO_REQUEST = `${prefix}/REMOVE_PORTFOLIO_REQUEST`
export const ADD_PORTFOLIO_REQUEST = `${prefix}/ADD_PORTFOLIO_REQUEST`
export const EDIT_PORTFOLIO_REQUEST = `${prefix}/EDIT_PORTFOLIO_REQUEST`

// actionCreators
export const getPortfoliosRequest = createAction(GET_PORTFOLIOS_REQUEST)
export const getPortfolioRequest = createAction(GET_PORTFOLIO_REQUEST)
export const removePortfolioRequest = createAction(REMOVE_PORTFOLIO_REQUEST)
export const addPortfolioRequest = createAction(ADD_PORTFOLIO_REQUEST)
export const editPortfolioRequest = createAction(EDIT_PORTFOLIO_REQUEST)

// reducer
const initialState = {
	allPortfolios: [],
}

export default function borrowers(state = initialState, action) {
	switch (action.type) {
		case GET_PORTFOLIOS_SUCCESS:
			return setIn(state, 'allPortfolios', generateTestData(action.response.data.results))
		default:
			return state
	}
}

function generateTestData(users) {
	const result = []
	for (let i = 0; i < users.length / 2; i++) {
		result.push({
			key: i,
			id: i,
			blockNumber: `${i + 1}`,
			blockName: `test name of block`,
			blockType: `Type ${Math.floor(Math.random() * 100)}`,
		})
	}
	return result
}

// api
const portfoliosRequests = {}

portfoliosRequests[GET_PORTFOLIOS_REQUEST] = ({ result }) => ({
	url: `api/?inc=name&results=${result}`,
	method: 'get',
})

portfoliosRequests[GET_PORTFOLIO_REQUEST] = ({ quantity }) => ({
	url: `api/?inc=name&results=${quantity}`,
	method: 'get',
})

portfoliosRequests[ADD_PORTFOLIO_REQUEST] = () => ({
	url: `api/?inc=name&results=${1}`,
	method: 'get',
})

portfoliosRequests[EDIT_PORTFOLIO_REQUEST] = () => ({
	url: `api/?inc=name&results=${1}`,
	method: 'get',
})
portfoliosRequests[REMOVE_PORTFOLIO_REQUEST] = () => ({
	url: `api/?inc=name&results=${1}`,
	method: 'get',
})

export { portfoliosRequests }

// selectors

export const getAllPortfoliosSelector = state => state.businessProcesses.portfolios.allPortfolios
export const getPortfolioDataSelector = helpers.apiSelector(GET_PORTFOLIO_REQUEST)
