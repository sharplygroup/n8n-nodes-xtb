import { IWebSocketResponse } from '../utils/WebSocketManager';
import { IDataObject } from 'n8n-workflow';

export interface IAccountDataResponse extends IWebSocketResponse {
	returnData?: {
		currency: string;
		leverage: number;
		leverageMultiplier: number;
		group: string;
		companyUnit: number;
		spreadType: string;
		ibAccount: boolean;
		trailingStop: boolean;
	};
}