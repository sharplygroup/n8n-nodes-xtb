import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import {
	CalculationOperations,
	ICommissionResponse,
	IMarginTradeResponse,
	IProfitCalculationResponse,
	IWebSocketResponse,
} from '@sharplygroup/xtb-api-js';

export class CalculationResource {
	constructor(
		private readonly calculationOperations: CalculationOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		const result = await this.executeMethod(items, i, operation);
		return result as unknown as IDataObject;
	}

	private async executeMethod(items: INodeExecutionData[], i: number, operation: string): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getCommissionDef':
				const symbol = this.executeFunctions.getNodeParameter('symbol', i);
				const volume = this.executeFunctions.getNodeParameter('volume', i);
				return this.getCommissionDef(symbol, volume);
			case 'getMarginTrade':
				return this.getMarginTrade();
			case 'getProfitCalculation':
				return this.getProfitCalculation();
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown calculation operation: ${operation}`,
				);
		}
	}

	private async getCommissionDef(symbol: string, volume: number): Promise<ICommissionResponse> {
		return this.calculationOperations.getCommissionDef(symbol, volume);
	}

	private async getMarginTrade(symbol: string, volume: number): Promise<IMarginTradeResponse> {
		return this.calculationOperations.getMarginTrade(symbol, volume);
	}

	private async getProfitCalculation(closePrice: number, cmd: number, openPrice: number, symbol: string, volume: number): Promise<IProfitCalculationResponse> {
		return this.calculationOperations.getProfitCalculation(closePrice, cmd, openPrice, symbol, volume);
	}
}
