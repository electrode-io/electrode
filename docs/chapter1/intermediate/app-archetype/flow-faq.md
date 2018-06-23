# Flow type checker frequent ask

Below are the issues that frequently being ask, you can update them if you see any similar issue:

### - Cannot assign this.handlerFunction.bind(...) to this.handlerFunction because property handlerFunction is not writable.

Update `this.handlerFunction = this.handlerFunction.bind(this);`

to `(this:any).handlerFunction = this.handlerFunction.bind(this);`

### - How to use EventTarget?

Declare type by

```
declare type ElementEventTemplate<E> = {
   target: E
 } & Event;

declare type InputEvent = ElementEventTemplate<HTMLInputElement>;
```

### - How to add Type for function callbacks

```
function method(callback: (error: Error | null, value: string | null) => void) {
 // ...
}
```
