import { NodeOperationError } from 'n8n-workflow';

export class XtbApiError extends NodeOperationError {
	constructor(node: any, message: string, public readonly errorCode?: string) {
		super(node, message);
		this.name = 'XtbApiError';
	}
}