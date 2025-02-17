import { XtbApiError } from './XtbApiError';

export class XtbLoginError extends XtbApiError {
	constructor(node: any, message: string, errorCode?: string) {
		super(node, message, errorCode);
		this.name = 'XtbLoginError';
	}
}