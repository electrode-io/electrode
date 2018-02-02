# Docker

### Deploy with Docker

Docker is a new container-based technology designed to make applications easier to create, deploy and run. It's an increasingly popular way to accelerate development and share content. To get started, sign up for [Docker](https://cloud.docker.com/), download [Docker for your machine](https://www.docker.com/products/docker) and read through the corresponding System Requirements. Docker is available for all major operating systems. See the corresponding "Get Started Tutorial" for your OS version on the Docker product page.

Let's check the versions of `Docker Engine`, `Compose` and `Machine` by running the commands below:

```
$ docker --version

$ docker-compose --version

$ docker-machine --version
```

Verify your installation by running the Docker version of "Hello World":

```
$ docker run hello-world
```

To show all the containers on the system, run the following command:

```
$ docker ps -a
```

**Electrode has a **[**Dockerfile and Docker image**](https://hub.docker.com/r/electrode/electrode-io/) **built in to expedite deployment. Simply:**

```
$ docker pull electrode/electrode-io
```

Try the image in your docker container:

```
$ docker run -d -p 3000:3000 electrode/electrode-io
```

You'll see your `<container_id>` in the terminal.

Verify that the server is running by opening `localhost:3000` in your browser.

Copy the code from the container to your local machine for development:

```
$ docker cp <container_id>:/usr/src/app .
```

Go to the app folder, and use the following command to stop the container so you can start your development:

```
$ docker stop <container_id>
```

Now let's build a new image by entering the following command:

```
$ docker build -t docker-awesome-container .
```

Run the command below to see a list of the images you currently have:

```
$ docker images
```

You'll see `node` listed. Find the corresponding `IMAGE ID`  for your `node`  image. We will now build a command to properly tag the image. It'll be using your `image id` + `account name/repo-name:latest`

```
$ docker tag your-image-id-# your-account-name/docker-awesome-container:latest
```

Let's see it! Run the `images` command below to see a lit of the images you currently have:

```
$ docker images
```

Run your image on your local container:

```
$ docker run -d -p 3000:3000 docker-awesome-container
```

Open `localhost:3000` in your browser to see your app.

Your container ID will print in the terminal, or you can run the command below to see your containers:

```
$ docker ps
```

Now you can stop the container:

```
$ docker stop <container_id>
```

Log into Docker Hub from the command line. The format is below. Enter your password when prompted:

```
$ docker login --username=yourhubusername --email=youremail@company.com
```

Run the `push` command to push your image to your new repository:

```
$ docker push your-username/docker-awesome-container
```

You have successfully pushed your new image to the Docker Cloud repository!

See the [User Guide](https://docs.docker.com/engine/userguide/intro/) to run your own containers and build Docker images.
