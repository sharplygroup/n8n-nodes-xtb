# Install private nodes [\#](https://docs.n8n.io/integrations/creating-nodes/deploy/install-private-nodes/\#install-private-nodes "Permanent link")

You can build your own nodes and install them in your n8n instance without publishing them on npm. This is useful for nodes that you create for internal use only at your company.

## Install your node in a Docker n8n instance [\#](https://docs.n8n.io/integrations/creating-nodes/deploy/install-private-nodes/\#install-your-node-in-a-docker-n8n-instance "Permanent link")

If you're running n8n using Docker, you need to create a Docker image with the node installed in n8n.

1. Create a Dockerfile and paste the code from [this Dockerfile](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/Dockerfile).

Your Dockerfile should look like this:


```<br>FROM node:16-alpine<br>ARG N8N_VERSION<br>RUN if [ -z "$N8N_VERSION" ] ; then echo "The N8N_VERSION argument is missing!" ; exit 1; fi<br># Update everything and install needed dependencies<br>RUN apk add --update graphicsmagick tzdata git tini su-exec<br># Set a custom user to not have n8n run as root<br>USER root<br># Install n8n and the packages it needs to build it correctly.<br>RUN apk --update add --virtual build-dependencies python3 build-base ca-certificates && \<br>	npm config set python "$(which python3)" && \<br>	npm_config_user=root npm install -g full-icu n8n@${N8N_VERSION} && \<br>	apk del build-dependencies \<br>	&& rm -rf /root /tmp/* /var/cache/apk/* && mkdir /root;<br># Install fonts<br>RUN apk --no-cache add --virtual fonts msttcorefonts-installer fontconfig && \<br>	update-ms-fonts && \<br>	fc-cache -f && \<br>	apk del fonts && \<br>	find  /usr/share/fonts/truetype/msttcorefonts/ -type l -exec unlink {} \; \<br>	&& rm -rf /root /tmp/* /var/cache/apk/* && mkdir /root<br>ENV NODE_ICU_DATA /usr/local/lib/node_modules/full-icu<br>WORKDIR /data<br>COPY docker-entrypoint.sh /docker-entrypoint.sh<br>ENTRYPOINT ["tini", "--", "/docker-entrypoint.sh"]<br>EXPOSE 5678/tcp<br>```

2. Compile your custom node code ( `npm run build` if you are using nodes starter). Copy the **node** and **credential** folders from within the **dist** folder into your container's `~/.n8n/custom/` directory. This makes them available to Docker.

3. Download the [docker-entrypoint.sh](https://github.com/n8n-io/n8n/blob/master/docker/images/n8n/docker-entrypoint.sh) file, and place it in the same directory as your Dockerfile.

4. Build your Docker image:


```<br># Replace <n8n-version-number> with the n8n release version number. <br># For example, N8N_VERSION=0.177.0<br>docker build --build-arg N8N_VERSION=<n8n-version-number> --tag=customizedn8n .<br>```


You can now use your node in Docker.

## Install your node in a global n8n instance [\#](https://docs.n8n.io/integrations/creating-nodes/deploy/install-private-nodes/\#install-your-node-in-a-global-n8n-instance "Permanent link")

If you've installed n8n globally, make sure that you install your node inside n8n. n8n will find the module and load it automatically.