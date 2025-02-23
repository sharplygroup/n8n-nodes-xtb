import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import {
	DmaOperations,
	IWebSocketResponse,
} from '@sharplygroup/xtb-api-js';

export class DmaResource {
	constructor(
		private readonly dmaOperations: DmaOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		const result = await this.executeMethod(operation);
		return result as unknown as IDataObject;
	}

	private async executeMethod(operation: string): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getStepRules':
				return this.getStepRules();
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown dma operation: ${operation}`,
				);
		}
	}

	private async getStepRules(): Promise<any> {
		return this.dmaOperations.getStepRules();
	}
}
