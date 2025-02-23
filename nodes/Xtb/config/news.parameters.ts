import { INodeProperties } from 'n8n-workflow';

export const newsParameters: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'news',
				],
			},
		},
		options: [
			{
				name: 'Get News',
				value: 'getNews',
				description: 'Get the news',
				action: 'Get news',
			},
		],
		default: 'getNews',
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
					'news',
				],
				operation: [
					'getNews',
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
					'news',
				],
				operation: [
					'getNews',
				],
			},
		},
	},
];
