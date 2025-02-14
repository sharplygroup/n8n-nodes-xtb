import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	NodeConnectionType,
} from 'n8n-workflow';
import { WebSocketManager, IXtbCredentials, IWebSocketResponse } from './utils/WebSocketManager';

interface ITradeTransactionResponse extends IWebSocketResponse {
	returnData?: IDataObject & {
		order: number;
	};
}

interface ITradeStatusResponse extends IWebSocketResponse {
	returnData?: IDataObject;
}

interface ITradesResponse extends IWebSocketResponse {
	returnData?: IDataObject[];
}

export class Xtb implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'XTB',
		name: 'xtb',
		icon: 'file:xtb.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with XTB Trading API',
		defaults: {
			name: 'XTB',
		},
		inputs: [{
			type: NodeConnectionType.Main,
		}],
		outputs: [{
			type: NodeConnectionType.Main,
		}],
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
				],
				default: 'trading',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'trading',
						],
					},
				},
				options: [
					{
						name: 'Open Trade',
						value: 'openTrade',
						description: 'Open a new trade',
						action: 'Open a new trade',
					},
					{
						name: 'Close Trade',
						value: 'closeTrade',
						description: 'Close an existing trade',
						action: 'Close an existing trade',
					},
					{
						name: 'Get Trades',
						value: 'getTrades',
						description: 'Get list of trades',
						action: 'Get list of trades',
					},
				],
				default: 'getTrades',
			},
			// Parameters for opening trades
			{
				displayName: 'Symbol',
				name: 'symbol',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['trading'],
						operation: ['openTrade'],
					},
				},
				default: '',
				description: 'The symbol to trade (e.g., EURUSD)',
			},
			{
				displayName: 'Trade Type',
				name: 'cmd',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['trading'],
						operation: ['openTrade'],
					},
				},
				options: [
					{
						name: 'Buy',
						value: 0,
					},
					{
						name: 'Sell',
						value: 1,
					},
					{
						name: 'Buy Limit',
						value: 2,
					},
					{
						name: 'Sell Limit',
						value: 3,
					},
					{
						name: 'Buy Stop',
						value: 4,
					},
					{
						name: 'Sell Stop',
						value: 5,
					},
				],
				default: 0,
				description: 'Type of trade to open',
			},
			{
				displayName: 'Volume',
				name: 'volume',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['trading'],
						operation: ['openTrade'],
					},
				},
				default: 0.1,
				description: 'Trade volume in lots',
			},
			{
				displayName: 'Price',
				name: 'price',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['trading'],
						operation: ['openTrade'],
					},
				},
				default: 0,
				description: 'Trade price (required for limit and stop orders)',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['trading'],
						operation: ['openTrade'],
					},
				},
				options: [
					{
						displayName: 'Stop Loss',
						name: 'sl',
						type: 'number',
						default: 0,
						description: 'Stop loss price',
					},
					{
						displayName: 'Take Profit',
						name: 'tp',
						type: 'number',
						default: 0,
						description: 'Take profit price',
					},
					{
						displayName: 'Comment',
						name: 'customComment',
						type: 'string',
						default: '',
						description: 'Custom comment for the trade',
					},
					{
						displayName: 'Expiration',
						name: 'expiration',
						type: 'dateTime',
						default: '',
						description: 'Expiration time for pending orders',
					},
				],
			},
			// Parameters for closing trades
			{
				displayName: 'Order Number',
				name: 'order',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['trading'],
						operation: ['closeTrade'],
					},
				},
				default: 0,
				description: 'The order number to close',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: IDataObject[] = [];
		const resource = this.getNodeParameter('resource', 0) as string;
		const operation = this.getNodeParameter('operation', 0) as string;
		
		// Get credentials
		const credentials = await this.getCredentials('xtbApi') as IXtbCredentials;
		
		// Initialize WebSocket manager
		const wsManager = new WebSocketManager(credentials);
		
		try {
			// Connect to XTB API
			await wsManager.connect();

			// Execute operations based on resource and operation type
			for (let i = 0; i < items.length; i++) {
				try {
					let response: IDataObject = {};

					switch (resource) {
						case 'trading': {
							switch (operation) {
								case 'openTrade': {
									const symbol = this.getNodeParameter('symbol', i) as string;
									const cmd = this.getNodeParameter('cmd', i) as number;
									const volume = this.getNodeParameter('volume', i) as number;
									const price = this.getNodeParameter('price', i) as number;
									const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;

									const tradeInfo = {
										cmd,
										symbol,
										volume,
										price,
										type: 0, // Open
										...additionalFields,
									};

									const tradeResponse = await wsManager.sendCommand({
										command: 'tradeTransaction',
										arguments: {
											tradeTransInfo: tradeInfo,
										},
									}) as ITradeTransactionResponse;

									if (!tradeResponse.status || !tradeResponse.returnData) {
										throw new Error(tradeResponse.errorDescr || 'Failed to open trade');
									}

									// Get trade status
									const statusResponse = await wsManager.sendCommand({
										command: 'tradeTransactionStatus',
										arguments: {
											order: tradeResponse.returnData.order,
										},
									}) as ITradeStatusResponse;

									if (!statusResponse.status || !statusResponse.returnData) {
										throw new Error(statusResponse.errorDescr || 'Failed to get trade status');
									}

									response = statusResponse.returnData;
									break;
								}

								case 'closeTrade': {
									const order = this.getNodeParameter('order', i) as number;

									const tradeInfo = {
										cmd: 0, // The original command will be determined by the server
										order,
										type: 2, // Close
									};

									const tradeResponse = await wsManager.sendCommand({
										command: 'tradeTransaction',
										arguments: {
											tradeTransInfo: tradeInfo,
										},
									}) as ITradeTransactionResponse;

									if (!tradeResponse.status || !tradeResponse.returnData) {
										throw new Error(tradeResponse.errorDescr || 'Failed to close trade');
									}

									// Get trade status
									const statusResponse = await wsManager.sendCommand({
										command: 'tradeTransactionStatus',
										arguments: {
											order: tradeResponse.returnData.order,
										},
									}) as ITradeStatusResponse;

									if (!statusResponse.status || !statusResponse.returnData) {
										throw new Error(statusResponse.errorDescr || 'Failed to get trade status');
									}

									response = statusResponse.returnData;
									break;
								}

								case 'getTrades': {
									const tradesResponse = await wsManager.sendCommand({
										command: 'getTrades',
										arguments: {
											openedOnly: true,
										},
									}) as ITradesResponse;

									if (!tradesResponse.status || !tradesResponse.returnData) {
										throw new Error(tradesResponse.errorDescr || 'Failed to get trades');
									}

									response = { trades: tradesResponse.returnData };
									break;
								}

								default:
									throw new Error(`Unknown trading operation: ${operation}`);
							}
							break;
						}

						case 'marketData':
							throw new Error('Market data operations not implemented yet');

						case 'account':
							throw new Error('Account operations not implemented yet');

						default:
							throw new Error(`Unknown resource: ${resource}`);
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