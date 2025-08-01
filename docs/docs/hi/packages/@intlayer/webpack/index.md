---
createdAt: 2025-02-07
updatedAt: 2025-06-29
title: @intlayer/webpack - Intlayer i18n के लिए Webpack प्लगइन
description: NPM पैकेज जो Webpack-आधारित एप्लिकेशन के साथ Intlayer अंतरराष्ट्रीयकरण के सहज एकीकरण के लिए Webpack कॉन्फ़िगरेशन और प्लगइन प्रदान करता है।
keywords:
  - intlayer
  - webpack
  - plugin
  - configuration
  - i18n
  - JavaScript
  - NPM
  - bundler
slugs:
  - doc
  - package
  - @intlayer_webpack
---

# @intlayer/webpack: अपने एप्लिकेशन में Intlayer Webpack प्लगइन का उपयोग करने के लिए NPM पैकेज

**Intlayer** जावास्क्रिप्ट डेवलपर्स के लिए विशेष रूप से डिज़ाइन किए गए पैकेजों का एक समूह है। यह React, React, और Express.js जैसे फ्रेमवर्क के साथ संगत है।

**`@intlayer/webpack`** पैकेज का उपयोग Intlayer के साथ Webpack आधारित एप्लिकेशन को काम करने के लिए Webpack कॉन्फ़िगरेशन प्रदान करने के लिए किया जाता है। यह पैकेज मौजूदा Webpack एप्लिकेशन में जोड़ने के लिए एक प्लगइन भी प्रदान करता है।

## उपयोग

```ts
import { IntlayerPlugin } from "@intlayer/webpack";

export default {
  plugins: [
    new IntlayerPlugin({
      // विकल्प
    }),
  ],
};
```

## स्थापना

अपने पसंदीदा पैकेज मैनेजर का उपयोग करके आवश्यक पैकेज इंस्टॉल करें:

```bash packageManager="npm"
npm install @intlayer/webpack
```

```bash packageManager="pnpm"
pnpm add @intlayer/webpack
```

```bash packageManager="yarn"
yarn add @intlayer/webpack
```

## दस्तावेज़ इतिहास

- 5.5.10 - 2025-06-29: प्रारंभिक इतिहास
