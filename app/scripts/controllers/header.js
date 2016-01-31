'use strict';

/**
 * @ngdoc function
 * @name githubExplorerApp.controller:HeaderCtrlCtrl
 * @description
 * # HeaderCtrlCtrl
 * Controller of the githubExplorerApp
 */
angular.module('githubExplorerApp')
  .controller('HeaderCtrl', function ($scope, dataService, localStorageService, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    if(localStorageService.get('githubKey')) {

      if(!localStorageService.get('userData')) {
        dataService.getAuthenticatedUserData()
        .then(function(response) {
          localStorageService.set('userData', response.data);
          $scope.userData = localStorageService.get('userData');
        });
      }
    }

    $scope.userData = localStorageService.get('userData');

    $scope.navClass = function (page) {
      var currentRoute = $location.path().substring(1) || 'main';
      return page === currentRoute ? 'active' : '';
    };

    $scope.logout = function() {
      localStorageService.clearAll();
    };
  });
