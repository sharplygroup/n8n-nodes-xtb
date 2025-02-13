# Declarative-style parameters [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/declarative-style-parameters/\#declarative-style-parameters "Permanent link")

These are the parameters available for [node base file](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/) of declarative-style nodes.

This document gives short code snippets to help understand the code structure and concepts. For a full walk-through of building a node, including real-world code examples, refer to [Build a declarative-style node](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/).

Refer to [Standard parameters](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/standard-parameters/) for parameters available to all nodes.

## `methods` and `loadOptions` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/declarative-style-parameters/\#methods-and-loadoptions "Permanent link")

_Object_ \| _Optional_

`methods` contains the `loadOptions` object. You can use `loadOptions` to query the service to get user-specific settings, then return them and render them in the GUI so the user can include them in subsequent queries. The object must include routing information for how to query the service, and output settings that define how to handle the returned options. For example:

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>32<br>33<br>34<br>35<br>36<br>``` | ```<br>methods : {<br>	loadOptions: {<br>		routing: {<br>			request: {<br>				url: '/webhook/example-option-parameters',<br>				method: 'GET',<br>			},<br>			output: {<br>				postReceive: [<br>					{<br>						// When the returned data is nested under another property<br>						// Specify that property key<br>						type: 'rootProperty',<br>						properties: {<br>							property: 'responseData',<br>						},<br>					},<br>					{<br>						type: 'setKeyValue',<br>						properties: {<br>							name: '={{$responseItem.key}} ({{$responseItem.value}})',<br>							value: '={{$responseItem.value}}',<br>						},<br>					},<br>					{<br>						// If incoming data is an array of objects, sort alphabetically by key<br>						type: 'sort',<br>						properties: {<br>							key: 'name',<br>						},<br>					},<br>				],<br>			},<br>		},<br>	}<br>},<br>``` |

## `routing` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/declarative-style-parameters/\#routing "Permanent link")

_Object_ \| _Required_

`routing` is an object used within an `options` array in operations and input field objects. It contains the details of an API call.

The code example below comes from the [Declarative-style tutorial](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/). It sets up an integration with a NASA API. It shows how to use `requestDefaults` to set up the basic API call details, and `routing` to add information for each operation.

|     |     |
| --- | --- |
| ```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>21<br>22<br>23<br>24<br>25<br>26<br>27<br>28<br>29<br>30<br>31<br>``` | ```<br>description: INodeTypeDescription = {<br>  // Other node info here<br>  requestDefaults: {<br>			baseURL: 'https://api.nasa.gov',<br>			url: '',<br>			headers: {<br>				Accept: 'application/json',<br>				'Content-Type': 'application/json',<br>			},<br>		},<br>    properties: [<br>      // Resources here<br>      {<br>        displayName: 'Operation'<br>        // Other operation details<br>        options: [<br>          {<br>            name: 'Get'<br>            value: 'get',<br>            description: '',<br>            routing: {<br>              request: {<br>                method: 'GET',<br>                url: '/planetary/apod'<br>              }<br>            }<br>          }<br>        ]<br>      }<br>    ]<br>}<br>``` |

## `version` [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/declarative-style-parameters/\#version "Permanent link")

_Number_ or _Array_ \| _Optional_

If you have one version of your node, this can be a number. If you want to support more than one version, turn this into an array, containing numbers for each node version.

n8n supports two methods of node versioning, but declarative-style nodes must use the light versioning approach. Refer to [Node versioning](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/) for more information.