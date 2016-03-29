require('nightwatch/bin/runner.js');

module.exports = {
  'Get method test' : function (browser) {
    browser
      .url('http://localhost:3000')
      .waitForElementVisible('body', 1000)
      .assert.containsText('h2', 'book')
      .end();
  }
};