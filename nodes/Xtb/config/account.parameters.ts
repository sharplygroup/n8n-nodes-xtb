import { INodeProperties } from 'n8n-workflow';

export const accountParameters: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
		options: [
			{
				name: 'Calculate Profit',
				value: 'calculateProfit',
				description: 'Calculate estimated profit',
				action: 'Calculate estimated profit',
			},
			{
				name: 'Get Account Data',
				value: 'getAccountData',
				description: 'Get account information',
				action: 'Get account information',
			},
			{
				name: 'Get Commission',
				value: 'getCommission',
				description: 'Get commission calculation',
				action: 'Get commission calculation',
			},
			{
				name: 'Get Margin Level',
				value: 'getMarginLevel',
				description: 'Get account indicators',
				action: 'Get account indicators',
			},
			{
				name: 'Get Margin Trade',
				value: 'getMarginTrade',
				description: 'Get margin requirements',
				action: 'Get margin requirements',
			},
		],
		default: 'getAccountData',
	},
	{
		displayName: 'Symbol',
		name: 'symbol',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getMarginTrade', 'getCommission', 'calculateProfit'],
			},
		},
		default: '',
		description: 'The symbol to calculate for',
	},
	{
		displayName: 'Volume',
		name: 'volume',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['getMarginTrade', 'getCommission', 'calculateProfit'],
			},
		},
		default: 0.1,
		description: 'Trade volume in lots',
	},
	// Parameters for profit calculation
	{
		displayName: 'Open Price',
		name: 'openPrice',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['calculateProfit'],
			},
		},
		default: 0,
		description: 'Opening price for profit calculation',
	},
	{
		displayName: 'Close Price',
		name: 'closePrice',
		type: 'number',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['calculateProfit'],
			},
		},
		default: 0,
		description: 'Closing price for profit calculation',
	},
	{
		displayName: 'Operation Type',
		name: 'cmd',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['calculateProfit'],
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
		],
		default: 0,
		description: 'Type of operation for profit calculation',
	},
];
