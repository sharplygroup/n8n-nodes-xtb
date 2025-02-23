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

	private async getChartLastRequest(): Promise<IChartResponse> {
		// TODO: Implement parameters
		return this.marketDataOperations.getChartLastRequest({});
	}

	private async getChartRangeRequest(): Promise<IChartResponse> {
		// TODO: Implement parameters
		return this.marketDataOperations.getChartRangeRequest({});
	}

	private async getTickPrices(): Promise<ITickPricesResponse> {
		// TODO: Implement parameters
		return this.marketDataOperations.getTickPrices(0, [], 0);
	}

	private async getTradingHours(): Promise<ITradingHoursResponse> {
		// TODO: Implement parameters
		return this.marketDataOperations.getTradingHours([]);
	}
}
