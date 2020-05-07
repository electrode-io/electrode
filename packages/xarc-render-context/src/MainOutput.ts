/**
 * @packageDocumentation
 * @module index
 */

/* eslint-disable filenames/match-regex */

import * as assert from "assert";
import { BaseOutput } from "./BaseOutput";

export class MainOutput extends BaseOutput {
  constructor() {
    super();
    this._pending = 0;
  }

  _addSpot(data) {
    const x = this.add(data);
    this._pending++;
    return x;
  }

  _closeSpot(x) {
    assert(this._items[x._spotPos()] === x, "closing unknown pending");
    this._pending--;
  }

  _hasPending() {
    return this._pending > 0;
  }
}
