import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { WebSocketManager, IXtbCredentials, CalculationOperations, DmaOperations, MarketDataOperations, NewsOperations, ServerOperations, SymbolOperations, TradeOperations, TradingOperations } from '@sharplygroup/xtb-api-js';
import { AccountOperations } from '@sharplygroup/xtb-api-js';
import { AccountResource } from './resources/AccountResource';
import { CalculationResource } from './resources/CalculationResource';
import { DmaResource } from './resources/DmaResource';
import { MarketDataResource } from './resources/MarketDataResource';
import { NewsResource } from './resources/NewsResource';
import { ServerResource } from './resources/ServerResource';
import { SymbolResource } from './resources/SymbolResource';
import { TradeResource } from './resources/TradeResource';
import { TradingResource } from './resources/TradingResource';
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
						name: 'Calculation',
						value: 'calculation',
					},
					{
						name: 'Dma',
						value: 'dma',
					},
					{
						name: 'MarketData',
						value: 'marketData',
					},
					{
						name: 'News',
						value: 'news',
					},
					{
						name: 'Server',
						value: 'server',
					},
					{
						name: 'Symbol',
						value: 'symbol',
					},
					{
						name: 'Trade',
						value: 'trade',
					},
					{
						name: 'Trading',
						value: 'trading',
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
		const calculationOperations = new CalculationOperations(wsManager);
		const dmaOperations = new DmaOperations(wsManager);
		const marketDataOperations = new MarketDataOperations(wsManager);
		const newsOperations = new NewsOperations(wsManager);
		const serverOperations = new ServerOperations(wsManager);
		const symbolOperations = new SymbolOperations(wsManager);
		const tradeOperations = new TradeOperations(wsManager);
		const tradingOperations = new TradingOperations(wsManager);

		const accountResource = new AccountResource(accountOperations, this);
		const calculationResource = new CalculationResource(calculationOperations, this);
		const dmaResource = new DmaResource(dmaOperations, this);
		const marketDataResource = new MarketDataResource(marketDataOperations, this);
		const newsResource = new NewsResource(newsOperations, this);
		const serverResource = new ServerResource(serverOperations, this);
		const symbolResource = new SymbolResource(symbolOperations, this);
		const tradeResource = new TradeResource(tradeOperations, this);
		const tradingResource = new TradingResource(tradingOperations, this);

		try {
			// Connect to XTB API
			await wsManager.connect();

			// Execute operations based on resource and operation type
			for (let i = 0; i < items.length; i++) {
				try {
					let response: IDataObject = {};

					if (resource === 'account') {
						response = await accountResource.execute(items, i, operation);
					} else if (resource === 'calculation') {
						response = await calculationResource.execute(items, i, operation);
					} else if (resource === 'dma') {
						response = await dmaResource.execute(items, i, operation);
					} else if (resource === 'marketData') {
						response = await marketDataResource.execute(items, i, operation);
					} else if (resource === 'news') {
						response = await newsResource.execute(items, i, operation);
					} else if (resource === 'server') {
						response = await serverResource.execute(items, i, operation);
					} else if (resource === 'symbol') {
						response = await symbolResource.execute(items, i, operation);
					} else if (resource === 'trade') {
						response = await tradeResource.execute(items, i, operation);
					} else if (resource === 'trading') {
						response = await tradingResource.execute(items, i, operation);
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
