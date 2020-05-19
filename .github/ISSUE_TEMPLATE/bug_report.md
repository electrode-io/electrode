---
name: Bug report
about: Create a report to help us improve
title: ""
labels: ""
assignees: ""
---

**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:

1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear and concise description of what you expected to happen.

**Screenshots**
If applicable, add screenshots to help explain your problem.

**Desktop (please complete the following information):**

<!--
Paste the results from the following command above:

npx envinfo --system --browsers --binaries --markdown


Example report:

## System:
 - OS: macOS 10.15.3
 - CPU: (4) x64 Intel(R) Core(TM) i5-7360U CPU @ 2.30GHz
 - Memory: 313.13 MB / 8.00 GB
 - Shell: 3.2.57 - /bin/bash
## Binaries:
 - Node: 10.15.0 - ~/.nvm/versions/node/v10.15.0/bin/node
 - Yarn: 1.12.3 - /usr/local/bin/yarn
 - npm: 6.4.1 - ~/.nvm/versions/node/v10.15.0/bin/npm
## Browsers:
 - Chrome: ...
-->

**Electrode Version**

- Are you using `electrode-archetype-react-app` or `@xarc/app`? What is its version?
- Are you using subapp or the legacy redux-router-engine? Please provide versions of the following npm package if you use them:
  - `subapp-react`
  - `subapp-pbundle`
  - `electrode-redux-router-engine`

To find the versions of the npm packages, please use `npm ls`.

Please run `npm ls subapp-react subapp-pbundle electrode-archetype-react-app @xarc/app electrode-redux-router-engine` and paste the output:

```
# paste npm ls output here
```

**Framework Version**

- Which of the following are you using? Please provide versions:
  - React
  - Preact
  - Redux
  - Redux-router

Please run `npm ls react react-dom redux react-router preact` and paste the output:

```
# paste npm ls output here
```

**Additional context**
Add any other context about the problem here.
