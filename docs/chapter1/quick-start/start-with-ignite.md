# Getting Started with Electrode Ignite

Electrode is a platform that involves many elements and environments. To ensure you have everything working together, an npm module called [electrode-ignite] is available with a CLI command that's the single entry point to help you start development with the Electrode platform.

## Reminder for Walmart Developers

If you are a developers working for Walmart and you are looking to develop your web application using Electrode, then please be aware that the Open Source Electrode doesn't contain anything for WML proprietary requirements.

We have WML internal generators and ignite that will create applications specifically for running in WML infrastructure. Please keep that in mind when you are ready to start your WML internal application.

You can still use all the open source resource to learn and test since internal application also use most of the open source Electrode modules.

## Installation

> Before proceeding, be sure to verify the [Requirements](/overview/requirements.md) for setting up your development environment.

## Usage

You can use [electrode-ignite] with an interactive menu by running `ignite`, or you can run it with the command name directly.

To see a list of the commands available, run `ignite --help`

#### Ignite Menu

To see the interactive menu, run:

```bash
$ ignite
```

The Ignite Menu is shown below:

![Electrode Ignite Menu](/images/ignite-menu.png)

#### Single Ignite Task

Electrode Ignite can also be invoked with a single command by specifying the name.

For example, to check your NodeJS and npm version for Electrode development:

```bash
$ ignite check-nodejs
```

To generate a new Electrode React App:

```bash
$ ignite generate-app
```

To check the list of commands:

```bash
$ ignite --help
```

For example:

![Electrode Ignite Help](/images/ignite-help.png)

## Available Ignite Tasks

- `check-nodejs` - Check your NodeJS and npm environment.
- `generate-app` - Generate an Electrode application.
- `generate-component` - Generate an Electrode component.
- `add-component` - Add a component to your existing component repo.
- `docs` - Electrode official documentation.
- `help` - Show help on usage.

Let's get started with Electrode App and Electrode Component by using Electrode Ignite in the next few sections.

[electrode-ignite]: https://www.npmjs.com/package/electrode-ignite
