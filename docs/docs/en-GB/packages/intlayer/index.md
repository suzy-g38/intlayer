---
createdAt: 2024-08-11
updatedAt: 2025-06-29
title: Package Documentation | intlayer
description: See how to use the intlayer package
keywords:
  - Intlayer
  - intlayer
  - Internationalisation
  - Documentation
  - Next.js
  - JavaScript
  - React
slugs:
  - doc
  - packages
  - intlayer
---

# intlayer: NPM Package to Manage Multilingual Dictionary (i18n)

**Intlayer** is a suite of packages designed specifically for JavaScript developers. It is compatible with frameworks like React, Next.js, and Express.js.

**The `intlayer` package** allows you to declare your content anywhere in your code. It converts multilingual content declarations into structured dictionaries that integrate seamlessly into your application. With TypeScript, **Intlayer** enhances your development by providing stronger, more efficient tools.

## Why integrate Intlayer?

- **JavaScript-Powered Content Management**: Harness the flexibility of JavaScript to define and manage your content efficiently.
- **Type-Safe Environment**: Utilise TypeScript to ensure all your content definitions are precise and error-free.
- **Integrated Content Files**: Keep your translations close to their respective components, enhancing maintainability and clarity.

## Installation

Install the necessary package using your preferred package manager:

```bash packageManager="npm"
npm install intlayer
```

```bash packageManager="pnpm"
pnpm add intlayer
```

```bash packageManager="yarn"
yarn add intlayer
```

### Configure Intlayer

Intlayer provides a configuration file to set up your project. Place this file in the root of your project.

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  internationalization: {
    locales: [Locales.ENGLISH, Locales.FRENCH, Locales.SPANISH],
    defaultLocale: Locales.ENGLISH,
  },
};

module.exports = config;
```

> For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

## Example of use

With Intlayer, you can declare your content in a structured way anywhere in your codebase.

By default, Intlayer scans for files with the extension `.content.{json,ts,tsx,js,jsx,mjs,mjx,cjs,cjx}`.

> You can modify the default extension by setting the `contentDir` property in the [configuration file](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

```bash codeFormat="typescript"
.
├── intlayer.config.ts
└── src
    ├── ClientComponent
    │   ├── index.content.ts
    │   └── index.tsx
    └── ServerComponent
        ├── index.content.ts
        └── index.tsx
```

```bash codeFormat="esm"
.
├── intlayer.config.mjs
└── src
    ├── ClientComponent
    │   ├── index.content.mjs
    │   └── index.mjx
    └── ServerComponent
        ├── index.content.mjs
        └── index.mjx
```

```bash codeFormat="commonjs"
.
├── intlayer.config.cjs
└── src
    ├── ClientComponent
    │   ├── index.content.cjs
    │   └── index.cjx
    └── ServerComponent
        ├── index.content.cjs
        └── index.cjx
```

### Declare your content

Here’s an example of content declaration:

```tsx fileName="src/ClientComponent/index.content.ts" codeFormat="typescript"
import { t, type Dictionary } from "intlayer";

const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
} satisfies Dictionary;

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.mjs" contentDeclarationFormat="esm"
import { t } from "intlayer";

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

export default clientComponentContent;
```

```jsx fileName="src/ClientComponent/index.content.cjs" contentDeclarationFormat="commonjs"
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      "en-GB": "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en-GB": "Hello World",
        "fr": "Bonjour le monde",
const { t } = require("intlayer");

/** @type {import('intlayer').Dictionary} */
const clientComponentContent = {
  key: "client-component",
  content: {
    myTranslatedContent: t({
      en: "Hello World",
      fr: "Bonjour le monde",
      es: "Hola Mundo",
    }),
    numberOfCar: enu({
      "<-1": "Less than minus one car",
      "-1": "Minus one car",
      "0": "No cars",
      "1": "One car",
      ">5": "Some cars",
      ">19": "Many cars",
    }),
  },
};

module.exports = clientComponentContent;
```

```json fileName="src/ClientComponent/index.content.json" codeFormat="json"
{
  "key": "client-component",
  "content": {
    "myTranslatedContent": {
      "nodeType": "translation",
      "translation": {
        "en": "Hello World",
        "fr": "Bonjour le monde",
        "es": "Hola Mundo"
      }
    },
    "numberOfCar": {
      "nodeType": "enumeration",
      "enumeration": {
        "<-1": "Less than minus one car",
        "-1": "Minus one car",
        "0": "No cars",
        "1": "One car",
        ">5": "Some cars",
        ">19": "Many cars"
      }
    }
  }
}
```

### Build your dictionaries

You can build your dictionaries using the [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/packages/intlayer-cli/readme.md).

```bash packageManager="npm"
npx intlayer dictionaries build
```

```bash packageManager="yarn"
yarn intlayer build
```

```bash packageManager="pnpm"
pnpm intlayer build
```

This command scans all `*.content.*` files, compiles them, and writes the results to the directory specified in your **`intlayer.config.ts`** (by default, `./.intlayer`).

A typical output might look like:

```bash
.
└── .intlayer
    ├── dictionary  # Contains the dictionary of your content
    │   ├── client-component.json
    │   └── server-component.json
    ├── main  # Contains the entry point of your dictionary to be used in your application
    │   ├── dictionary.cjs
    │   └── dictionary.mjs
    └── types  # Contains the auto-generated type definitions of your dictionary
        ├── intlayer.d.ts  # Contains the auto-generated type definitions of Intlayer
        ├── client-component.d.ts
        └── server-component.d.ts
```

### Build i18next resources

Intlayer can be configured to build dictionaries for [i18next](https://www.i18next.com/). To do this, you need to add the following configuration to your `intlayer.config.ts` file:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Instructs Intlayer to generate message files for i18next
    dictionaryOutput: ["i18next"],

    // The directory where Intlayer will write your message JSON files
    i18nextResourcesDir: "./i18next/resources",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Tells Intlayer to generate message files for i18next
    dictionaryOutput: ["i18next"],

    // The directory where Intlayer will write your message JSON files
    i18nextResourcesDir: "./i18next/resources",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Tells Intlayer to generate message files for i18next
    dictionaryOutput: ["i18next"],

    // The directory where Intlayer will write your message JSON files
    i18nextResourcesDir: "./i18next/resources",
  },
};

module.exports = config;
```

> For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

Output:

```bash
.
└── i18next
    └── resources
        ├── en-GB
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

For example, the **en-GB/client-component.json** might look like:

```json fileName="intlayer/dictionary/en-GB/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

### Build next-intl dictionaries

Intlayer can be configured to build dictionaries for [i18next](https://www.i18next.com/) or [next-intl](https://github.com/formatjs/react-intl/tree/main/packages/next-intl). For this, you need to add the following configuration to your `intlayer.config.ts` file:

```typescript fileName="intlayer.config.ts" codeFormat="typescript"
import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  /* ... */
  content: {
    // Tells Intlayer to generate message files for next-intl
    dictionaryOutput: ["next-intl"],

    // The directory where Intlayer will write your message JSON files
    nextIntlMessagesDir: "./i18next/messages",
  },
};
```

```typescript fileName="intlayer.config.mjs" codeFormat="esm"
import { Locales } from "intlayer";

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Informs Intlayer to generate message files for i18next
    dictionaryOutput: ["next-intl"],

    // The directory where Intlayer will write your message JSON files
    nextIntlMessagesDir: "./i18next/messages",
  },
};

export default config;
```

```javascript fileName="intlayer.config.cjs" codeFormat="commonjs"
const { Locales } = require("intlayer");

/** @type {import('intlayer').IntlayerConfig} */
const config = {
  /* ... */
  content: {
    // Informs Intlayer to generate message files for i18next
    dictionaryOutput: ["next-intl"],

    // The directory where Intlayer will write your message JSON files
    nextIntlMessagesDir: "./intl/messages",
  },
};

module.exports = config;
```

> For a complete list of available parameters, refer to the [configuration documentation](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/configuration.md).

Output:

```bash
.
└── intl
    └── messages
        ├── en
        │   ├── client-component.json
        │   └── server-component.json
        ├── es
        │   ├── client-component.json
        │   └── server-component.json
        └── fr
            ├── client-component.json
            └── server-component.json
```

For example, the **en/client-component.json** might look like:

```json fileName="intlayer/dictionary/en/client-component.json"
{
  "myTranslatedContent": "Hello World",
  "zero_numberOfCar": "No cars",
  "one_numberOfCar": "One car",
  "two_numberOfCar": "Two cars",
  "other_numberOfCar": "Some cars"
}
```

## CLI tools

Intlayer provides a CLI tool to:

- audit your content declarations and complete missing translations
- build dictionaries from your content declarations
- push and pull remote dictionaries from your CMS to your locale project

Consult [intlayer-cli](https://github.com/aymericzip/intlayer/blob/main/docs/docs/{{locale}}/intlayer_cli.md) for more information.

## Use Intlayer in your application

Once your content is declared, you can consume your Intlayer dictionaries in your application.

Intlayer is available as a package for your application.

### React Application

To use Intlayer in your React application, you can use [react-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/react-intlayer/index.md).

### Next.js Application

To use Intlayer in your Next.js application, you can use [next-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/next-intlayer/index.md).

### Express Application

To use Intlayer in your Express application, you can use [express-intlayer](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/express-intlayer/index.md).

## Functions provided by `intlayer` package

The `intlayer` package also provides some functions to help you internationalise your application.

- [`getConfiguration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getConfiguration.md)
- [`getTranslation()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getTranslation.md)
- [`getEnumeration()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getEnumeration.md)
- [`getLocaleName()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getLocaleName.md)
- [`getLocaleLang()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getLocaleLang.md)
- [`getHTMLTextDir()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getHTMLTextDir.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getPathWithoutLocale.md)
- [`getMultilingualUrls()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getMultilingualUrls.md)
- [`getLocalizedUrl()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getLocalizedUrl.md)
- [`getPathWithoutLocale()`](https://github.com/aymericzip/intlayer/blob/main/docs/docs/en-GB/packages/intlayer/getPathWithoutLocale.md)

## Doc History

- 5.5.10 - 2025-06-29: Init history
