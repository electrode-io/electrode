/**
 * @packageDocumentation
 * @module index
 */

/* eslint-disable filenames/match-regex */

/**
 * BaseOutput
 *
 * This class defines the interface to receive HTML output from rendering a template
 *
 */
export class BaseOutput {
  /**
   * Array to hold items in the output
   */
  _items: any[];
  /**
   * Boolean to indicate if output is still open for more
   */
  _open: boolean;
  _pos: number;
  _closeCb: Function;
  /**
   * number of pending spots in the output
   *
   * A spot is a location in the output that can be independently expanded
   */
  _pending: number;
  _output: any;
  _flushQ: any;
  _context: any;
  _result: any;

  constructor() {
    this._items = [];
  }

  /**
   * add
   *
   * Add some data to the output.  The data can be another output.
   *
   * @param data - data to add to the output
   * @returns number of data added to the output
   */
  add(data: any): number {
    const x = this._items.length;
    this._items.push(data);
    return x;
  }

  /**
   * length
   *
   * Get the number of items (data) added to the output
   * @returns number of items in the output
   */
  get length() {
    return this._items.length;
  }

  /**
   * convert the output into a single string
   *
   * @returns the output as a string
   */
  stringify() {
    let out = "";
    for (const x of this._items) {
      if (typeof x === "string") {
        out += x;
      } else if (x && x.stringify) {
        out += x.stringify();
      } else {
        const typeName = (x && x.constructor && x.constructor.name) || typeof x;
        const msg = `RenderOutput unable to stringify item of type ${typeName}`;
        console.error("FATAL Error:", msg + "\n"); // eslint-disable-line
        throw new Error(msg);
      }
    }
    return out;
  }

  _munchItems(munchy: any) {
    for (const item of this._items) {
      if (item._munchItems) {
        item._munchItems(munchy);
      } else {
        munchy.munch(item);
      }
    }
  }

  /**
   *
   * Generate a stream from the output by sending it to a munchy
   *
   * Info about munchy: https://www.npmjs.com/package/munchy
   *
   * @param munchy - A munchy object
   * @param done - callback after output has been consumed by munchy
   *
   */
  sendToMunchy(munchy: any, done: Function) {
    if (this._items.length > 0) {
      munchy.once("munched", done);
      this._munchItems(munchy);
    } else {
      process.nextTick(done);
    }
  }
}
