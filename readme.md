# Monorepo Import Structure Exploration

This is a monorepo project that explores the import structure when using ECMAScript modules (ESM) and CommonJS modules
in a monorepo setup. The project aims to understand if it is possible to have imports
like `import { LocationClient } from "@test/clients/locations";` instead of importing from the package root.

## Context

In ECMAScript modules (ESM), available package entry points are described in the `package.json` file's `exports`
field (https://nodejs.org/docs/latest-v20.x/api/packages.html#package-entry-points). This allows for more granular
control over the import structure.

However, in CommonJS modules, entry points are folder-based, meaning that if we're importing
from `@test/clients/locations`, there should be a `locations` folder inside the package
root (https://nodejs.org/docs/latest-v20.x/api/modules.html#folders-as-modules).

The `exports` field is also supported in CommonJS, but IntelliSense may not resolve it properly, suggesting paths
like `@test/clients/dist/locations` instead of `@test/clients/locations`. This issue is described
here: https://youtrack.jetbrains.com/issue/WEB-65773/Import-subpath-module-function-does-not-work-properly

## Considered Options

#### 1. Use import ECMAScript module to CommonJS module

This can't be done as we get Typescript TS1479 error.

#### 2. Use both ECMAScript modules with package.json `exports` field

It works, but we have an issue with IntelliSense, as mentioned above.

#### 3. Use both CommonJS modules with package.json `exports` field

It works, but we have an issue with IntelliSense, as mentioned above.

#### 4. Use both CommonJS modules and instead of `exports` field, use a single entry point by providing the `main` field and use folder-based imports

Since we are building packages inside a monorepo, this approach is not very suitable because after the package is built,
all files go to the `dist` folder instead of the root folder. That's why if we use folder-based imports, we will have to
always add `/dist` to the path like `@test/clients/dist/locations`.

#### 5. Use both CommonJS modules and instead of `exports` field, use a single entry point by providing the `main` field and use all imports from the root like `@test/clients`

It works, but by doing this, we are abandoning our idea of having more scoped imports inside a single package.

## Result

Taking into account the IntelliSense issue mentioned above, the project may need to revert to the
traditional `package.json` approach with `{"main": "./dist/index.js"}`.