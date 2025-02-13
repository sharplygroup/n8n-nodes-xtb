# Programmatic-style parameters [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-parameters/\#programmatic-style-parameters "Permanent link")

These are the parameters available for [node base file](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/) of programmatic-style nodes.

This document gives short code snippets to help understand the code structure and concepts. For a full walk-through of building a node, including real-world code examples, refer to [Build a programmatic-style node](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/).

Programmatic-style nodes also use the `execute()` method. Refer to [Programmatic-style execute method](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-execute-method/) for more information.

Refer to [Standard parameters](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/standard-parameters/) for parameters available to all nodes.

## `defaultVersion` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-parameters/\#defaultversion "Permanent link")

_Number_ \| _Optional_

Use `defaultVersion` when using the full versioning approach.

n8n support two methods of node versioning. Refer to [Node versioning](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/) for more information.

## `methods` and `loadOptions` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-parameters/\#methods-and-loadoptions "Permanent link")

_Object_ \| _Optional_

Contains the `loadOptions` method for programmatic-style nodes. You can use this method to query the service to get user-specific settings (such as getting a user's email labels from Gmail), then return them and render them in the GUI so the user can include them in subsequent queries.

For example, n8n's [Gmail node](https://github.com/n8n-io/n8n/blob/master/packages/nodes-base/nodes/Google/Gmail/Gmail.node.ts) uses `loadOptions` to get all email labels:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>``` | ```<br>	methods = {<br>		loadOptions: {<br>			// Get all the labels and display them<br>			async getLabels(<br>				this: ILoadOptionsFunctions,<br>			): Promise<INodePropertyOptions[]> {<br>				const returnData: INodePropertyOptions[] = [];<br>				const labels = await googleApiRequestAllItems.call(<br>					this,<br>					'labels',<br>					'GET',<br>					'/gmail/v1/users/me/labels',<br>				);<br>				for (const label of labels) {<br>					const labelName = label.name;<br>					const labelId = label.id;<br>					returnData.push({<br>						name: labelName,<br>						value: labelId,<br>					});<br>				}<br>				return returnData;<br>			},<br>		},<br>	};<br>``` |

## `version` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-parameters/\#version "Permanent link")

_Number_ or _Array_ \| _Optional_

Use `version` when using the light versioning approach.

If you have one version of your node, this can be a number. If you want to support multiple versions, turn this into an array, containing numbers for each node version.

n8n support two methods of node versioning. Programmatic-style nodes can use either. Refer to [Node versioning](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/) for more information.