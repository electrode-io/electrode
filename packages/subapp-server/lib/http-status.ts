/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
import * as HttpStatusCode from "http-status-codes";

export default {
  redirect: {
    [HttpStatusCode.MOVED_PERMANENTLY]: true,
    [HttpStatusCode.MOVED_TEMPORARILY]: true,
    [HttpStatusCode.PERMANENT_REDIRECT]: true,
    [HttpStatusCode.TEMPORARY_REDIRECT]: true
  }
};
