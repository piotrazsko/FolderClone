import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Input, Select, Button, Row, Col } from 'antd'

import { Form, FormItem } from 'components'
import { rules, formItemLayout, formItemSubmitLayout } from 'configs/form'

const { Option } = Select

class ManualPaymentForm extends Component {
	handleSubmit = ({ fields: data }) => {
		this.props.onSubmit(data)
	}

	render() {
		const { initialData, isEdit } = this.props
		const BlockNum = () =>
			isEdit ? (
				<Col span={24}>
					<FormItem
						label="Номер блока"
						options={{
							rules: [rules.required],
							initialValue: initialData.blockNumber,
						}}
						{...formItemLayout}
					>
						<Input name="blockNumber" disabled placeholder="Номер блока" />
					</FormItem>
				</Col>
			) : null
		return (
			<Row>
				<Col span={8} offset={8}>
					<Form onSubmit={this.handleSubmit}>
						<BlockNum />
						<Row>
							<Col span={24}>
								<FormItem
									label="Имя блока"
									options={{
										rules: [rules.required],
										initialValue: initialData.blockName,
									}}
									{...formItemLayout}
								>
									<Input name="blockName" placeholder="Имя блока" />
								</FormItem>
							</Col>
							<Col span={24}>
								<FormItem
									label="Тип блока"
									options={{
										rules: [rules.required],
										initialValue: initialData.blockType,
									}}
									{...formItemLayout}
								>
									<Select defaultValue={isEdit ? '1' : null} placeholder="Тип блока">
										<Option value="1" key="1">
											Type 1
										</Option>
										<Option value="2" key="2">
											Type 2
										</Option>
										<Option value="3" key="3">
											Type 3
										</Option>
									</Select>
								</FormItem>
							</Col>
							<Col span={4} offset={12}>
								<FormItem {...formItemSubmitLayout}>
									<Button type="primary" htmlType="submit">
										{isEdit ? 'Сохранить' : 'Создать'}
									</Button>
								</FormItem>
							</Col>
						</Row>
					</Form>
				</Col>
			</Row>
		)
	}
}

ManualPaymentForm.propTypes = {
	initialData: PropTypes.object,
	isEdit: PropTypes.bool,
	onSubmit: PropTypes.func.isRequired,
}

ManualPaymentForm.defaultProps = {
	initialData: {},
	isEdit: false,
}

export default connect(
	null,
	null
)(ManualPaymentForm)
