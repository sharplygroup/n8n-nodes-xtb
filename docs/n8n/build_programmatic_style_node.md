# Build a programmatic-style node [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#build-a-programmatic-style-node "Permanent link")

This tutorial walks through building a programmatic-style node. Before you begin, make sure this is the node style you need. Refer to [Choose your node building approach](https://docs.n8n.io/integrations/creating-nodes/plan/choose-node-method/) for more information.

## Prerequisites [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#prerequisites "Permanent link")

You need the following installed on your development machine:

- [git](https://git-scm.com/downloads)
- Node.js and npm. Minimum version Node 18.17.0. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).

You need some understanding of:

- JavaScript/TypeScript
- REST APIs
- git
- [Expressions](https://docs.n8n.io/glossary/#expression-n8n) in n8n

## Build your node [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#build-your-node "Permanent link")

In this section, you'll clone n8n's node starter repository, and build a node that integrates the [SendGrid](https://sendgrid.com/). You'll create a node that implements one piece of SendGrid functionality: create a contact.

Existing node

n8n has a built-in SendGrid node. To avoid clashing with the existing node, you'll give your version a different name.

### Step 1: Set up the project [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-1-set-up-the-project "Permanent link")

n8n provides a starter repository for node development. Using the starter ensures you have all necessary dependencies. It also provides a linter.

Clone the repository and navigate into the directory:

1. [Generate a new repository](https://github.com/n8n-io/n8n-nodes-starter/generate) from the template repository.
2. Clone your new repository:



|     |     |
| --- | --- |
| ```
1
2
``` | ```
git clone https://github.com/<your-organization>/<your-repo-name>.git n8n-nodes-friendgrid
cd n8n-nodes-friendgrid
``` |


The starter contains example nodes and credentials. Delete the following directories and files:

- `nodes/ExampleNode`
- `nodes/HTTPBin`
- `credentials/ExampleCredentials.credentials.ts`
- `credentials/HttpBinApi.credentials.ts`

Now create the following directories and files:

`nodes/FriendGrid`

`nodes/FriendGrid/FriendGrid.node.json`

`nodes/FriendGrid/FriendGrid.node.ts`

`credentials/FriendGridApi.credentials.ts`

These are the key files required for any node. Refer to [Node file structure](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-file-structure/) for more information on required files and recommended organization.

Now install the project dependencies:

|     |     |
| --- | --- |
| ```
1
``` | ```
npm i
``` |

### Step 2: Add an icon [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-2-add-an-icon "Permanent link")

Save the SendGrid SVG logo from [here](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/SendGrid/sendGrid.svg) as `friendGrid.svg` in `nodes/FriendGrid/`.

n8n recommends using an SVG for your node icon, but you can also use PNG. If using PNG, the icon resolution should be 60x60px. Node icons should have a square or near-square aspect ratio.

Don't reference Font Awesome

If you want to use a Font Awesome icon in your node, download and embed the image.

### Step 3: Define the node in the base file [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-3-define-the-node-in-the-base-file "Permanent link")

Every node must have a base file. Refer to [Node base file](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/) for detailed information about base file parameters.

In this example, the file is `FriendGrid.node.ts`. To keep this tutorial short, you'll place all the node functionality in this one file. When building more complex nodes, you should consider splitting out your functionality into modules. Refer to [Node file structure](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-file-structure/) for more information.

#### Step 3.1: Imports [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-31-imports "Permanent link")

Start by adding the import statements:

|     |     |
| --- | --- |
| ```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
``` | ```
import {
	IExecuteFunctions,
} from 'n8n-core';
import {
	IDataObject,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import {
	OptionsWithUri,
} from 'request';
``` |

#### Step 3.2: Create the main class [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-32-create-the-main-class "Permanent link")

The node must export an interface that implements `INodeType`. This interface must include a `description` interface, which in turn contains the `properties` array.

Class names and file names

Make sure the class name and the file name match. For example, given a class `FriendGrid`, the filename must be `FriendGrid.node.ts`.

|     |     |
| --- | --- |
| ```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
``` | ```
export class FriendGrid implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here
		properties: [
			// Resources and operations will go here
		],
	};
	// The execute method will go here
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	}
}
``` |

#### Step 3.3: Add node details [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-33-add-node-details "Permanent link")

All programmatic nodes need some basic parameters, such as their display name and icon. Add the following to the `description`:

|     |     |
| --- | --- |
| ```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
``` | ```
displayName: 'FriendGrid',
name: 'friendGrid',
icon: 'file:friendGrid.svg',
group: ['transform'],
version: 1,
description: 'Consume SendGrid API',
defaults: {
	name: 'FriendGrid',
},
inputs: ['main'],
outputs: ['main'],
credentials: [
	{
		name: 'friendGridApi',
		required: true,
	},
],
``` |

n8n uses some of the properties set in `description` to render the node in the Editor UI. These properties are `displayName`, `icon`, and `description`.

#### Step 3.4: Add the resource [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-34-add-the-resource "Permanent link")

The resource object defines the API resource that the node uses. In this tutorial, you're creating a node to access one of SendGrid's API endpoints: `/v3/marketing/contacts`. This means you need to define a resource for this endpoint. Update the `properties` array with the resource object:

|     |     |
| --- | --- |
| ```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
``` | ```
{
	displayName: 'Resource',
	name: 'resource',
	type: 'options',
	options: [
		{
			name: 'Contact',
			value: 'contact',
		},
	],
	default: 'contact',
	noDataExpression: true,
	required: true,
	description: 'Create a new contact',
},
``` |

`type` controls which UI element n8n displays for the resource, and tells n8n what type of data to expect from the user. `options` results in n8n adding a dropdown that allows users to choose one option. Refer to [Node UI elements](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/) for more information.

#### Step 3.5: Add operations [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-35-add-operations "Permanent link")

The operations object defines what you can do with a resource. It usually relates to REST API verbs (GET, POST, and so on). In this tutorial, there's one operation: create a contact. It has one required field, the email address for the contact the user creates.

Add the following to the `properties` array, after the `resource` object:

|     |     |
| --- | --- |
| ```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
``` | ```
{
	displayName: 'Operation',
	name: 'operation',
	type: 'options',
	displayOptions: {
		show: {
			resource: [
				'contact',
			],
		},
	},
	options: [
		{
			name: 'Create',
			value: 'create',
			description: 'Create a contact',
			action: 'Create a contact',
		},
	],
	default: 'create',
	noDataExpression: true,
},
{
	displayName: 'Email',
	name: 'email',
	type: 'string',
	required: true,
	displayOptions: {
		show: {
			operation: [
				'create',
			],
			resource: [
				'contact',
			],
		},
	},
	default:'',
	placeholder: 'name@email.com',
	description:'Primary email for the contact',
},
``` |

#### Step 3.6: Add optional fields [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-36-add-optional-fields "Permanent link")

Most APIs, including the SendGrid API that you're using in this example, have optional fields you can use to refine your query.

To avoid overwhelming users, n8n displays these under **Additional Fields** in the UI.

For this tutorial, you'll add two additional fields, to allow users to enter the contact's first name and last name. Add the following to the properties array:

|     |     |
| --- | --- |
| ```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
``` | ```
{
	displayName: 'Additional Fields',
	name: 'additionalFields',
	type: 'collection',
	placeholder: 'Add Field',
	default: {},
	displayOptions: {
		show: {
			resource: [
				'contact',
			],
			operation: [
				'create',
			],
		},
	},
	options: [
		{
			displayName: 'First Name',
			name: 'firstName',
			type: 'string',
			default: '',
		},
		{
			displayName: 'Last Name',
			name: 'lastName',
			type: 'string',
			default: '',
		},
	],
},
``` |

### Step 4: Add the execute method [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-4-add-the-execute-method "Permanent link")

You've set up the node UI and basic information. It's time to map the node UI to API requests, and make the node actually do something.

The `execute` method runs every time the node runs. In this method, you have access to the input items and to the parameters that the user set in the UI, including the credentials.

Add the following the `execute` method in the `FriendGrid.node.ts`:

|     |     |
| --- | --- |
| ```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
``` | ```
// Handle data coming from previous nodes
const items = this.getInputData();
let responseData;
const returnData = [];
const resource = this.getNodeParameter('resource', 0) as string;
const operation = this.getNodeParameter('operation', 0) as string;
// For each item, make an API call to create a contact
for (let i = 0; i < items.length; i++) {
	if (resource === 'contact') {
		if (operation === 'create') {
			// Get email input
			const email = this.getNodeParameter('email', i) as string;
			// Get additional fields input
			const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;
			const data: IDataObject = {
				email,
			};
			Object.assign(data, additionalFields);
			// Make HTTP request according to https://sendgrid.com/docs/api-reference/
			const options: OptionsWithUri = {
				headers: {
					'Accept': 'application/json',
				},
				method: 'PUT',
				body: {
					contacts: [
						data,
					],
				},
				uri: `https://api.sendgrid.com/v3/marketing/contacts`,
				json: true,
			};
			responseData = await this.helpers.requestWithAuthentication.call(this, 'friendGridApi', options);
			returnData.push(responseData);
		}
	}
}
// Map data to n8n data structure
return [this.helpers.returnJsonArray(returnData)];
``` |

Note the following lines of this code:

|     |     |
| --- | --- |
| ```
1
2
3
4
5
6
7
``` | ```
const items = this.getInputData();
... 
for (let i = 0; i < items.length; i++) {
	...
	const email = this.getNodeParameter('email', i) as string;
	...
}
``` |

Users can provide data in two ways:

- Entered directly in the node fields
- By mapping data from earlier nodes in the workflow

`getInputData()`, and the subsequent loop, allows the node to handle situations where data comes from a previous node. This includes supporting multiple inputs. This means that if, for example, the previous node outputs contact information for five people, your FriendGrid node can create five contacts.

### Step 5: Set up authentication [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-5-set-up-authentication "Permanent link")

The SendGrid API requires users to authenticate with an API key.

Add the following to `FriendGridApi.credentials.ts`

|     |     |
| --- | --- |
| ```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
``` | ```
import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';
export class FriendGridApi implements ICredentialType {
	name = 'friendGridApi';
	displayName = 'FriendGrid API';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.sendgrid.com/v3',
			url: '/marketing/contacts',
		},
	};
}
``` |

For more information about credentials files and options, refer to [Credentials file](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/).

### Step 6: Add node metadata [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-6-add-node-metadata "Permanent link")

Metadata about your node goes in the JSON file at the root of your node. n8n refers to this as the codex file. In this example, the file is `FriendGrid.node.json`.

Add the following code to the JSON file:

|     |     |
| --- | --- |
| ```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
``` | ```
{
	"node": "n8n-nodes-base.FriendGrid",
	"nodeVersion": "1.0",
	"codexVersion": "1.0",
	"categories": [
		"Miscellaneous"
	],
	"resources": {
		"credentialDocumentation": [
			{
				"url": ""
			}
		],
		"primaryDocumentation": [
			{
				"url": ""
			}
		]
	}
}
``` |

For more information on these parameters, refer to [Node codex files](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-codex-files/).

### Step 7: Update the npm package details [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-7-update-the-npm-package-details "Permanent link")

Your npm package details are in the `package.json` at the root of the project. It's essential to include the `n8n` object with links to the credentials and base node file. Update this file to include the following information:

|     |     |
| --- | --- |
| ```
 1
 2
 3
 4
 5
 6
 7
 8
 9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
``` | ```
{
	// All node names must start with "n8n-nodes-"
	"name": "n8n-nodes-friendgrid",
	"version": "0.1.0",
	"description": "n8n node to create contacts in SendGrid",
	"keywords": [
		// This keyword is required for community nodes
		"n8n-community-node-package"
	],
	"license": "MIT",
	"homepage": "https://n8n.io",
	"author": {
		"name": "Test",
		"email": "test@example.com"
	},
	"repository": {
		"type": "git",
		// Change the git remote to your own repository
		// Add the new URL here
		"url": "git+<your-repo-url>"
	},
	"main": "index.js",
	"scripts": {
		// don't change
	},
	"files": [
		"dist"
	],
	// Link the credentials and node
	"n8n": {
		"n8nNodesApiVersion": 1,
		"credentials": [
			"dist/credentials/FriendGridApi.credentials.js"
		],
		"nodes": [
			"dist/nodes/FriendGrid/FriendGrid.node.js"
		]
	},
	"devDependencies": {
		// don't change
	},
	"peerDependencies": {
		// don't change
	}
}
``` |

You need to update the `package.json` to include your own information, such as your name and repository URL. For more information on npm `package.json` files, refer to [npm's package.json documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).

## Test your node [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#test-your-node "Permanent link")

You can test your node as you build it by running it in a local n8n instance.

1. Install n8n using npm:



|     |     |
| --- | --- |
| ```
1
``` | ```
npm install n8n -g
``` |

2. When you are ready to test your node, publish it locally:



|     |     |
| --- | --- |
| ```
1
2
3
``` | ```
# In your node directory
npm run build
npm link
``` |

3. Install the node into your local n8n instance:




|     |     |
| --- | --- |
| ```
1
2
3
``` | ```
# In the nodes directory within your n8n installation
# node-package-name is the name from the package.json
npm link <node-package-name>
``` |







Check your directory



Make sure you run `npm link <node-name>` in the nodes directory within your n8n installation. This can be:



- `~/.n8n/custom/`
- `~/.n8n/<your-custom-name>`: if your n8n installation set a different name using `N8N_CUSTOM_EXTENSIONS`.

4. Start n8n:




|     |     |
| --- | --- |
| ```
1
``` | ```
n8n start
``` |

5. Open n8n in your browser. You should see your nodes when you search for them in the nodes panel.



Node names



Make sure you search using the node name, not the package name. For example, if your npm package name is `n8n-nodes-weather-nodes`, and the package contains nodes named `rain`, `sun`, `snow`, you should search for `rain`, not `weather-nodes`.


### Troubleshooting [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#troubleshooting "Permanent link")

- There's no `custom` directory in `~/.n8n` local installation.

You have to create `custom` directory manually and run `npm init`

|     |     |
| --- | --- |
| ```
1
2
3
4
``` | ```
# In ~/.n8n directory run
mkdir custom 
cd custom 
npm init
``` |