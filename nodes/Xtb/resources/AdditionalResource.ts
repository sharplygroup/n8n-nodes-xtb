import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import {
	AdditionalOperations,
	IWebSocketResponse,
} from '@sharplygroup/xtb-api-js';

export class AdditionalResource {
	constructor(
		private readonly additionalOperations: AdditionalOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		const result = await this.executeMethod(items, i, operation);
		return result as unknown as IDataObject;
	}

	private async executeMethod(items: INodeExecutionData[], i: number, operation: string): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getCalendar':
				return this.getCalendar();
			case 'getServerTime':
				return this.getServerTime();
			case 'getStepRules':
				return this.getStepRules();
			case 'getVersion':
				return this.getVersion();
			case 'getBalance':
				return this.getBalance();
			case 'getCandles':
				const symbol = this.executeFunctions.getNodeParameter('symbol', i) as string;
				if (!symbol) {
					throw new NodeOperationError(
						this.executeFunctions.getNode(),
						'Symbol is required for getCandles operation',
					);
				}
				return this.getCandles(symbol);
			case 'getKeepAlive':
				return this.getKeepAlive();
			case 'getNews':
				return this.getNews();
			case 'getProfits':
				return this.getProfits();
			case 'getTradeStatus':
				return this.getTradeStatus();
			case 'ping':
				return this.ping();
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown additional operation: ${operation}`,
				);
		}
	}

	private async getCalendar(): Promise<any> {
		return this.additionalOperations.getCalendar();
	}

	private async getServerTime(): Promise<any> {
		return this.additionalOperations.getServerTime();
	}

	private async getStepRules(): Promise<any> {
		return this.additionalOperations.getStepRules();
	}

	private async getVersion(): Promise<any> {
		return this.additionalOperations.getVersion();
	}

	private async getBalance(): Promise<any> {
		return this.additionalOperations.getBalance();
	}

	private async getCandles(symbol: string): Promise<any> {
		return this.additionalOperations.getCandles(symbol);
	}

	private async getKeepAlive(): Promise<any> {
		return this.additionalOperations.getKeepAlive();
	}

	private async getNews(): Promise<any> {
		return this.additionalOperations.getNews();
	}

	private async getProfits(): Promise<any> {
		return this.additionalOperations.getProfits();
	}

	private async getTradeStatus(): Promise<any> {
		return this.additionalOperations.getTradeStatus();
	}

	private async ping(): Promise<any> {
		return this.additionalOperations.ping();
	}
}
