/* eslint-disable no-magic-numbers */

import reducer from "../../client/reducers";
import Promise from "bluebird";

function fakeTopData() {
  const start = Date.now();
  const delay = Math.floor(Math.random() * 200 + Math.random() * 200);
  return Promise.delay(delay).then(
    () =>
      `start ${start} -> This data is obtained on server for Redux initial state with ${delay}msec async delay -> end ${Date.now()}`
  );
}

export default async function({ awaitInits }) {
  //
  // kick off own async action first before awaiting for async child
  // routes
  //
  const promise = fakeTopData();

  //
  // it's important to let all async child routes init finish
  // since this is returning a single overriding reducer
  //
  await awaitInits();

  //
  // also await own async action that was kick off at the beginning
  //
  const data = await promise;

  return {
    reducer,
    initialState: {
      data
    }
  };
}
