# Node base file [\#](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/\#node-base-file "Permanent link")

The node base file contains the core code of your node. All nodes must have a base file. The contents of this file are different depending on whether you're building a declarative-style or programmatic-style node. For guidance on which style to use, refer to [Choose your node building approach](https://docs.n8n.io/integrations/creating-nodes/plan/choose-node-method/).

These documents give short code snippets to help understand the code structure and concepts. For full walk-throughs of building a node, including real-world code examples, refer to [Build a declarative-style node](https://docs.n8n.io/integrations/creating-nodes/build/declarative-style-node/) or [Build a programmatic-style node](https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/).

You can also explore the [n8n-nodes-starter](https://github.com/n8n-io/n8n-nodes-starter) and n8n's own [nodes](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes) for a wider range of examples. The starter contains basic examples that you can build on. The n8n [Mattermost node](https://github.com/n8n-io/n8n/tree/master/packages/nodes-base/nodes/Mattermost) is a good example of a more complex programmatic-style node, including versioning.

For all nodes, refer to the:

- [Structure of the node base file](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/structure/)
- [Standard parameters](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/standard-parameters/)

For declarative-style nodes, refer to the:

- [Declarative-style parameters](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/declarative-style-parameters/)

For programmatic-style nodes, refer to the:

- [Programmatic-style parameters](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-parameters/)
- [Programmatic-style execute() method](https://docs.n8n.io/integrations/creating-nodes/build/reference/node-base-files/programmatic-style-execute-method/)