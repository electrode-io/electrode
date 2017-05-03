# Generate Docs

## Generating documentation

One of the final steps to creating a reusable component is writing the correct documentation, in the form of `component.json`

and `component.md`. The Electrode team has automated this step for you, using [Electrode-Docgen](https://github.com/electrode-io/electrode-docgen). This is a custom metadata extractor for the Electrode framework. The commands have been built into the tasks of

`<your-awesome-component>/gulpfile.js`:

    const tasks = {
      "demo": ["generate", "server-dev"],
      "demo-iso": ["dev-iso"],
      "generate": ["generate-metadata", "generate-documentation"],
      "generate-documentation": () => exec(`electrode-docgen --package ./package.json --src ./src --markdown components.md`),
      "generate-metadata": () => exec(`electrode-docgen --package ./package.json --src ./src --metadata components.json`),
      "prepublish": ["npm:prepublish"],
      "preversion": ["check-cov"]
    };

Simply run the commands below to auto generate the necessary docs:

To generate metadata:

```
$ gulp generate-metadata
```

To generate documentation:

```
$ gulp generate-documentation
```

Or, to run both simultaneously, you can just run:

```
$ gulp generate
```

Now that we've run our tests and they've passed, let's publish our component on npm so we can use it again. You will need to [sign up](https://www.npmjs.com/signup) for an account if you don't have one, and follow the steps in the [npm documentation](https://docs.npmjs.com/getting-started/creating-node-modules).

Let's continue to build more by creating our own [Hapi server plugin](/chapter1/intermediate/build-a-server-plugin.md), incorporating routes and adding some awesome CSS modules.

