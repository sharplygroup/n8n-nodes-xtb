import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { WebSocketManager, IXtbCredentials } from '@sharplygroup/xtb-api-js';
import { AccountOperations, AdditionalOperations } from '@sharplygroup/xtb-api-js';
import { AccountResource } from './resources/AccountResource';
import { AdditionalResource } from './resources/AdditionalResource';
import { accountParameters } from 'config/account.parameters';
import { INodeProperties } from 'n8n-workflow';

export class Xtb implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'XTB',
		name: 'xtb',
		icon: 'file:xtb.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with XTB Trading API. Supports Account resources.',
		defaults: {
			name: 'XTB',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'xtbApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Additional',
						value: 'additional',
					},
				],
				default: 'account',
			},
			...accountParameters,
		] as INodeProperties[],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;

		// Get credentials
		const credentials = (await this.getCredentials('xtbApi')) as unknown as IXtbCredentials;

		// Initialize WebSocket manager
		const wsManager = new WebSocketManager(credentials);

		const accountOperations = new AccountOperations(wsManager);
		const additionalOperations = new AdditionalOperations(wsManager);

		const accountResource = new AccountResource(accountOperations, this);
		const additionalResource = new AdditionalResource(additionalOperations, this);

		try {
			// Connect to XTB API
			await wsManager.connect();

			// Execute operations based on resource and operation type
			for (let i = 0; i < items.length; i++) {
				try {
					let response: IDataObject = {};

					if (resource === 'account') {
						response = await accountResource.execute(items, i, operation);
					} else if (resource === 'additional') {
						response = await additionalResource.execute(items, i, operation);
					}
					 else {
						throw new NodeOperationError(this.getNode(), `Unknown resource: ${resource}`);
					}

					returnData.push(response);
				} catch (error) {
					if (this.continueOnFail()) {
						returnData.push({ error: error.message });
						continue;
					}
					throw error;
				}
			}
		} catch (error) {
			throw new NodeOperationError(this.getNode(), error);
		} finally {
			// Always disconnect when done
			await wsManager.disconnect();
		}

		return [this.helpers.returnJsonArray(returnData)];
	}
}
