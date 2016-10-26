// --------------------------------------------
// Spec Github Factory
// --------------------------------------------
describe('github factory', function () {
  var githubService;
  var $httpBackend;
  var apiURL = 'https://api.github.com/users/angular/repos';
  var apiPaginateURL = 'https://api.github.com/users/angular/repos?page=2&per_page=30';

  beforeEach(function () {
    module('githubSearchUser');

    inject(function ($injector) {
      $httpBackend = $injector.get('$httpBackend');
      githubService = $injector.get('githubService');
    });

    this.repoData = {
      name: 'angular',
      languages: 'javascript'
    }
  });

  it('github factory should exist', function () {
    expect(githubService).toBeDefined();
  });

  it('should return data from the API', function () {
    $httpBackend.when('GET', apiURL).respond(200, {
      data: this.repoData
    });

    githubService.get('angular').then(function(response) {
      expect(response.data).toEqual(this.repoData);
    }.bind(this));

    $httpBackend.flush();
  });

  it('should be able to paginate', function () {
    $httpBackend.when('GET', apiPaginateURL).respond(200, {
        data: this.repoData
    });

    githubService.getMore('angular', 2).then(function(response) {
        expect(response.data).toEqual(this.repoData);
    }.bind(this));

    $httpBackend.flush();
  });
});
