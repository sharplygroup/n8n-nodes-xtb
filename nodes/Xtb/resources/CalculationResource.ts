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
		const result = await this.executeMethod(operation);
		return result as unknown as IDataObject;
	}

	private async executeMethod(operation: string): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getCommissionDef':
				return this.getCommissionDef();
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

	private async getCommissionDef(): Promise<ICommissionResponse> {
		// TODO: Implement parameters
		return this.calculationOperations.getCommissionDef('', 0);
	}

	private async getMarginTrade(): Promise<IMarginTradeResponse> {
		// TODO: Implement parameters
		return this.calculationOperations.getMarginTrade('', 0);
	}

	private async getProfitCalculation(): Promise<IProfitCalculationResponse> {
		// TODO: Implement parameters
		return this.calculationOperations.getProfitCalculation(0, 0, 0, '', 0);
	}
}
