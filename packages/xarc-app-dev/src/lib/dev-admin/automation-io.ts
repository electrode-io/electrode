/* eslint-disable no-console */

export class AutomationIO {
  constructor(name) {
    console.log(`
=================================================================================================
= ${name} is using AutomationIO - There will be no interactivity and only stdout will be shown.
=================================================================================================
`);
  }

  setup() {
    //
  }

  async getUserInput() {
    return new Promise(resolve => {
      setTimeout(() => resolve({}), 500);
    });
  }

  show(...args) {
    console.log(...args);
  }

  write() {
    //
  }

  addItem() {
    //
  }

  updateItem() {
    //
  }

  removeItem() {
    //
  }

  exit() {
    process.exit(); // eslint-disable-line
  }
}
