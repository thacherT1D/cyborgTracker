'use strict';

describe('Service: about', function () {

  // load the service's module
  beforeEach(module('cyborgTrackerApp'));

  // instantiate service
  var about;
  beforeEach(inject(function (_about_) {
    about = _about_;
  }));

  it('should do something', function () {
    expect(!!about).toBe(true);
  });

});
