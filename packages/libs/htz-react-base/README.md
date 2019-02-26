# htz-react-base

Encapsulated development scripts and dependencies for building React apps and
components.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Installation](#installation)
- [Usage](#usage)
- [Commands](#commands)
  - [build](#build)
  - [clean](#clean)
  - [commitizen](#commitizen)
  - [distFlowTypes](#distFlowTypes)
  - [flow](#flow)
  - [format](#format)
  - [lint](#lint)
  - [styleguide](#styleguide)
  - [styleguide:build](#styleguidebuild)
  - [test](#test)
  - [update-scripts](#update-scripts)
- [Development](#development)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

This module should be installed in `devDependencies`:

```console
$ yarn add -D @haaretz/htz-react-base
```

## Usage

Installing `htz-react-base` will make an `htz-scripts` executable available to
the consuming package, which can be run like so:

```console
$ ./node_modules/.bin/htz-scripts <command>
```

However, for ease of use, it is recommended to add scripts mirroring the
available `htz-scripts` commands to the `scripts` field of your `package.json`
file. Scripts run this way will automatically have `htz-scripts` in their
`$PATH`.

A helper command is provided to do this for you. Run this once (or when
`htz-react-base` is updated with new scripts), and you will henceforth be able
to use `yarn run <command>` or `npm run <command>` instead of running `htz-scripts`
directly:

```console
$ ./node_modules/.bin/htz-scripts update-scripts
```

Some commands accept arguments, which should be passed after the command name.
Note that if running via Yarn or npm `scripts`, you will need to add `--`
after the script name to add arguments, for example:

```console
$ yarn run test -- --verbose
```
## Base Configs

### Babel

This package contains a babel present for internal use at @haaretz.

packages using it should have a `.babelrc.js` file at their root with, in
the most basic usecase:

```js
module.exports = {
  presets: ["@haaretz/htz-react-base/babel.js"],
}
```

plugins and presets can be added to individual packages as required.

### Next Config (including webpack)

The basic next configuration have been modularized and moved to
htz-react-base/base-next-config. The entire base config can be imported 
with `require('@haaretz/htz-react-base/base-next-config`.
Additionaly, the config's different parts can be imported with
`require('@haaretz/htz-react-base/base-next-config/<sub-module>`.


## Commands

### build

Build production distributable files. For apps, this will involve running the
[Next.js](https://github.com/zeit/next.js) build process. For libraries, this
will usually involve running Babel and/or webpack.

### clean

Remove built distribution files and the Jest cache directory.

### commitizen

Run commitizen to assist with writing standard-conferment commit messages.

### distFlowTypes

Copies the `src/index.js` file `index.js.flow` in the package root, so that
Flow typings are available for package consumers.

### flow
Run the [Flow](flow.org/) typechecker. Initializes the package to use flow if
not already initialized. For only initializing the package without running any 
checks, run with the `--no-run` flag

### format

Format code in the current directory with [Prettier](https://prettier.io/).
You should do this before opening any pull request that contains code, for
consistency.

### lint

Lint code in the current directory with [ESLint](https://eslint.org/). See
[eslint.js](eslint.js) for the default rules.

### styleguide

Run the styleguide development server, which renders previews and documentation
for components found in the package.

### styleguide:build

Build a production-ready page rendering the component styleguide for the module.
The output will be written to `dist/styleguide`.

### test

Run the package’s test suite with [Jest](https://facebook.github.io/jest/).

### update-scripts

Update the `scripts` field in `package.json` to contain aliases for `htz-scripts`
commands. Use `--no-overwrite` to avoid clobbering any existing scripts with the
same name.

## Development

Before opening a pull request for this package, make sure to run the `lint`,
`format`, and `test` scripts as necessary.

To add scripts to this module, place them in [/scripts](/scripts). The command
will be mapped to a file of the same name. Commands namespaced with a `:`
character are mapped to subdirectories. For example:

| Command | File                                       |
|---------|--------------------------------------------|
| foo     | `scripts/foo.js` or `scripts/foo/index.js` |
| foo:bar | `scripts/foo/bar.js`                       |
