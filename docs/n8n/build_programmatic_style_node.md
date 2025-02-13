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
| ```<br>1<br>2<br>``` | ```<br>git clone https://github.com/<your-organization>/<your-repo-name>.git n8n-nodes-friendgrid<br>cd n8n-nodes-friendgrid<br>``` |


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
| ```<br>1<br>``` | ```<br>npm i<br>``` |

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
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>``` | ```<br>import {<br>	IExecuteFunctions,<br>} from 'n8n-core';<br>import {<br>	IDataObject,<br>	INodeExecutionData,<br>	INodeType,<br>	INodeTypeDescription,<br>} from 'n8n-workflow';<br>import {<br>	OptionsWithUri,<br>} from 'request';<br>``` |

#### Step 3.2: Create the main class [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-32-create-the-main-class "Permanent link")

The node must export an interface that implements `INodeType`. This interface must include a `description` interface, which in turn contains the `properties` array.

Class names and file names

Make sure the class name and the file name match. For example, given a class `FriendGrid`, the filename must be `FriendGrid.node.ts`.

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>``` | ```<br>export class FriendGrid implements INodeType {<br>	description: INodeTypeDescription = {<br>		// Basic node details will go here<br>		properties: [<br>			// Resources and operations will go here<br>		],<br>	};<br>	// The execute method will go here<br>	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {<br>	}<br>}<br>``` |

#### Step 3.3: Add node details [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-33-add-node-details "Permanent link")

All programmatic nodes need some basic parameters, such as their display name and icon. Add the following to the `description`:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>``` | ```<br>displayName: 'FriendGrid',<br>name: 'friendGrid',<br>icon: 'file:friendGrid.svg',<br>group: ['transform'],<br>version: 1,<br>description: 'Consume SendGrid API',<br>defaults: {<br>	name: 'FriendGrid',<br>},<br>inputs: ['main'],<br>outputs: ['main'],<br>credentials: [<br>	{<br>		name: 'friendGridApi',<br>		required: true,<br>	},<br>],<br>``` |

n8n uses some of the properties set in `description` to render the node in the Editor UI. These properties are `displayName`, `icon`, and `description`.

#### Step 3.4: Add the resource [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-34-add-the-resource "Permanent link")

The resource object defines the API resource that the node uses. In this tutorial, you're creating a node to access one of SendGrid's API endpoints: `/v3/marketing/contacts`. This means you need to define a resource for this endpoint. Update the `properties` array with the resource object:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>``` | ```<br>{<br>	displayName: 'Resource',<br>	name: 'resource',<br>	type: 'options',<br>	options: [<br>		{<br>			name: 'Contact',<br>			value: 'contact',<br>		},<br>	],<br>	default: 'contact',<br>	noDataExpression: true,<br>	required: true,<br>	description: 'Create a new contact',<br>},<br>``` |

`type` controls which UI element n8n displays for the resource, and tells n8n what type of data to expect from the user. `options` results in n8n adding a dropdown that allows users to choose one option. Refer to [Node UI elements](https://docs.n8n.io/integrations/creating-nodes/build/reference/ui-elements/) for more information.

#### Step 3.5: Add operations [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-35-add-operations "Permanent link")

The operations object defines what you can do with a resource. It usually relates to REST API verbs (GET, POST, and so on). In this tutorial, there's one operation: create a contact. It has one required field, the email address for the contact the user creates.

Add the following to the `properties` array, after the `resource` object:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br>37<br>38<br>39<br>40<br>41<br>``` | ```<br>{<br>	displayName: 'Operation',<br>	name: 'operation',<br>	type: 'options',<br>	displayOptions: {<br>		show: {<br>			resource: [<br>				'contact',<br>			],<br>		},<br>	},<br>	options: [<br>		{<br>			name: 'Create',<br>			value: 'create',<br>			description: 'Create a contact',<br>			action: 'Create a contact',<br>		},<br>	],<br>	default: 'create',<br>	noDataExpression: true,<br>},<br>{<br>	displayName: 'Email',<br>	name: 'email',<br>	type: 'string',<br>	required: true,<br>	displayOptions: {<br>		show: {<br>			operation: [<br>				'create',<br>			],<br>			resource: [<br>				'contact',<br>			],<br>		},<br>	},<br>	default:'',<br>	placeholder: 'name@email.com',<br>	description:'Primary email for the contact',<br>},<br>``` |

#### Step 3.6: Add optional fields [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-36-add-optional-fields "Permanent link")

Most APIs, including the SendGrid API that you're using in this example, have optional fields you can use to refine your query.

To avoid overwhelming users, n8n displays these under **Additional Fields** in the UI.

For this tutorial, you'll add two additional fields, to allow users to enter the contact's first name and last name. Add the following to the properties array:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>``` | ```<br>{<br>	displayName: 'Additional Fields',<br>	name: 'additionalFields',<br>	type: 'collection',<br>	placeholder: 'Add Field',<br>	default: {},<br>	displayOptions: {<br>		show: {<br>			resource: [<br>				'contact',<br>			],<br>			operation: [<br>				'create',<br>			],<br>		},<br>	},<br>	options: [<br>		{<br>			displayName: 'First Name',<br>			name: 'firstName',<br>			type: 'string',<br>			default: '',<br>		},<br>		{<br>			displayName: 'Last Name',<br>			name: 'lastName',<br>			type: 'string',<br>			default: '',<br>		},<br>	],<br>},<br>``` |

### Step 4: Add the execute method [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-4-add-the-execute-method "Permanent link")

You've set up the node UI and basic information. It's time to map the node UI to API requests, and make the node actually do something.

The `execute` method runs every time the node runs. In this method, you have access to the input items and to the parameters that the user set in the UI, including the credentials.

Add the following the `execute` method in the `FriendGrid.node.ts`:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br>37<br>38<br>39<br>40<br>41<br>42<br>``` | ```<br>// Handle data coming from previous nodes<br>const items = this.getInputData();<br>let responseData;<br>const returnData = [];<br>const resource = this.getNodeParameter('resource', 0) as string;<br>const operation = this.getNodeParameter('operation', 0) as string;<br>// For each item, make an API call to create a contact<br>for (let i = 0; i < items.length; i++) {<br>	if (resource === 'contact') {<br>		if (operation === 'create') {<br>			// Get email input<br>			const email = this.getNodeParameter('email', i) as string;<br>			// Get additional fields input<br>			const additionalFields = this.getNodeParameter('additionalFields', i) as IDataObject;<br>			const data: IDataObject = {<br>				email,<br>			};<br>			Object.assign(data, additionalFields);<br>			// Make HTTP request according to https://sendgrid.com/docs/api-reference/<br>			const options: OptionsWithUri = {<br>				headers: {<br>					'Accept': 'application/json',<br>				},<br>				method: 'PUT',<br>				body: {<br>					contacts: [<br>						data,<br>					],<br>				},<br>				uri: `https://api.sendgrid.com/v3/marketing/contacts`,<br>				json: true,<br>			};<br>			responseData = await this.helpers.requestWithAuthentication.call(this, 'friendGridApi', options);<br>			returnData.push(responseData);<br>		}<br>	}<br>}<br>// Map data to n8n data structure<br>return [this.helpers.returnJsonArray(returnData)];<br>``` |

Note the following lines of this code:

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>5<br>6<br>7<br>``` | ```<br>const items = this.getInputData();<br>... <br>for (let i = 0; i < items.length; i++) {<br>	...<br>	const email = this.getNodeParameter('email', i) as string;<br>	...<br>}<br>``` |

Users can provide data in two ways:

- Entered directly in the node fields
- By mapping data from earlier nodes in the workflow

`getInputData()`, and the subsequent loop, allows the node to handle situations where data comes from a previous node. This includes supporting multiple inputs. This means that if, for example, the previous node outputs contact information for five people, your FriendGrid node can create five contacts.

### Step 5: Set up authentication [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-5-set-up-authentication "Permanent link")

The SendGrid API requires users to authenticate with an API key.

Add the following to `FriendGridApi.credentials.ts`

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>``` | ```<br>import {<br>	IAuthenticateGeneric,<br>	ICredentialTestRequest,<br>	ICredentialType,<br>	INodeProperties,<br>} from 'n8n-workflow';<br>export class FriendGridApi implements ICredentialType {<br>	name = 'friendGridApi';<br>	displayName = 'FriendGrid API';<br>	properties: INodeProperties[] = [<br>		{<br>			displayName: 'API Key',<br>			name: 'apiKey',<br>			type: 'string',<br>			default: '',<br>		},<br>	];<br>	authenticate: IAuthenticateGeneric = {<br>		type: 'generic',<br>		properties: {<br>			headers: {<br>				Authorization: '=Bearer {{$credentials.apiKey}}',<br>			},<br>		},<br>	};<br>	test: ICredentialTestRequest = {<br>		request: {<br>			baseURL: 'https://api.sendgrid.com/v3',<br>			url: '/marketing/contacts',<br>		},<br>	};<br>}<br>``` |

For more information about credentials files and options, refer to [Credentials file](https://docs.n8n.io/integrations/creating-nodes/build/reference/credentials-files/).

### Step 6: Add node metadata [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-6-add-node-metadata "Permanent link")

Metadata about your node goes in the JSON file at the root of your node. n8n refers to this as the codex file. In this example, the file is `FriendGrid.node.json`.

Add the following code to the JSON file:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>``` | ```<br>{<br>	"node": "n8n-nodes-base.FriendGrid",<br>	"nodeVersion": "1.0",<br>	"codexVersion": "1.0",<br>	"categories": [<br>		"Miscellaneous"<br>	],<br>	"resources": {<br>		"credentialDocumentation": [<br>			{<br>				"url": ""<br>			}<br>		],<br>		"primaryDocumentation": [<br>			{<br>				"url": ""<br>			}<br>		]<br>	}<br>}<br>``` |

For more information on these parameters, refer to [Node codex files](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-codex-files/).

### Step 7: Update the npm package details [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#step-7-update-the-npm-package-details "Permanent link")

Your npm package details are in the `package.json` at the root of the project. It's essential to include the `n8n` object with links to the credentials and base node file. Update this file to include the following information:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br>37<br>38<br>39<br>40<br>41<br>42<br>43<br>44<br>45<br>``` | ```<br>{<br>	// All node names must start with "n8n-nodes-"<br>	"name": "n8n-nodes-friendgrid",<br>	"version": "0.1.0",<br>	"description": "n8n node to create contacts in SendGrid",<br>	"keywords": [<br>		// This keyword is required for community nodes<br>		"n8n-community-node-package"<br>	],<br>	"license": "MIT",<br>	"homepage": "https://n8n.io",<br>	"author": {<br>		"name": "Test",<br>		"email": "test@example.com"<br>	},<br>	"repository": {<br>		"type": "git",<br>		// Change the git remote to your own repository<br>		// Add the new URL here<br>		"url": "git+<your-repo-url>"<br>	},<br>	"main": "index.js",<br>	"scripts": {<br>		// don't change<br>	},<br>	"files": [<br>		"dist"<br>	],<br>	// Link the credentials and node<br>	"n8n": {<br>		"n8nNodesApiVersion": 1,<br>		"credentials": [<br>			"dist/credentials/FriendGridApi.credentials.js"<br>		],<br>		"nodes": [<br>			"dist/nodes/FriendGrid/FriendGrid.node.js"<br>		]<br>	},<br>	"devDependencies": {<br>		// don't change<br>	},<br>	"peerDependencies": {<br>		// don't change<br>	}<br>}<br>``` |

You need to update the `package.json` to include your own information, such as your name and repository URL. For more information on npm `package.json` files, refer to [npm's package.json documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-json).

## Test your node [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#test-your-node "Permanent link")

You can test your node as you build it by running it in a local n8n instance.

1. Install n8n using npm:



|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>npm install n8n -g<br>``` |

2. When you are ready to test your node, publish it locally:



|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>``` | ```<br># In your node directory<br>npm run build<br>npm link<br>``` |

3. Install the node into your local n8n instance:




|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>``` | ```<br># In the nodes directory within your n8n installation<br># node-package-name is the name from the package.json<br>npm link <node-package-name><br>``` |







Check your directory



Make sure you run `npm link <node-name>` in the nodes directory within your n8n installation. This can be:



- `~/.n8n/custom/`
- `~/.n8n/<your-custom-name>`: if your n8n installation set a different name using `N8N_CUSTOM_EXTENSIONS`.

4. Start n8n:




|     |     |
| --- | --- |
| ```<br>1<br>``` | ```<br>n8n start<br>``` |

5. Open n8n in your browser. You should see your nodes when you search for them in the nodes panel.



Node names



Make sure you search using the node name, not the package name. For example, if your npm package name is `n8n-nodes-weather-nodes`, and the package contains nodes named `rain`, `sun`, `snow`, you should search for `rain`, not `weather-nodes`.


### Troubleshooting [\#](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/\#troubleshooting "Permanent link")

- There's no `custom` directory in `~/.n8n` local installation.

You have to create `custom` directory manually and run `npm init`

|     |     |
| --- | --- |
| ```<br>1<br>2<br>3<br>4<br>``` | ```<br># In ~/.n8n directory run<br>mkdir custom <br>cd custom <br>npm init<br>``` |