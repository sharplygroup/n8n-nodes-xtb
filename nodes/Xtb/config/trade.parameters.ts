import { INodeProperties } from 'n8n-workflow';

export const tradeParameters: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'trade',
				],
			},
		},
		options: [
			{
				name: 'Get Trades',
				value: 'getTrades',
				action: 'Get trades',
			},
			{
				name: 'Get Trade Records',
				value: 'getTradeRecords',
				action: 'Get trade records',
			},
			{
				name: 'Get Trades History',
				value: 'getTradesHistory',
				action: 'Get trades history',
			},
			{
				name: 'Get Trade Status',
				value: 'getTradeStatus',
				action: 'Get trade status',
			},
		],
		default: 'getTrades',
	},
	{
		displayName: 'Opened Only',
		name: 'openedOnly',
		type: 'boolean',
		required: true,
		default: false,
		description: 'Whether to get only opened trades',
		displayOptions: {
			show: {
				resource: [
					'trade',
				],
				operation: [
					'getTrades',
				],
			},
		},
	},
	{
		displayName: 'Orders',
		name: 'orders',
		type: 'number',
		required: true,
		default: 0,
		description: 'The orders to get the trade records for',
		displayOptions: {
			show: {
				resource: [
					'trade',
				],
				operation: [
					'getTradeRecords',
				],
			},
		},
	},
	{
		displayName: 'End',
		name: 'end',
		type: 'number',
		required: true,
		default: 0,
		description: 'The end date',
		displayOptions: {
			show: {
				resource: [
					'trade',
				],
				operation: [
					'getTradesHistory',
				],
			},
		},
	},
	{
		displayName: 'Start',
		name: 'start',
		type: 'number',
		required: true,
		default: 0,
		description: 'The start date',
		displayOptions: {
			show: {
				resource: [
					'trade',
				],
				operation: [
					'getTradesHistory',
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
		description: 'The order to get the trade status for',
		displayOptions: {
			show: {
				resource: [
					'trade',
				],
				operation: [
					'getTradeStatus',
				],
			},
		},
	},
];
