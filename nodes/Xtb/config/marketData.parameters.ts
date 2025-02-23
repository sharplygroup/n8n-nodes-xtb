import { INodeProperties } from 'n8n-workflow';

export const marketDataParameters: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'marketData',
				],
			},
		},
		options: [
			{
				name: 'Get Calendar',
				value: 'getCalendar',
				description: 'Get the calendar',
				action: 'Get calendar',
			},
			{
				name: 'Get Chart Last Request',
				value: 'getChartLastRequest',
				description: 'Get the chart last request',
				action: 'Get chart last request',
			},
			{
				name: 'Get Chart Range Request',
				value: 'getChartRangeRequest',
				description: 'Get the chart range request',
				action: 'Get chart range request',
			},
			{
				name: 'Get Tick Prices',
				value: 'getTickPrices',
				description: 'Get the tick prices',
				action: 'Get tick prices',
			},
			{
				name: 'Get Trading Hours',
				value: 'getTradingHours',
				description: 'Get the trading hours',
				action: 'Get trading hours',
			},
		],
		default: 'getCalendar',
	},
	{
		displayName: 'Info',
		name: 'info',
		type: 'string',
		required: true,
		default: '',
		description: 'The info to get the chart for',
		displayOptions: {
			show: {
				resource: [
					'marketData',
				],
				operation: [
					'getChartLastRequest',
					'getChartRangeRequest',
				],
			},
		},
	},
	{
		displayName: 'Level',
		name: 'level',
		type: 'number',
		required: true,
		default: 0,
		description: 'The level to get the tick prices for',
		displayOptions: {
			show: {
				resource: [
					'marketData',
				],
				operation: [
					'getTickPrices',
				],
			},
		},
	},
	{
		displayName: 'Symbols',
		name: 'symbols',
		type: 'string',
		required: true,
		default: '',
		description: 'The symbols to get the tick prices for',
		displayOptions: {
			show: {
				resource: [
					'marketData',
				],
				operation: [
					'getTickPrices',
					'getTradingHours',
				],
			},
		},
	},
	{
		displayName: 'Timestamp',
		name: 'timestamp',
		type: 'number',
		required: true,
		default: 0,
		description: 'The timestamp to get the tick prices for',
		displayOptions: {
			show: {
				resource: [
					'marketData',
				],
				operation: [
					'getTickPrices',
				],
			},
		},
	},
];
