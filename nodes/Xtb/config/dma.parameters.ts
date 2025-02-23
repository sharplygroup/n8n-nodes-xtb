import { INodeProperties } from 'n8n-workflow';

export const dmaParameters: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: [
					'dma',
				],
			},
		},
		options: [
			{
				name: 'Get Step Rules',
				value: 'getStepRules',
				description: 'Get the step rules',
				action: 'Get step rules',
			},
		],
		default: 'getStepRules',
	},
];
