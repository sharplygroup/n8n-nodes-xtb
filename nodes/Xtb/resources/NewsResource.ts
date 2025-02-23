import {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	NodeOperationError,
} from 'n8n-workflow';
import {
	NewsOperations,
	IWebSocketResponse,
} from '@sharplygroup/xtb-api-js';

export class NewsResource {
	constructor(
		private readonly newsOperations: NewsOperations,
		private readonly executeFunctions: IExecuteFunctions,
	) {}

	async execute(items: INodeExecutionData[], i: number, operation: string): Promise<IDataObject> {
		const result = await this.executeMethod(operation);
		return result as unknown as IDataObject;
	}

	private async executeMethod(operation: string): Promise<IWebSocketResponse> {
		switch (operation) {
			case 'getNews':
				return this.getNews();
			default:
				throw new NodeOperationError(
					this.executeFunctions.getNode(),
					`Unknown news operation: ${operation}`,
				);
		}
	}

	private async getNews(end: number, start: number): Promise<any> {
		return this.newsOperations.getNews(end, start);
	}
}
