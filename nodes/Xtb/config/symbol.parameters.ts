import { INodeProperties } from 'n8n-workflow';

export const symbolParameters: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'symbol',
				],
			},
		},
		options: [
			{
				name: 'Get All Symbols',
				value: 'getAllSymbols',
				action: 'Get all symbols',
			},
			{
				name: 'Get Symbol',
				value: 'getSymbol',
				description: 'Get a symbol',
				action: 'Get symbol',
			},
		],
		default: 'getAllSymbols',
	},
	{
		displayName: 'Symbol',
		name: 'symbol',
		type: 'string',
		required: true,
		default: '',
		description: 'The symbol to get',
		displayOptions: {
			show: {
				resource: [
					'symbol',
				],
				operation: [
					'getSymbol',
				],
			},
		},
	},
];
