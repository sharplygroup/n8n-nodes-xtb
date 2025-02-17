import { INodeProperties } from 'n8n-workflow';

export const marketDataParameters: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['marketData'],
			},
		},
		options: [
			{
				name: 'Get All Symbols',
				value: 'getAllSymbols',
				description: 'Get all available symbols',
				action: 'Get all available symbols',
			},
			{
				name: 'Get Chart Data',
				value: 'getChartData',
				description: 'Get chart data for a symbol',
				action: 'Get chart data for a symbol',
			},
			{
				name: 'Get Symbol',
				value: 'getSymbol',
				description: 'Get single symbol details',
				action: 'Get single symbol details',
			},
			{
				name: 'Get Tick Prices',
				value: 'getTickPrices',
				description: 'Get current prices for symbols',
				action: 'Get current prices for symbols',
			},
			{
				name: 'Get Trading Hours',
				value: 'getTradingHours',
				description: 'Get trading hours for symbols',
				action: 'Get trading hours for symbols',
			},
		],
		default: 'getAllSymbols',
	},
	{
		displayName: 'Symbol',
		name: 'symbol',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['marketData'],
				operation: ['getSymbol', 'getChartData', 'getTickPrices', 'getTradingHours'],
			},
		},
		default: '',
		description: 'The symbol to get data for',
	},
	{
		displayName: 'Period',
		name: 'period',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['marketData'],
				operation: ['getChartData'],
			},
		},
		options: [
			{ name: '1 Minute', value: 1 },
			{ name: '5 Minutes', value: 5 },
			{ name: '15 Minutes', value: 15 },
			{ name: '30 Minutes', value: 30 },
			{ name: '1 Hour', value: 60 },
			{ name: '4 Hours', value: 240 },
			{ name: '1 Day', value: 1440 },
			{ name: '1 Week', value: 10080 },
			{ name: '1 Month', value: 43200 },
		],
		default: 1,
		description: 'Chart period',
	},
	{
		displayName: 'Start Time',
		name: 'start',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['marketData'],
				operation: ['getChartData'],
			},
		},
		default: '',
		description: 'Start time for chart data',
	},
];
