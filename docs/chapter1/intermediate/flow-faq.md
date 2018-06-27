# Flow FAQs

The following is a list of Frequently Asked Questions you may encounter when integrating with Flow. We put questions together to solve them in a more scalable way.

### How to add type to handlerFunction?

Issue Description:

Cannot assign this.handlerFunction.bind(...) to this.handlerFunction because property handlerFunction is not writable.

Resolution:

Update `this.handlerFunction = this.handlerFunction.bind(this);`

to `(this:any).handlerFunction = this.handlerFunction.bind(this);`

### How to add type to EventTarget?

```javascript
declare type ElementEventTemplate<E> = {
  target: E
} & Event;

declare type InputEvent = ElementEventTemplate<HTMLInputElement>;
```

### How to add type to function callbacks?

```javascript
function method(callback: (error: Error | null, value: string | null) => void) {
  // ...
}
```
