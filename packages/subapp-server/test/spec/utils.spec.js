"use strict";

const chai = require('chai');
const expect = chai.expect;
const { until } = require("../../lib/utils");

describe('subapp-server utils', function() {
  this.timeout(8000);

  it('should resolve when the condition is met before the max wait time', async function() {
    let conditionMet = false;
    setTimeout(() => {
      conditionMet = true;
    }, 1000); 

    await until(() => conditionMet, 3000);
    expect(conditionMet).to.be.true;
  });

});