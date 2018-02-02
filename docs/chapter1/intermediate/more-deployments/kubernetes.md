# Kubernetes

#### Deploy with Google's Kubernetes

[Kubernetes](http://kubernetes.io/docs/user-guide/kubectl-overview/) is an open-source system for automating deployment, scaling, and management of containerized applications. It was developed by Google to handle the ops demand for an enterprise organization with the flexibility to run an infrastructure at any size.

To start, make sure you already have a [Google Account](https://accounts.google.com/SignUp). Sign in to the [Google Cloud Platform](https://console.cloud.google.com/home/dashboard?project=gentle-waters-127300&pli=1) and also sign up for a free trial on [Google Container Registry](https://cloud.google.com/container-registry/) and create a new project. Remember your project ID and use it on your command line:

```bash
$ export PROJECT_ID="your-project-id"
```

Install the [Google Cloud SDK](https://cloud.google.com/sdk/). Next, run the following command to install [Kubernetes](http://kubernetes.io/docs/user-guide/kubectl-overview/):

```bash
$ gcloud components install kubectl
```

We will use your [Docker image](/chapter1/intermediate/more-deployments/docker.md) from the "Deploy with Docker" section. Navigate to the docker `app` folder and update the Dockerfile to the following:

```bash
FROM node:4.5
RUN npm i -g npm@3
EXPOSE 3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install
RUN /usr/src/app/node_modules/.bin/clap build
CMD node server
```

Let's test out your image with Docker. Run the command below:

```bash
$ docker run -d -p 3000:3000 docker-awesome-container
```

Visit your app in the browser at `http://localhost:3000`. You can stop running the container by using the command below:

```bash
$ docker stop docker-awesome-container
```

We can now push the image to the [Google Container Registry](https://cloud.google.com/container-registry/). Your Docker images will be stored in a private repo that is accessible from every Google Cloud project as well as from outside the Google Cloud Platform.

```bash
$ gcloud docker push gcr.io/$PROJECT_ID/docker-awesome-container:v1
```

You can explore other [Kubernetes capabilities](http://kubernetes.io/docs/hellonode/) and dig deeper in the extensive [reference documentation](http://kubernetes.io/docs/reference/).
