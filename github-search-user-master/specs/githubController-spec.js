// --------------------------------------------
// Spec Github Comtroller
// --------------------------------------------
describe('github controller', function () {
  var githubController;
  var $httpBackend;
  var apiURL = 'https://api.github.com/users/angular/repos';

  beforeEach(function () {
    module('githubSearchUser');

    inject(function ($controller, $injector) {
      $httpBackend = $injector.get('$httpBackend');
      githubController = $controller('githubController');
      githubService = $injector.get('githubService');
    });
  });

  it('github controller should exist', function () {
    expect(githubController).toBeDefined();
  });

  describe('searching users repositories', function () {
    describe('when user fills the github search input with data', function () {
      it('should get data from the API', function () {
        var repoData = {
          name: 'angular',
          languages: 'javascript'
        };

        githubController.user = 'angular';

        $httpBackend.when('GET', apiURL).respond(200, {
          data: repoData
        });

        githubController.getList();

        $httpBackend.flush();

        expect(githubController.repositories).toEqual({
          data: repoData
        });
      });
    });

    describe('when the data from the API has to paginate', function () {
      beforeEach(function () {
        githubController.user = 'github';
        this.apiPaginationURL = 'https://api.github.com/users/github/repos?page=3&per_page=30';

        this.repoPaginateData = {
          name: 'github',
          languages: 'javascript'
        }
      });

      it('should be able going to the next page', function () {
        $httpBackend.when('GET', this.apiPaginationURL).respond(200, {
          data: this.repoPaginateData
        });

        githubController.page = 2;
        githubController.getMoreList('next');

        $httpBackend.flush();

        expect(githubController.repositories).toEqual({
          data: this.repoPaginateData
        });
      });

      it('should be able going to the previous page', function () {
        $httpBackend.when('GET', this.apiPaginationURL).respond(200, {
          data: this.repoPaginateData
        });

        githubController.page = 4;
        githubController.getMoreList('prev');

        $httpBackend.flush();

        expect(githubController.repositories).toEqual({
          data: this.repoPaginateData
        });
      });
    });

    describe('when user does not fills the github search input', function () {
      it('should show a required message', function () {
        githubController.user = '';
        githubController.getList();
        expect(githubController.invalid).toBe(true);
      });
    });

    describe('handling response errors', function () {
      beforeEach(function () {
        githubController.user = 'angular';
      });

      it('when no data was found', function () {
        $httpBackend.when('GET', apiURL).respond(404, {});
        githubController.getList();
        $httpBackend.flush();
        expect(githubController.message).toEqual('User not found.');
      });

      it('when the API does not respond properly', function () {
        $httpBackend.when('GET', apiURL).respond(500, {});
        githubController.getList();
        $httpBackend.flush();
        expect(githubController.message).toEqual('The Github API does not respond, please try again later.');
      });
    });
  });
});
