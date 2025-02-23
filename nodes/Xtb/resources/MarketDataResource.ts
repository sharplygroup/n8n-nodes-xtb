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
		const result = await this.executeMethod(operation, i);
		return result as unknown as IDataObject;
	}

	private async executeMethod(operation: string, i: number): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getCalendar': {
				return this.getCalendar();
			}
			case 'getChartLastRequest': {
				const info = this.executeFunctions.getNodeParameter('info', i) as any;
				return this.getChartLastRequest(info);
			}
			case 'getChartRangeRequest': {
				const info = this.executeFunctions.getNodeParameter('info', i) as any;
				return this.getChartRangeRequest(info);
			}
			case 'getTickPrices': {
				const level = this.executeFunctions.getNodeParameter('level', i) as number;
				const symbols = this.executeFunctions.getNodeParameter('symbols', i) as string[];
				const timestamp = this.executeFunctions.getNodeParameter('timestamp', i) as number;
				return this.getTickPrices(level, symbols, timestamp);
			}
			case 'getTradingHours': {
				const symbols = this.executeFunctions.getNodeParameter('symbols', i) as string[];
				return this.getTradingHours(symbols);
			}
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
