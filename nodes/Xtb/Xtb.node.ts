import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { WebSocketManager, IXtbCredentials } from 'utils/WebSocketManager';
import { TradingOperations } from 'lib/TradingOperations';
import { MarketDataOperations } from 'lib/MarketDataOperations';
import { AccountOperations } from 'lib/AccountOperations';
import { TradingResource } from 'lib/TradingResource';
import { MarketDataResource } from 'lib/MarketDataResource';
import { AccountResource } from 'lib/AccountResource';
import { AdditionalOperations } from 'lib/AdditionalOperations';
import { AdditionalResource } from 'lib/AdditionalResource';
import { tradingParameters } from 'config/trading.parameters';
import { marketDataParameters } from 'config/marketData.parameters';
import { accountParameters } from 'config/account.parameters';
import { additionalParameters } from 'config/additional.parameters';
import { INodeProperties } from 'n8n-workflow';

export class Xtb implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'XTB',
		name: 'xtb',
		icon: 'file:xtb.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with XTB Trading API. Supports Trading, Market Data, Account and Additional resources.',
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
						name: 'Trading',
						value: 'trading',
					},
					{
						name: 'Market Data',
						value: 'marketData',
					},
					{
						name: 'Account',
						value: 'account',
					},
					{
						name: 'Additional',
						value: 'additional',
					},
				],
				default: 'trading',
			},
			...tradingParameters,
			...marketDataParameters,
			...accountParameters,
			...additionalParameters,
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

		const tradingOperations = new TradingOperations(wsManager, this);
		const marketDataOperations = new MarketDataOperations(wsManager, this);
		const accountOperations = new AccountOperations(wsManager, this);
		const additionalOperations = new AdditionalOperations(wsManager);

		const tradingResource = new TradingResource(tradingOperations, this);
		const marketDataResource = new MarketDataResource(marketDataOperations, this);
		const accountResource = new AccountResource(accountOperations, this);
		const additionalResource = new AdditionalResource(additionalOperations, this);
		try {
			// Connect to XTB API
			await wsManager.connect();

			// Execute operations based on resource and operation type
			for (let i = 0; i < items.length; i++) {
				try {
					let response: IDataObject = {};

					if (resource === 'trading') {
						response = await tradingResource.execute(items, i, operation);
					} else if (resource === 'marketData') {
						response = await marketDataResource.execute(items, i, operation);
					} else if (resource === 'account') {
						response = await accountResource.execute(items, i, operation);
					} else if (resource === 'additional') {
						response = await additionalResource.execute(items, i, operation);
					} else {
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
