import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import {
	AccountOperations,
	IAccountDataResponse,
	IMarginLevelResponse,
	IWebSocketResponse,
} from '@sharplygroup/xtb-api-js';

export class AccountResource {
	constructor(
		private readonly accountOperations: AccountOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		const result = await this.executeMethod(operation);
		return result as unknown as IDataObject;
	}

	private async executeMethod(operation: string): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getCurrentUserData':
				return this.getCurrentUserData();
			case 'getMarginLevel':
				return this.getMarginLevel();
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown account operation: ${operation}`,
				);
		}
	}

	private async getCurrentUserData(): Promise<IAccountDataResponse> {
		return this.accountOperations.getCurrentUserData();
	}

	private async getMarginLevel(): Promise<IMarginLevelResponse> {
		return this.accountOperations.getMarginLevel();
	}
}
