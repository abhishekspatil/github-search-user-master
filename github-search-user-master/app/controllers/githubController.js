// --------------------------------------------
// Controller - Github Search User
// --------------------------------------------
(function(){
  'user strict';

  function githubController($http, githubService) {
    var vm = this;
    var page = vm.page = 0;

    // Pagination buttons
    vm.disabledPrevButton = true;
    vm.disabledNextButton = true;

    vm.getList = function() {
      vm.message = false;
      vm.repositories = {};
      vm.loading = true;

      // User validation
      if (!vm.user) {
        vm.invalid = true;
        vm.loading = false;

        return false;
      } else {
        vm.invalid = false;

        // Get data from API
        githubService.get(vm.user).then(function(data) {
          vm.repositories = data;
          vm.disabledNextButton = vm.repositories.length === 30 ? false : true;

          vm.loading = false;
        }).catch(function(error) {
           var status = error.status;
           vm.loading = false;

            switch (error.status) {
              // Github user does not exist
              case 404: {
                vm.message = 'User not found.' ;
                break;
              }

              // Github API does not respond
              default: {
                vm.message = 'The Github API does not respond, please try again later.';
              }
            }
        });
      }
    };

    vm.getMoreList = function(rel) {
      vm.loading = true;

      // Pagination behaviors
      if (rel === 'next') {
        vm.page++;
        vm.page = vm.page === 1 ? 2 : vm.page;
        vm.disabledPrevButton = false;
      }

      if (rel === 'prev') {
        vm.disabledPrevButton = vm.page <= 2 ? true : false;
        vm.page--;
      }

      // Get more data from the API
      githubService.getMore(vm.user, vm.page).then(function(data) {
          vm.repositories = data;
          vm.repoListLimit = vm.repositories.length < 30 ? true : false;
          vm.disabledNextButton = vm.repoListLimit ? true : false;
          vm.loading = false;
      }).catch(function(error) {
          vm.message = 'The Github API does not respond, please try again later.';
      });
    }
  };

  githubController.$inject = ['$http', 'githubService'];
  GITHUB.app.controller('githubController', githubController);
})();
