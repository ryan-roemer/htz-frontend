# htz-frontend
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Packages](#packages)
- [Documentation](#documentation)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Setup](#setup)
- [Authoring Packages](#authoring-packages)
  - [Adding and removing npm dependencies](#adding-and-removing-npm-dependencies)
  - [Lifecycle scripts](#lifecycle-scripts)
- [Scripts](#scripts)
  - [bootstrap](#bootstrap)
  - [clean](#clean)
  - [create-package](#create-package)
  - [docs](#docs)
  - [flow](#flow)
  - [format](#format)
  - [gc (git commit)](#gc-git-commit)
  - [lerna-do](#lerna-do)
  - [lint](#lint)
  - [sync](#sync)
  - [test](#test)
  - [update](#update)
  - [update-packages-scripts](#update-packages-scripts)
- [Git Workflow and Hooks](#git-workflow-and-hooks)
- [Developer Tools](#developer-tools)
  - [React Developer Tools](#react-developer-tools)
  - [Apollo Client Developer Tools](#apollo-client-developer-tools)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## Packages

These packages are managed with [Lerna](https://lernajs.io/) and organized like so:

* [Apps](packages/apps) – React-powered sites.
  * [haaretz.co.il](packages/apps/haaretz.co.il) – Site app for the Hebrew edition of Haaretz.
* [Components](packages/components) – Collections of React components.
  * [htz-components](packages/components/htz-components) – Components and other shared parts.
  * [htz-theme](packages/components/htz-theme) – A theme for (Hebrew) Haaretz branded apps.
* [Libraries](packages/libs) – Helpers, utilities, and any other shared code.
  * [htz-css-tools](packages/libs/htz-css-tools) – A css utility belt for styling Haaretz apps.
  * [htz-react-base](packages/libs/htz-react-base) – Development helpers.
  * [htz-react-server](packages/libs/htz-react-server) – Application server.

## Documentation

* For help with individual packages, use the links to those packages above.
* For general documentation, see [docs/README.md](docs/README.md).


## Getting Started

### Requirements

* [Node.js](https://nodejs.org/) 8.0.0 or higher.
* [Yarn](https://yarnpkg.com/en/docs/install) 1.0.0 or higher.

### Setup

Clone this repo:

```console
$ git clone git@github.com:Haaretz/htz-frontend.git
$ cd htz-frontend
```

Use [Yarn](https://yarnpkg.com/) to install Lerna and other dependencies:

```console
$ yarn
```

Now use Lerna to set up the managed packages:

```console
$ yarn run bootstrap
```

Interdependent packages managed in the same monorepo will be symlinked.

Then work on whichever package(s) you like:

```console
$ cd packages/components/htz-components
$ yarn run styleguide
```


## Authoring Packages

### Adding and removing npm dependencies

Thanks to Yarn Workspaces and Lerna, adding (installing) and removing (uninstalling) 
npm dependencies inside each of our different packages Just Works™, taking care 
of hoisting and managing common dependencies.

### Lifecycle scripts

If your package is consumed as a dependency, it should include the standard
lifecycle script `prepare` to perform any necessary build tasks. This will
often look like (in `package.json`):

```json
  "scripts": {
    "prepare": "npm run build"
  }
```

* In lifecycle scripts, you should run tasks with `npm`, because anyone might
  be installing it from the public npm registry, and they don’t necessarily have
  Yarn installed.
* Apps usually don’t need to be built in a lifecycle script, because they are not
  consumed as dependencies. Instead, they should be built upon deployment.


## Scripts

These are found in the root [package.json](package.json) and may be run with
`yarn run <script>` or `npm run <script>`. If you are looking for the individual
package scripts provided by `htz-react-base`, [see its README](packages/libs/htz-react-base).

### bootstrap

Run `clean`, then install the dependencies for each package, and symlink any
package found in the `packages` directory if the dependency version matches.

### clean

Remove the `node_modules` directory, built distribution files, and Jest cache
directory for each package.

### create-package

Create an new package and initialize it based on user passable options.

When executed, the script will prompt for options and build the customized package 
based on aswers provided.
It takes two optional argument: `package-name` and `package-`description, 
which will set defaults in the prompt (you will still be able to override them).

**example:**
```bash
yarn create-package ['my-new-package' ['A description of what the package does']]
```

### docs

Add or update the *Table of Contents* section in any Markdown file with section
headings. For best results, move the primary document heading and description
to just before the generated table of contents:

```markdown
# Document Title

Brief description.

<!-- START doctoc -->
...
```

### flow
Type-check all packages with flow. Initialize uninitialized packages.

### format

Format files with `prettier` and `eslint --fix` using the [format](packages/libs/htz-react-base#format)
script from `@haaretz/htz-react-base`.

`yarn run format:self` will only format files in the root directory
`yarn run format:packages` will run the `format` script in every package.
`yarn run format` will run both.

### gc (git commit)
Commit staged files using a Commitizen wizard to ensure compliance with the repository's mandatory
[git workflow](docs/GitWorkflow.md).

### lerna-do

Run a helpful wizard for assistance with running `lerna` commands

### lint

Lint files in the root package, then run the [lint](packages/libs/htz-react-base#lint)
script in every package.

Lint files with `eslint` using the [lint](packages/libs/htz-react-base#format)
script from `@haaretz/htz-react-base`.

`yarn run lint:self` will only lint files in the root directory
`yarn run lint:packages` will run the `lint` script in every package.
`yarn run lint` will run both.

### sync

Set the dependency versions for each matching package based on the `syncDependencies`
field of [package.json](package.json), in order to make across-the-board upgrades.

Arguments will be passed to `lerna bootstrap`, which allows, e.g., to `--scope` or 
`--exclude` packages.

### test

Will run tests in all packages.

### update

Like `bootstrap`, but doesn’t `clean` first.

### update-packages-scripts

Sync the `scripts` property in each package with the latest version of `htz-scripts`


## Git Workflow and Hooks

See [docs](docs/GitWorkflow.md).


## Developer Tools

### [React Developer Tools](https://github.com/facebook/react-devtools)

Environments: [Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi), [Firefox](https://addons.mozilla.org/firefox/addon/react-devtools/)

A panel for inspecting the React component tree.

### [Apollo Client Developer Tools](https://github.com/apollographql/apollo-client-devtools)

Environments: [Chrome](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm)

A panel for inspecting GraphQL queries and the store.
