import { IWebSocketResponse } from '../utils/WebSocketManager';
import { IDataObject } from 'n8n-workflow';

export interface IChartResponse extends IWebSocketResponse {
	returnData?: {
		digits: number;
		rateInfos: IDataObject[];
	};
}