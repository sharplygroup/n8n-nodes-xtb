# Node versioning [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/\#node-versioning "Permanent link")

n8n supports node versioning. You can make changes to existing nodes without breaking the existing behavior by introducing a new version.

Be aware of how n8n decides which node version to load:

- If a user builds and saves a workflow using version 1, n8n continues to use version 1 in that workflow, even if you create and publish a version 2 of the node.
- When a user creates a new workflow and browses for nodes, n8n always loads the latest version of the node.

Versioning type restricted by node style

If you build a node using the declarative style, you can't use full versioning.

## Light versioning [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/\#light-versioning "Permanent link")

This is available for all node types.

One node can contain more than one version, allowing small version increments without code duplication. To use this feature:

1. Change the main `version` parameter to an array, and add your version numbers, including your existing version.
2. You can then access the version parameter with `@version` in your `displayOptions` in any object (to control which versions n8n displays the object with). You can also query the version from a function using `const nodeVersion = this.getNode().typeVersion;`.

As an example, say you want to add versioning to the NasaPics node from the [Declarative node tutorial](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/), then configure a resource so that n8n only displays it in version 2 of the node. In your base `NasaPics.node.ts` file:

```<br> 1<br> 2<br> 3<br> 4<br> 5<br> 6<br> 7<br> 8<br> 9<br>10<br>11<br>12<br>13<br>14<br>15<br>16<br>17<br>18<br>19<br>20<br>``` | ```<br>{<br>    displayName: 'NASA Pics',<br>    name: 'NasaPics',<br>    icon: 'file:nasapics.svg',<br>    // List the available versions<br>    version: [1,2,3],<br>    // More basic parameters here<br>    properties: [<br>        // Add a resource that's only displayed for version2<br>        {<br>            displayName: 'Resource name',<br>            // More resource parameters<br>            displayOptions: {<br>                show: {<br>                    '@version': 2,<br>                },<br>            },<br>        },<br>    ],<br>}<br>```

## Full versioning [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-versioning/\#full-versioning "Permanent link")

This isn't available for declarative-style nodes.

As an example, refer to the [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost).

Full versioning summary:

- The base node file should extend `NodeVersionedType` instead of `INodeType`.
- The base node file should contain a description including the `defaultVersion` (usually the latest), other basic node metadata such as name, and a list of versions. It shouldn't contain any node functionality.
- n8n recommends using `v1`, `v2`, and so on, for version folder names.