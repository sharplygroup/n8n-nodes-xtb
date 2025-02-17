import { IWebSocketResponse } from '../utils/WebSocketManager';
import { IDataObject } from 'n8n-workflow';

export interface ISymbolResponse extends IWebSocketResponse {
	returnData?: IDataObject;
}
