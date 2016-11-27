(function(){
'use strict';

var app = angular.module('NarrowItDownApp', []);
app.constant('baseUrl', ' https://davids-restaurant.herokuapp.com');

app.controller('MenuController', ['$scope', 'MenuSearchService', function($scope, MenuSearchService) {
  var menuController = this;

  menuController.searchTerm = '';

  menuController.foundItems = [];

  menuController.errMessage = null;

  menuController.errorMessage = function() {
    return menuController.errMessage;
  }

  menuController.narrowDownForMe = function() {
    if (menuController.searchTerm.trim().length == 0) {
      menuController.foundItems = [];
      menuController.errMessage = 'Nothing found';
      return;
    }

    MenuSearchService
    .getMatchedMenuItems(menuController.searchTerm)
    .then(function(foundItems){
      if (foundItems.length == 0) {
        menuController.errMessage = 'Nothing found';
      }else {
        menuController.errMessage = null;
      }
      menuController.foundItems = foundItems;
    });
  };

  menuController.onRemove = function(selectedIndex) {
    menuController.foundItems.splice(selectedIndex, 1);
  };

}]);

app.directive('foundItems', function() {
  return {
    restrict: 'E',
    templateUrl: 'founditems.html',
    scope: {
      foundItems: '<',
      dontWantThis : '&onRemove'
    }
  };
});

app.service('MenuSearchService', ['$http', 'baseUrl', function($http, baseUrl) {
  var searchService = this;

  searchService.getMatchedMenuItems = function(searchTerm) {
    var url = baseUrl+'/menu_items.json';

    return $http({
      method: "GET",
      url: url
    }).then(function (result) {
      var foundItems = [];

      var searchItem = function(item) {
        if (item.description.includes(searchTerm)) {
          foundItems.push(item);
        }
      };

      result.data.menu_items.forEach(searchItem)

      return foundItems;
    });
  };

}]);


})();
