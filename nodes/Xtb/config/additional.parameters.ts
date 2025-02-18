import { INodeProperties } from 'n8n-workflow';

export const additionalParameters: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['additional'],
			},
		},
		options: [
			{
				name: 'Get Balance',
				value: 'getBalance',
				action: 'Get balance an additional',
			},
			{
				name: 'Get Calendar',
				value: 'getCalendar',
				action: 'Get calendar an additional',
			},
			{
				name: 'Get Candles',
				value: 'getCandles',
				action: 'Get candles an additional',
			},
			{
				name: 'Get IBS History',
				value: 'getIbsHistory',
				action: 'Get ibs history an additional',
			},
			{
				name: 'Get Keep Alive',
				value: 'getKeepAlive',
				action: 'Get keep alive an additional',
			},
			{
				name: 'Get News',
				value: 'getNews',
				action: 'Get news an additional',
			},
			{
				name: 'Get Profits',
				value: 'getProfits',
				action: 'Get profits an additional',
			},
			{
				name: 'Get Server Time',
				value: 'getServerTime',
				action: 'Get server time an additional',
			},
			{
				name: 'Get Step Rules',
				value: 'getStepRules',
				action: 'Get step rules an additional',
			},
			{
				name: 'Get Trade Records',
				value: 'getTradeRecords',
				action: 'Get trade records an additional',
			},
			{
				name: 'Get Trade Status',
				value: 'getTradeStatus',
				action: 'Get trade status an additional',
			},
			{
				name: 'Get Trades History',
				value: 'getTradesHistory',
				action: 'Get trades history an additional',
			},
			{
				name: 'Get Version',
				value: 'getVersion',
				action: 'Get version an additional',
			},
			{
				name: 'Ping',
				value: 'ping',
				action: 'Ping an additional',
			},
			{
				name: 'Trade Transaction Status',
				value: 'tradeTransactionStatus',
				description: 'Get trade transaction status',
				action: 'Trade transaction status an additional',
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
				resource: ['additional'],
				operation: ['getIbsHistory', 'getTradesHistory'],
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
				resource: ['additional'],
				operation: ['getIbsHistory', 'getTradesHistory'],
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
		displayOptions: {
			show: {
				resource: ['additional'],
				operation: ['getTradeRecords'],
			},
		},
	},
	{
		displayName: 'Order',
		name: 'order',
		type: 'number',
		default: 0,
		displayOptions: {
			show: {
				resource: ['additional'],
				operation: ['tradeTransactionStatus'],
			},
		},
	},
	{
		displayName: 'Symbol',
		name: 'symbol',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['additional'],
				operation: ['getCandles'],
			},
		},
	},
];
