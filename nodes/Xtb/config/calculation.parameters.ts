import { INodeProperties } from 'n8n-workflow';

export const calculationParameters: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'calculation',
				],
			},
		},
		options: [
			{
				name: 'Get Commission Definition',
				value: 'getCommissionDef',
				description: 'Get the commission definition for a symbol and volume',
				action: 'Get commission definition',
			},
			{
				name: 'Get Margin Trade',
				value: 'getMarginTrade',
				description: 'Get the margin trade for a symbol and volume',
				action: 'Get margin trade',
			},
			{
				name: 'Get Profit Calculation',
				value: 'getProfitCalculation',
				description: 'Get the profit calculation for a trade',
				action: 'Get profit calculation',
			},
		],
		default: 'getCommissionDef',
	},
	{
		displayName: 'Symbol',
		name: 'symbol',
		type: 'string',
		required: true,
		default: '',
		description: 'The symbol to get the commission definition for',
		displayOptions: {
			show: {
				resource: [
					'calculation',
				],
				operation: [
					'getCommissionDef',
					'getMarginTrade',
					'getProfitCalculation',
				],
			},
		},
	},
	{
		displayName: 'Volume',
		name: 'volume',
		type: 'number',
		required: true,
		default: 1,
		description: 'The volume to get the commission definition for',
		displayOptions: {
			show: {
				resource: [
					'calculation',
				],
				operation: [
					'getCommissionDef',
					'getMarginTrade',
					'getProfitCalculation',
				],
			},
		},
	},
	{
		displayName: 'Close Price',
		name: 'closePrice',
		type: 'number',
		required: true,
		default: 0,
		description: 'The close price of the trade',
		displayOptions: {
			show: {
				resource: [
					'calculation',
				],
				operation: [
					'getProfitCalculation',
				],
			},
		},
	},
	{
		displayName: 'Command',
		name: 'cmd',
		type: 'number',
		required: true,
		default: 0,
		description: 'The command of the trade',
		displayOptions: {
			show: {
				resource: [
					'calculation',
				],
				operation: [
					'getProfitCalculation',
				],
			},
		},
	},
	{
		displayName: 'Open Price',
		name: 'openPrice',
		type: 'number',
		required: true,
		default: 0,
		description: 'The open price of the trade',
		displayOptions: {
			show: {
				resource: [
					'calculation',
				],
				operation: [
					'getProfitCalculation',
				],
			},
		},
	},
];
