import { IWebSocketResponse } from '../utils/WebSocketManager';
import { IDataObject } from 'n8n-workflow';

export interface ITradeStatusResponse extends IWebSocketResponse {
	returnData?: IDataObject;
}