import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class XtbApi implements ICredentialType {
	name = 'xtbApi';
	displayName = 'XTB API';
	documentationUrl = 'https://developers.xstore.pro/documentation/';
	properties: INodeProperties[] = [
		{
			displayName: 'User ID',
			name: 'userId',
			type: 'string',
			default: '',
			required: true,
			description: 'Your XTB account user ID',
		},
		{
			displayName: 'Password',
			name: 'password',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your XTB account password',
		},
		{
			displayName: 'Demo Account',
			name: 'demo',
			type: 'boolean',
			default: true,
			description: 'Whether to use demo or real account',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};

	// Since XTB uses WebSocket, we can't use the standard HTTP request test
	// Instead, we'll return true and let the WebSocket connection test handle authentication
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://ws.xtb.com',
			url: '/demo',
			method: 'GET',
		},
	};
}