# What are Archetypes?

> Archetypes are npm modules that contain the _typical standard stuff_ you would have to add to every new project you create.  They encapsulate boilerplates for centralizing your project configurations, workflows, and dependencies.

Unlike a generator which copies the _typical standard stuff_ into your project, archetypes keep those as part of your project's dependencies, so any updates, fixes, new additions can be acquired by simply updating your dependencies on the archetypes.

> Archetypes help to solve the problem of updating module boilerplates, by providing a single source of truth, that all of your projects consume.

For example, after developing hundreds of modules such as React components, if you change your build script, you can change it once in the archetype, and then all projects can update their archetype dependency and get the new build script.

Electrode archetypes are a way for every electrode module to share common scripts, workflows, dependencies and best practices that can be updated in real time.

> Electrode offers these archetypes for different types of projects:
>
> -   [electrode-archetype-react-app](https://github.com/electrode-io/electrode#app-archetype): For Universal NodeJS & ReactJS Apps.
>
> -   [electrode-archetype-react-component](https://github.com/electrode-io/electrode/tree/master/packages/electrode-archetype-react-component): For ReactJS component modules.
>
> -   [electrode-archetype-njs-module-dev](https://github.com/electrode-io/electrode-archetype-njs-module-dev): For NodeJS modules.

These archetypes offer rich feature sets that make developing powerful applications with NodeJS and ReactJS simple and easy, allowing you to focus on what matters to you.  To explore the features they offer, continue reading this Gitbook.
