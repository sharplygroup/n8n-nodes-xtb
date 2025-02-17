import { INodeProperties } from 'n8n-workflow';

export const additionalParameters: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'additional',
				],
			},
		},
		options: [
			{
				name: 'Get Balance',
				value: 'getBalance',
				description: 'Get balance',
			},
			{
				name: 'Get Calendar',
				value: 'getCalendar',
				description: 'Get calendar',
			},
			{
				name: 'Get Candles',
				value: 'getCandles',
				description: 'Get candles',
			},
			{
				name: 'Get IBS History',
				value: 'getIbsHistory',
				description: 'Get IBS history',
			},
			{
				name: 'Get Keep Alive',
				value: 'getKeepAlive',
				description: 'Get keep alive',
			},
			{
				name: 'Get News',
				value: 'getNews',
				description: 'Get news',
			},
			{
				name: 'Get Profits',
				value: 'getProfits',
				description: 'Get profits',
			},
			{
				name: 'Get Server Time',
				value: 'getServerTime',
				description: 'Get server time',
			},
			{
				name: 'Get Step Rules',
				value: 'getStepRules',
				description: 'Get step rules',
			},
			{
				name: 'Get Trade Records',
				value: 'getTradeRecords',
				description: 'Get trade records',
			},
			{
				name: 'Get Trade Status',
				value: 'getTradeStatus',
				description: 'Get trade status',
			},
			{
				name: 'Get Trades History',
				value: 'getTradesHistory',
				description: 'Get trades history',
			},
			{
				name: 'Get Version',
				value: 'getVersion',
				description: 'Get version',
			},
			{
				name: 'Ping',
				value: 'ping',
				description: 'Ping',
			},
			{
				name: 'Trade Transaction Status',
				value: 'tradeTransactionStatus',
				description: 'Get trade transaction status',
			},
		],
		default: 'getBalance',
	},
	{
		displayName: 'Start',
		name: 'start',
		type: 'number',
		default: 0,
		description: 'Start time',
		displayOptions: {
			show: {
				resource: [
					'additional',
				],
				operation: [
					'getIbsHistory',
					'getTradesHistory',
				],
			},
		},
	},
	{
		displayName: 'End',
		name: 'end',
		type: 'number',
		default: 0,
		description: 'End time',
		displayOptions: {
			show: {
				resource: [
					'additional',
				],
				operation: [
					'getIbsHistory',
					'getTradesHistory',
				],
			},
		},
	},
	{
		displayName: 'Orders',
		name: 'orders',
		type: 'number',
		typeOptions: {
			multipleValues: true,
		},
		default: 0,
		description: 'Orders',
		displayOptions: {
			show: {
				resource: [
					'additional',
				],
				operation: [
					'getTradeRecords',
				],
			},
		},
	},
	{
		displayName: 'Order',
		name: 'order',
		type: 'number',
		default: 0,
		description: 'Order',
		displayOptions: {
			show: {
				resource: [
					'additional',
				],
				operation: [
					'tradeTransactionStatus',
				],
			},
		},
	},
	{
		displayName: 'Symbol',
		name: 'symbol',
		type: 'string',
		default: '',
		description: 'Symbol',
		displayOptions: {
			show: {
				resource: [
					'additional',
				],
				operation: [
					'getCandles',
				],
			},
		},
	},
];