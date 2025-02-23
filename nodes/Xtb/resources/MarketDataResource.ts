import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import {
	MarketDataOperations,
	IChartResponse,
	ITickPricesResponse,
	ITradingHoursResponse,
	IWebSocketResponse,
} from '@sharplygroup/xtb-api-js';

export class MarketDataResource {
	constructor(
		private readonly marketDataOperations: MarketDataOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		const result = await this.executeMethod(operation);
		return result as unknown as IDataObject;
	}

	private async executeMethod(operation: string): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getCalendar':
				return this.getCalendar();
			case 'getChartLastRequest':
				return this.getChartLastRequest();
			case 'getChartRangeRequest':
				return this.getChartRangeRequest();
			case 'getTickPrices':
				return this.getTickPrices();
			case 'getTradingHours':
				return this.getTradingHours();
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown marketData operation: ${operation}`,
				);
		}
	}

	private async getCalendar(): Promise<any> {
		// TODO: Implement parameters
		return this.marketDataOperations.getCalendar();
	}

	private async getChartLastRequest(info: any): Promise<IChartResponse> {
		return this.marketDataOperations.getChartLastRequest(info);
	}

	private async getChartRangeRequest(info: any): Promise<IChartResponse> {
		return this.marketDataOperations.getChartRangeRequest(info);
	}

	private async getTickPrices(
		level: number,
		symbols: string[],
		timestamp: number,
	): Promise<ITickPricesResponse> {
		return this.marketDataOperations.getTickPrices(level, symbols, timestamp);
	}

	private async getTradingHours(symbols: string[]): Promise<ITradingHoursResponse> {
		return this.marketDataOperations.getTradingHours(symbols);
	}
}
