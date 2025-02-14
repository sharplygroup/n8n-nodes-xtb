import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class XtbApi implements ICredentialType {
	name = 'xtbApi';
	displayName = 'XTB API';
	// FIXME!!
	// There is an issue with the certificate of the XTB API, so we need to disable the certificate check by using http instead of https
	documentationUrl = 'https://developers.xstore.pro/documentation/';

	// FIXME!!
	// I think the credentials are not login and password but rather login and API Key
	properties: INodeProperties[] = [
		{
			displayName: 'User ID',
			name: 'userId',
			type: 'string',
			default: '',
			required: true,
			description: 'Your XTB user ID',
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
			description: 'Your XTB password',
		},
		{
			displayName: 'Environment',
			name: 'demo',
			type: 'boolean',
			default: true,
			description: 'Whether to use demo or real trading environment',
		},
	];

	// Since XTB uses WebSocket, we'll implement the actual testing in the node itself
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {},
	};

	// This is a placeholder as we can't directly test WebSocket credentials
	// The actual testing will be done when establishing WebSocket connection
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://ws.xtb.com',
			url: '/ping',
		},
	};
}
