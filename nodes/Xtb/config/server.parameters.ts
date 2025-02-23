import { INodeProperties } from 'n8n-workflow';

export const serverParameters: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'server',
				],
			},
		},
		options: [
			{
				name: 'Get Server Time',
				value: 'getServerTime',
				description: 'Get the server time',
				action: 'Get server time',
			},
			{
				name: 'Get Version',
				value: 'getVersion',
				description: 'Get the version',
				action: 'Get version',
			},
			{
				name: 'Ping',
				value: 'ping',
				description: 'Ping the server',
				action: 'Ping server',
			},
		],
		default: 'getServerTime',
	},
];
