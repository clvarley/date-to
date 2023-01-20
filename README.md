# date-write

Convert dates to strings with ease.

## Installation

To install `date-write` just include it to your project like so:

```sh
npm install --save date-write
```

After npm has downloaded the library, you can start importing and using it as
normal:

**ES6 module<sup>\*preferred</sup>**

```js
import { dateToFormat } from "date-write";
```

**CommonJS**

```js
const { dateToFormat } = require("date-write");
```

## Getting Started

Now it's time to actually start formatting some dates!

Suppose you want to output the 1st January 2000 as a string in the format
**Year**-**Month**-**Day**. Traditionally, this would require you to make calls
to the [`Date.getFullYear()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear),
[`Date.getMonth()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth)
and [`Date.getDate()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate)
methods and then construct the string manually.

With `date-write` you simply specify your desired output using the
[supported placeholders](#available-placeholders) and the library will generate
the string for you.

For example:

```js
import { dateToFormat } from "date-write";

// Remember: Months in JS are 0 indexed!
const y2k = new Date(2000, 0, 1);
const output = dateToFormat(y2k, "Y-M-D");

console.log(output); // 2000-01-01
```

The format parameter can be as long or short as you need, and any combination of
placeholders can be used.

## Formating

At the moment we only support the year, month and day components of the date
object but future versions of the library will (hopefully) expose more.

### Available Placeholders

| Placeholder | Description | Output |
| :--- | :--- | :---: |
| `Y` | 4 digit representation of the year (with leading zeros if required) | `2022`<br>`0774` |
| `y` | The year (no leading zeros) | `2022`<br>`774` |
| `M` | 2 digit representation of the month (with leading zeros if required) | `11`<br>`05` |
| `m` | The month (no leading zeros) | `11`<br>`5` |
| `D` | 2 digit representation of the day of the month (with leading zeros if required) | `07`<br>`31` |
| `d` | The day of the month (no leading zeros) | `7`<br>`31` |

As library standard: uppercased letters will include leading zeros where
required, while lowercased letters display the value _'as is'_.

### Escaping

You may now be asking yourself: _"What happens if I want to include any of those
letters in my output?"_

Luckily, `date-write` also includes a utility for escaping strings, allowing you
to still include characters in the output without them being expanded.

Without escaping you might end up in a situation like this:

```js
import { dateToFormat } from "date-write";

// Remember: Months in JS are 0 indexed!
const myBirthday = new Date(1952, 2, 11);
const output = dateToFormat(myBirthday, "My birthday is: Y-M-D");

console.log(output); // 031952 birth11a1952 is: 1952-03-11
```

As you can see, the `d` and `y` in "birthday" and the `M` and `y` in "My" have
been expanded to their relevant date components. This is less than ideal.

There are 2 ways to resolve this.

The first is to escape those characters with a backslash. (Because of how
JavaScript treats the backslash character, you will have to double escape it!)

```js
import { dateToFormat } from "date-write";

const myBirthday = new Date(1952, 2, 11);
const output = dateToFormat(myBirthday, "\\M\\y birth\\da\\y is: Y-M-D");

console.log(output); // My birthday is: 1952-03-11
```

Or you can use the bundled `escape` utility function:

```js
import { dateToFormat, escape } from "date-write";

const myBirthday = new Date(1952, 2, 11);
const label = escape("My birthday is:");
const output = dateToFormat(myBirthday, `${label} Y-M-D`);

console.log(output); // My birthday is: 1952-03-11
```

**Note:** Here we're using the backtick
[template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
syntax, but traditional string concatenation using `+` or [`String.concat()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat)
will also work just fine.

## Examples

That's everything you need to know to get started with `date-write`, but for the
sake of completeness (and to help you see the library in action) here are some
examples of what you might choose to use the library for.

**Day of the month:**

```js
import { dateToFormat, escape } from "date-write";

// ...

const label = escape("day(s) into the month")
const output = dateToFormat(new Date(), `m ${label}`);

console.log(output); // 19 day(s) into the month
```

**Conditional formatting:**

```js
import { dateToFormat } from "date-write";

// ...

// Pretend `isUK()` does some locale checking
const format = isUk() ? "d/M/Y" : "m/D/Y";
const output = dateToFormat(new Date(), format);

console.log(output); // Either: 19/01/2023 OR 1/19/2023
```

**Last login date:**

```js
import { dateToFormat } from "date-write";

// ...

// Get the last login date somehow
const lastLogin = getLastLogin(user);
const output = dateToFormat(lastLogin, "Last user login: Y-M-D");

console.log(output); // Last user login: 2023-01-19
```
