import { XtbApiError } from './XtbApiError';

export class XtbConnectionError extends XtbApiError {
	constructor(node: any, message: string) {
		super(node, message);
		this.name = 'XtbConnectionError';
	}
}