declare var require: {
  (id: string): any,
  ensure(
    ids: Array<string>,
    callback?: { (require: typeof require): void },
    chunk?: string
  ): void
};

declare type ElementEventTemplate<E> = {
  target: E
} & Event;

declare type InputEvent = ElementEventTemplate<HTMLInputElement>;
