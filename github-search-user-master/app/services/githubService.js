// --------------------------------------------
// Service - Requests for Github API
// https://developer.github.com/v3/
// --------------------------------------------
(function(){
  'user strict';

  function githubService($http) {
    return {
      get: function(user) {
        return $http.get('https://api.github.com/users/'+ user +'/repos')
          .then(function(result) {
            return result.data;
          });
      },
      getMore: function(user, page) {
        return $http.get('https://api.github.com/users/'+ user +'/repos?page='+ page +'&per_page=30')
          .then(function(result) {
            return result.data;
          });
      }
    }
  };

  githubService.$inject = ['$http'];
  GITHUB.app.service('githubService', githubService);
})();
