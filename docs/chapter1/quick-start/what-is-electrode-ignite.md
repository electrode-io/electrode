# What is Electrode Ignite

Electrode Ignite is a CLI tool for development with OSS Electrode React/NodeJS Platform. It provides developers a list of tasks that can invoke functions on Electrode platform.


## Installation

If you have not done so yet, please check [Requirements](/overview/requirements.md) for setting up your development environment.

## Usage

#### Ignite Menu

If you are new to the Electrode Ignite, you can browsing the list of all available tasks by checking the menu:

```bash
$ ignite
```


The Ignite Menu will show as below:

![Electrode Ignite Menu](/images/ignite-menu.png)

You can specify the task by inputting the numbers based on the menu, and press enter to execute the task.


#### Single Ignite Task

Electrode Ignite can also invoke a single ignite task by specifying the task name.

For example, to install the tools for Electrode development:

```bash
$ ignite install
```

You can check the list of tasks by:

```bash
$ ignite help
```

And the help on usage will show as below:

![Electrode Ignite Help](/images/ignite-help.png)


## Available Ignite Tasks

```bash
install:             Install tools for Electrode development
check-nodejs:        Check your NodeJS and npm environment
generate-app:        Generate an Electrode application
generate-component:  Generate an Electrode component
add-component:       Add a component to your existing component repo
docs:                Electrode official documenation
help:                Show help on usage
```


Let's get start with Electrode App|Component by Electrode Ignite in the next few sections.
