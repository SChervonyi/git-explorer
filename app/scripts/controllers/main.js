'use strict';

/**
 * @ngdoc function
 * @name githubExplorerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the githubExplorerApp
 */
angular.module('githubExplorerApp')
  .controller('MainCtrl', function ($scope, dataService, localStorageService, $rootScope) {
    var that = this;
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    that.recentItems = localStorageService.get('lastItems');

    $scope.$watch('main.search', function(newVal, oldVal) {
      if (angular.isDefined(newVal) && newVal !== oldVal) {

        dataService.searchRepositories(newVal).then(function(response) {
                that.items = response.items.slice(0,10);
                localStorageService.set('lastItems', that.items);
              });
      }
    });

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
  });
