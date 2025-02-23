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
				name: 'Get Account Data',
				value: 'getCurrentUserData',
				description: 'Get account information',
				action: 'Get account information',
			},
			{
				name: 'Get Margin Level',
				value: 'getMarginLevel',
				description: 'Get account indicators',
				action: 'Get account indicators',
			}
		],
		default: 'getCurrentUserData',
	}
];
