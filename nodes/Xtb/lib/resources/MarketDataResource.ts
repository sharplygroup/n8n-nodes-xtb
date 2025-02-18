import {
	IExecuteFunctions,
	IDataObject,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import { MarketDataOperations } from '../operations/MarketDataOperations';

export class MarketDataResource {
	constructor(
		private readonly marketDataOperations: MarketDataOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		switch (operation) {
			case 'getAllSymbols':
				return this.getAllSymbols();
			case 'getSymbol':
				return this.getSymbol(items, i);
			case 'getChartData':
				return this.getChartData(items, i);
			case 'getTickPrices':
				return this.getTickPrices(items, i);
			case 'getTradingHours':
				return this.getTradingHours(items, i);
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown market data operation: ${operation}`,
				);
		}
	}

	private async getAllSymbols(): Promise<IDataObject> {
		return this.marketDataOperations.getAllSymbols();
	}

	private async getSymbol(items: INodeExecutionData[], i: number): Promise<IDataObject> {
		const symbol = this.executeFunctions.getNodeParameter('symbol', i) as string;
		return this.marketDataOperations.getSymbol(symbol);
	}

	private async getChartData(items: INodeExecutionData[], i: number): Promise<IDataObject> {
		const symbol = this.executeFunctions.getNodeParameter('symbol', i) as string;
		const period = this.executeFunctions.getNodeParameter('period', i) as number;
		const start = this.executeFunctions.getNodeParameter('start', i) as string;
		return this.marketDataOperations.getChartData(symbol, period, start);
	}

	private async getTickPrices(items: INodeExecutionData[], i: number): Promise<IDataObject> {
		const symbol = this.executeFunctions.getNodeParameter('symbol', i) as string;
		return this.marketDataOperations.getTickPrices(symbol);
	}

	private async getTradingHours(items: INodeExecutionData[], i: number): Promise<IDataObject> {
		const symbol = this.executeFunctions.getNodeParameter('symbol', i) as string;
		return this.marketDataOperations.getTradingHours(symbol);
	}
}
