import { INodeProperties } from 'n8n-workflow';

export const tradingParameters: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'trading',
				],
			},
		},
		options: [
			{
				name: 'Trade Transaction',
				value: 'tradeTransaction',
				description: 'Perform a trade transaction',
				action: 'Perform trade transaction',
			},
			{
				name: 'Trade Transaction Status',
				value: 'tradeTransactionStatus',
				description: 'Get the status of a trade transaction',
				action: 'Get trade transaction status',
			},
		],
		default: 'tradeTransaction',
	},
	{
		displayName: 'Trade Transaction Info',
		name: 'tradeTransInfo',
		type: 'string',
		required: true,
		default: '',
		displayOptions: {
			show: {
				resource: [
					'trading',
				],
				operation: [
					'tradeTransaction',
				],
			},
		},
	},
	{
		displayName: 'Order',
		name: 'order',
		type: 'number',
		required: true,
		default: 0,
		description: 'The order to get the trade transaction status for',
		displayOptions: {
			show: {
				resource: [
					'trading',
				],
				operation: [
					'tradeTransactionStatus',
				],
			},
		},
	},
];
