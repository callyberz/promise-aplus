# promise-aplus

A simple Promise/A+ implementation in TypeScript.

## Description

Promise/A+ is a specification for asynchronous JavaScript promises. This project is a simple implementation of the specification in TypeScript. For more information on the specification, see [https://promisesaplus.com/](https://promisesaplus.com/).

![Flowchart](https://github.com/callyberz/promise-aplus/blob/main/promiseAPlus-flowchart.png?raw=true)

## Running locally

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

To test:

```bash
bun run test
```

## Takeaways

Promise can only have 3 status: `pending`, `fulfilled`, `rejected`.

- When in `pending`, can transit to `fulfilled` or `rejected`.
- When in `fulfilled` or `rejected`, can't transit to other status && must have value.
- When in `rejected`, can't transit to `fulfilled` && must have reason.

## `Promise` constructor

- The executor function in constructor takes two arguments, `resolve` and `reject`, both are functions.
- Constructor is called immediately when PromiseAPlus instance is created.

> Most of the time executor is async, e.g. `setTimeout`, `fetch`, `XMLHttpRequest`, etc.

1. Takes an executor function as argument, e.g. `(resolve, reject) => { ... }`
2. Then call executor function by passing `resolve` and `reject` functions as arguments under the context of Promise instance, e.g. `executor.call(this, resolve, reject)`

- As we pass resolve & reject to executor, `this` context is lost.

> Be careful when passing a function as a callback to another function, the `this` context inside the callback is lost.

```js
executor(this.resolve.bind(this), this.reject.bind(this));
```

## `then` method

- `then` method takes two arguments, `onFulfilled` and `onRejected`.
- `then` method will be called when chaining `then` method on Promise instance.

## `resolve` method

- `resolve` will be called when executor function is called with `resolve`.
- Basically it will be called when Promise is fulfilled (change status from pending to fulfilled).
- Loop through `onFulfilledCallbacks` and call each callback with `this.value` as argument.

## `reject` method

- `reject` is similar to `resolve`, but it will only be called when Promise is rejected (change status from pending to rejected).

## `catch` method

- `catch` method is a simply `then(undefined, onRejected)`.
- `catch` method will be called when chaining `catch` method on Promise instance.

## `finally` method

- `finally` method is a simply `then(onFinally, onFinally)`.
- `finally` method will be called when chaining `finally` method on Promise instance no matter `fulfilled` or `rejected`

## License

This project was created using `bun init` in bun v1.0.21. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

## References

- [StackOverflow](https://stackoverflow.com/questions/31324110/why-does-the-promise-constructor-require-a-function-that-calls-resolve-when-co)
- [Promise/A+](https://promisesaplus.com/)
