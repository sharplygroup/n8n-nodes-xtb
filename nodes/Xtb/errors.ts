import { NodeOperationError } from 'n8n-workflow';

export class XtbApiError extends NodeOperationError {
	constructor(node: any, message: string, public readonly errorCode?: string) {
		super(node, message);
		this.name = 'XtbApiError';
	}
}

export class XtbLoginError extends XtbApiError {
	constructor(node: any, message: string, errorCode?: string) {
		super(node, message, errorCode);
		this.name = 'XtbLoginError';
	}
}

export class XtbConnectionError extends XtbApiError {
	constructor(node: any, message: string) {
		super(node, message);
		this.name = 'XtbConnectionError';
	}
}