'use strict';

describe('Service: main.service', function () {

  // load the service's module
  beforeEach(module('cyborgTrackerApp'));

  // instantiate service
  var main.service;
  beforeEach(inject(function (_main.service_) {
    main.service = _main.service_;
  }));

  it('should do something', function () {
    expect(!!main.service).toBe(true);
  });

});
