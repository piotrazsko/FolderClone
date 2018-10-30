import { createAction } from 'redux-actions'
import { helpers } from 'eco-api'
import { appName } from 'configs/app'

import AllManualPayments from './ManualPayment/AllManualPayments'
import EditManualPayment from './ManualPayment/EditManualPayment'
import AddManualPayment from './ManualPayment/AddManualPayment'

const setIn = helpers.obj.setIn
// constants
export const moduleName = 'businessProcesses'
const prefix = `${appName}/${moduleName}`

export const GET_MANUAL_PAYMENTS_REQUEST = `${prefix}/GET_MANUAL_PAYMENTS_REQUEST`
export const GET_MANUAL_PAYMENTS_SUCCESS = `${prefix}/GET_MANUAL_PAYMENTS_SUCCESS`
export const GET_MANUAL_PAYMENT_REQUEST = `${prefix}/GET_MANUAL_PAYMENT_REQUEST`
export const REMOVE_MANUAL_PAYMENT_REQUEST = `${prefix}/REMOVE_MANUAL_PAYMENT_REQUEST`
export const ADD_MANUAL_PAYMENT_REQUEST = `${prefix}/ADD_MANUAL_PAYMENT_REQUEST`
export const EDIT_MANUAL_PAYMENT_REQUEST = `${prefix}/EDIT_MANUAL_PAYMENT_REQUEST`

// actionCreators
export const getManualPaymentsRequest = createAction(GET_MANUAL_PAYMENTS_REQUEST)
export const getManualPaymentRequest = createAction(GET_MANUAL_PAYMENT_REQUEST)
export const removeManualPaymentRequest = createAction(REMOVE_MANUAL_PAYMENT_REQUEST)
export const addManualPaymentRequest = createAction(ADD_MANUAL_PAYMENT_REQUEST)
export const editManualPaymentRequest = createAction(EDIT_MANUAL_PAYMENT_REQUEST)

// reducer
const initialState = {
	allManualPayments: [],
}

export default function borrowers(state = initialState, action) {
	switch (action.type) {
		case GET_MANUAL_PAYMENTS_SUCCESS:
			return setIn(state, 'allManualPayments', generateTestData(action.response.data.results))
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
const manualPaymentsRequests = {}

manualPaymentsRequests[GET_MANUAL_PAYMENTS_REQUEST] = ({ result }) => ({
	url: `api/?inc=name&results=${result}`,
	method: 'get',
})

manualPaymentsRequests[GET_MANUAL_PAYMENT_REQUEST] = ({ quantity }) => ({
	url: `api/?inc=name&results=${quantity}`,
	method: 'get',
})

manualPaymentsRequests[ADD_MANUAL_PAYMENT_REQUEST] = () => ({
	url: `api/?inc=name&results=${1}`,
	method: 'get',
})

manualPaymentsRequests[EDIT_MANUAL_PAYMENT_REQUEST] = () => ({
	url: `api/?inc=name&results=${1}`,
	method: 'get',
})
manualPaymentsRequests[REMOVE_MANUAL_PAYMENT_REQUEST] = () => ({
	url: `api/?inc=name&results=${1}`,
	method: 'get',
})

export { manualPaymentsRequests }

// selectors

export const getAllManualPaymentsSelector = state => state.businessProcesses.manualPayments.allManualPayments
export const getManualPaymentDataSelector = helpers.apiSelector(GET_MANUAL_PAYMENT_REQUEST)
