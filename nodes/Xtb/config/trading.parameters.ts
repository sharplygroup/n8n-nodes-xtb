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
				name: 'Open Trade',
				value: 'openTrade',
				description: 'Open a new trade',
				action: 'Open a new trade',
			},
			{
				name: 'Close Trade',
				value: 'closeTrade',
				description: 'Close an existing trade',
				action: 'Close an existing trade',
			},
			{
				name: 'Get Trades',
				value: 'getTrades',
				description: 'Get list of trades',
				action: 'Get list of trades',
			},
		],
		default: 'getTrades',
	},
	// Parameters for opening trades
	{
		displayName: 'Symbol',
		name: 'symbol',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'trading',
				],
				operation: [
					'openTrade',
				],
			},
		},
		default: '',
		description: 'The symbol to trade (e.g., EURUSD)',
	},
	{
		displayName: 'Trade Type',
		name: 'cmd',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'trading',
				],
				operation: [
					'openTrade',
				],
			},
		},
		options: [
			{
				name: 'Buy',
				value: 0,
			},
			{
				name: 'Sell',
				value: 1,
			},
			{
				name: 'Buy Limit',
				value: 2,
			},
			{
				name: 'Sell Limit',
				value: 3,
			},
			{
				name: 'Buy Stop',
				value: 4,
			},
			{
				name: 'Sell Stop',
				value: 5,
			},
		],
		default: 0,
		description: 'Type of trade to open',
	},
	{
		displayName: 'Volume',
		name: 'volume',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'trading',
				],
				operation: [
					'openTrade',
				],
			},
		},
		default: 0.1,
		description: 'Trade volume in lots',
	},
	{
		displayName: 'Price',
		name: 'price',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'trading',
				],
				operation: [
					'openTrade',
				],
			},
		},
		default: 0,
		description: 'Trade price (required for limit and stop orders)',
	},
	// Additional fields for trading
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: [
					'trading',
				],
				operation: [
					'openTrade',
				],
			},
		},
		options: [
			{
				displayName: 'Stop Loss',
				name: 'sl',
				type: 'number',
				default: 0,
				description: 'Stop loss price',
			},
			{
				displayName: 'Take Profit',
				name: 'tp',
				type: 'number',
				default: 0,
				description: 'Take profit price',
			},
			{
				displayName: 'Comment',
				name: 'customComment',
				type: 'string',
				default: '',
				description: 'Custom comment for the trade',
			},
			{
				displayName: 'Expiration',
				name: 'expiration',
				type: 'dateTime',
				default: '',
				description: 'Expiration time for pending orders',
			},
		],
	},
	// Parameters for closing trades
	{
		displayName: 'Order Number',
		name: 'order',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: [
					'trading',
				],
				operation: [
					'closeTrade',
				],
			},
		},
		default: 0,
		description: 'The order number to close',
	},
];