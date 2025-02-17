import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
} from 'n8n-workflow';
import { WebSocketManager, IXtbCredentials } from './utils/WebSocketManager';
import { ITradeTransactionResponse } from './interfaces/ITradeTransactionResponse';
import { ITradeStatusResponse } from './interfaces/ITradeStatusResponse';
import { ITradesResponse } from './interfaces/ITradesResponse';
import { ISymbolResponse } from './interfaces/ISymbolResponse';
import { ISymbolsResponse } from './interfaces/ISymbolsResponse';
import { IChartResponse } from './interfaces/IChartResponse';
import { ITickPricesResponse } from './interfaces/ITickPricesResponse';
import { ITradingHoursResponse } from './interfaces/ITradingHoursResponse';
import { IMarginTradeResponse } from './interfaces/IMarginTradeResponse';
import { ICommissionResponse } from './interfaces/ICommissionResponse';
import { IProfitCalculationResponse } from './interfaces/IProfitCalculationResponse';
import { IAccountDataResponse } from './interfaces/IAccountDataResponse';
import { IMarginLevelResponse } from './interfaces/IMarginLevelResponse';

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
				],
				default: 'trading',
			},
			// Trading Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['trading'],
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
			// Market Data Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['marketData'],
					},
				},
				options: [
					{
								name: 'Get All Symbols',
								value: 'getAllSymbols',
								description: 'Get all available symbols',
								action: 'Get all available symbols',
							},
							{
								name: 'Get Chart Data',
								value: 'getChartData',
								description: 'Get chart data for a symbol',
								action: 'Get chart data for a symbol',
							},
							{
								name: 'Get Symbol',
								value: 'getSymbol',
								description: 'Get single symbol details',
								action: 'Get single symbol details',
							},
							{
								name: 'Get Tick Prices',
								value: 'getTickPrices',
								description: 'Get current prices for symbols',
								action: 'Get current prices for symbols',
							},
							{
								name: 'Get Trading Hours',
								value: 'getTradingHours',
								description: 'Get trading hours for symbols',
								action: 'Get trading hours for symbols',
							},
				],
				default: 'getAllSymbols',
			},
			// Account Operations
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
						name: 'Calculate Profit',
						value: 'calculateProfit',
						description: 'Calculate estimated profit',
						action: 'Calculate estimated profit',
					},
					{
						name: 'Get Account Data',
						value: 'getAccountData',
						description: 'Get account information',
						action: 'Get account information',
					},
					{
						name: 'Get Commission',
						value: 'getCommission',
						description: 'Get commission calculation',
						action: 'Get commission calculation',
					},
					{
						name: 'Get Margin Level',
						value: 'getMarginLevel',
						description: 'Get account indicators',
						action: 'Get account indicators',
					},
					{
						name: 'Get Margin Trade',
						value: 'getMarginTrade',
						description: 'Get margin requirements',
						action: 'Get margin requirements',
					},
				],
				default: 'getAccountData',
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
			// Parameters for market data operations
			{
				displayName: 'Symbol',
				name: 'symbol',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['marketData'],
						operation: ['getSymbol', 'getChartData', 'getTickPrices', 'getTradingHours'],
					},
				},
				default: '',
				description: 'The symbol to get data for',
			},
			{
				displayName: 'Period',
				name: 'period',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['marketData'],
						operation: ['getChartData'],
					},
				},
				options: [
					{ name: '1 Minute', value: 1 },
					{ name: '5 Minutes', value: 5 },
					{ name: '15 Minutes', value: 15 },
					{ name: '30 Minutes', value: 30 },
					{ name: '1 Hour', value: 60 },
					{ name: '4 Hours', value: 240 },
					{ name: '1 Day', value: 1440 },
					{ name: '1 Week', value: 10080 },
					{ name: '1 Month', value: 43200 },
				],
				default: 1,
				description: 'Chart period',
			},
			{
				displayName: 'Start Time',
				name: 'start',
				type: 'dateTime',
				required: true,
				displayOptions: {
					show: {
						resource: ['marketData'],
						operation: ['getChartData'],
					},
				},
				default: '',
				description: 'Start time for chart data',
			},
			// Parameters for account operations
			{
				displayName: 'Symbol',
				name: 'symbol',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['getMarginTrade', 'getCommission', 'calculateProfit'],
					},
				},
				default: '',
				description: 'The symbol to calculate for',
			},
			{
				displayName: 'Volume',
				name: 'volume',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['getMarginTrade', 'getCommission', 'calculateProfit'],
					},
				},
				default: 0.1,
				description: 'Trade volume in lots',
			},
			// Additional fields for trading
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
			// Parameters for profit calculation
			{
				displayName: 'Open Price',
				name: 'openPrice',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['calculateProfit'],
					},
				},
				default: 0,
				description: 'Opening price for profit calculation',
			},
			{
				displayName: 'Close Price',
				name: 'closePrice',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['calculateProfit'],
					},
				},
				default: 0,
				description: 'Closing price for profit calculation',
			},
			{
				displayName: 'Operation Type',
				name: 'cmd',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['account'],
						operation: ['calculateProfit'],
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
				],
				default: 0,
				description: 'Type of operation for profit calculation',
			},
		],
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

		// Define local functions for trading operations
		const handleTradeTransaction = async (tradeInfo: IDataObject): Promise<IDataObject> => {
			const tradeResponse = (await wsManager.sendCommand({
				command: 'tradeTransaction',
				arguments: {
					tradeTransInfo: tradeInfo,
				},
			})) as ITradeTransactionResponse;

			if (!tradeResponse.status || !tradeResponse.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					tradeResponse.errorDescr || 'Failed to process trade transaction',
				);
			}

			// Get trade status
			const statusResponse = (await wsManager.sendCommand({
				command: 'tradeTransactionStatus',
				arguments: {
					order: tradeResponse.returnData.order,
				},
			})) as ITradeStatusResponse;

			if (!statusResponse.status || !statusResponse.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					statusResponse.errorDescr || 'Failed to get trade status',
				);
			}

			return statusResponse.returnData;
		};

		const openTrade = async (i: number): Promise<IDataObject> => {
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

			return handleTradeTransaction(tradeInfo);
		};

		const closeTrade = async (i: number): Promise<IDataObject> => {
			const order = this.getNodeParameter('order', i) as number;

			const tradeInfo = {
				cmd: 0, // The original command will be determined by the server
				order,
				type: 2, // Close
			};

			return handleTradeTransaction(tradeInfo);
		};

		const getTrades = async (): Promise<IDataObject> => {
			const tradesResponse = (await wsManager.sendCommand({
				command: 'getTrades',
				arguments: {
					openedOnly: true,
				},
			})) as ITradesResponse;

			if (!tradesResponse.status || !tradesResponse.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					tradesResponse.errorDescr || 'Failed to get trades',
				);
			}

			return { trades: tradesResponse.returnData };
		};

		// Market Data Operations
		const getAllSymbols = async (): Promise<IDataObject> => {
			const response = (await wsManager.sendCommand({
				command: 'getAllSymbols',
			})) as ISymbolsResponse;

			if (!response.status || !response.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					response.errorDescr || 'Failed to get symbols',
				);
			}

			return { symbols: response.returnData };
		};

		const getSymbol = async (i: number): Promise<IDataObject> => {
			const symbol = this.getNodeParameter('symbol', i) as string;

			const response = (await wsManager.sendCommand({
				command: 'getSymbol',
				arguments: {
					symbol,
				},
			})) as ISymbolResponse;

			if (!response.status || !response.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					response.errorDescr || 'Failed to get symbol',
				);
			}

			return { symbolInfo: response.returnData };
		};

		const getChartData = async (i: number): Promise<IDataObject> => {
			const symbol = this.getNodeParameter('symbol', i) as string;
			const period = this.getNodeParameter('period', i) as number;
			const start = this.getNodeParameter('start', i) as string;

			const response = (await wsManager.sendCommand({
				command: 'getChartLastRequest',
				arguments: {
					info: {
						period,
						start: new Date(start).getTime(),
						symbol,
					},
				},
			})) as IChartResponse;

			if (!response.status || !response.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					response.errorDescr || 'Failed to get chart data',
				);
			}

			return {
				digits: response.returnData.digits,
				candles: response.returnData.rateInfos,
			};
		};

		// Account Operations
		const getAccountData = async (): Promise<IDataObject> => {
			const response = (await wsManager.sendCommand({
				command: 'getCurrentUserData',
			})) as IAccountDataResponse;

			if (!response.status || !response.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					response.errorDescr || 'Failed to get account data',
				);
			}

			return response.returnData;
		};

		const getMarginLevel = async (): Promise<IDataObject> => {
			const response = (await wsManager.sendCommand({
				command: 'getMarginLevel',
			})) as IMarginLevelResponse;

			if (!response.status || !response.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					response.errorDescr || 'Failed to get margin level',
				);
			}

			return response.returnData;
		};

		const getTickPrices = async (i: number): Promise<IDataObject> => {
			const symbol = this.getNodeParameter('symbol', i) as string;

			const response = (await wsManager.sendCommand({
				command: 'getTickPrices',
				arguments: {
					level: 0,
					symbols: [symbol],
					timestamp: 0,
				},
			})) as ITickPricesResponse;

			if (!response.status || !response.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					response.errorDescr || 'Failed to get tick prices',
				);
			}

			return {
				data: {
					symbol,
					quotations: response.returnData.quotations,
				},
			};
		};

		const getTradingHours = async (i: number): Promise<IDataObject> => {
			const symbol = this.getNodeParameter('symbol', i) as string;

			const response = (await wsManager.sendCommand({
				command: 'getTradingHours',
				arguments: {
					symbols: [symbol],
				},
			})) as ITradingHoursResponse;

			if (!response.status || !response.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					response.errorDescr || 'Failed to get trading hours',
				);
			}

			return {
				data: {
					symbol,
					hours: response.returnData,
				},
			};
		};

		const getMarginTrade = async (i: number): Promise<IDataObject> => {
			const symbol = this.getNodeParameter('symbol', i) as string;
			const volume = this.getNodeParameter('volume', i) as number;

			const response = (await wsManager.sendCommand({
				command: 'getMarginTrade',
				arguments: {
					symbol,
					volume,
				},
			})) as IMarginTradeResponse;

			if (!response.status || !response.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					response.errorDescr || 'Failed to get margin trade',
				);
			}

			return { margin: response.returnData.margin };
		};

		const getCommission = async (i: number): Promise<IDataObject> => {
			const symbol = this.getNodeParameter('symbol', i) as string;
			const volume = this.getNodeParameter('volume', i) as number;

			const response = (await wsManager.sendCommand({
				command: 'getCommissionDef',
				arguments: {
					symbol,
					volume,
				},
			})) as ICommissionResponse;

			if (!response.status || !response.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					response.errorDescr || 'Failed to get commission',
				);
			}

			return {
				commission: response.returnData.commission,
				rateOfExchange: response.returnData.rateOfExchange,
			};
		};

		const calculateProfit = async (i: number): Promise<IDataObject> => {
			const symbol = this.getNodeParameter('symbol', i) as string;
			const volume = this.getNodeParameter('volume', i) as number;
			const openPrice = this.getNodeParameter('openPrice', i) as number;
			const closePrice = this.getNodeParameter('closePrice', i) as number;
			const cmd = this.getNodeParameter('cmd', i) as number;

			const response = (await wsManager.sendCommand({
				command: 'getProfitCalculation',
				arguments: {
					closePrice,
					cmd,
					openPrice,
					symbol,
					volume,
				},
			})) as IProfitCalculationResponse;

			if (!response.status || !response.returnData) {
				throw new NodeOperationError(
					this.getNode(),
					response.errorDescr || 'Failed to calculate profit',
				);
			}

			return { profit: response.returnData.profit };
		};

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
								case 'openTrade':
									response = await openTrade(i);
									break;

								case 'closeTrade':
									response = await closeTrade(i);
									break;

								case 'getTrades':
									response = await getTrades();
									break;

								default:
									throw new NodeOperationError(
										this.getNode(),
										`Unknown trading operation: ${operation}`,
									);
							}
							break;
						}

						case 'marketData': {
							switch (operation) {
								case 'getAllSymbols':
									response = await getAllSymbols();
									break;

								case 'getSymbol':
									response = await getSymbol(i);
									break;

								case 'getChartData':
									response = await getChartData(i);
									break;

								case 'getTickPrices':
									response = await getTickPrices(i);
									break;

								case 'getTradingHours':
									response = await getTradingHours(i);
									break;

								default:
									throw new NodeOperationError(
										this.getNode(),
										`Unknown market data operation: ${operation}`,
									);
							}
							break;
						}

						case 'account': {
							switch (operation) {
								case 'getAccountData':
									response = await getAccountData();
									break;

								case 'getMarginLevel':
									response = await getMarginLevel();
									break;

								case 'getMarginTrade':
									response = await getMarginTrade(i);
									break;

								case 'getCommission':
									response = await getCommission(i);
									break;

								case 'calculateProfit':
									response = await calculateProfit(i);
									break;

								default:
									throw new NodeOperationError(
										this.getNode(),
										`Unknown account operation: ${operation}`,
									);
							}
							break;
						}

						default:
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
