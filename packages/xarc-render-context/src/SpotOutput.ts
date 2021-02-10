/**
 * @package
 * @module index
 */

/* eslint-disable filenames/match-regex */

import * as assert from "assert";
import { BaseOutput } from "./BaseOutput";

export class SpotOutput extends BaseOutput {
  constructor() {
    super();
    this._open = true;
    this._pos = -1;
    this._closeCb = null;
  }

  add(data: any) {
    assert(this._open, "SpotOutput closed");
    assert(
      typeof data === "string" || Buffer.isBuffer(data) || (data && data._readableState),
      "Must add only string/buffer/stream to SpotOutput"
    );
    return super.add(data);
  }

  close() {
    assert(this._open, "closing already closed SpotOutput");
    this._open = false;
    this._closeCb();
  }

  _onClose(cb: Function) {
    this._closeCb = cb;
  }

  _spotPos() {
    return this._pos;
  }

  _setPos(x: number) {
    this._pos = x;
  }
}
