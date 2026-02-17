# `DTUtils`
DTUtils is a collection of utility functions purely made for convinience.

**Note:** This package uses ES modules. To use it in Node.js add `"type": "module"` to your project's package.json or use .mjs extensions.

## Usage
```js
import { formatColor } from "@dimitristerzz/dtutils";

console.log(formatColor("#FFFFFF", "hsl"));
console.log(formatColor("255,255,255", "hsl"));
console.log(formatColor({ r: 255, g: 255, b: 255 }, "hex"));
```

## Utilities
formatcolor, randomint