(function() {
'use strict';

angular.module('MenuApp').config(['$stateProvider','$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  var homeState = {
    name: 'home',
    url: '/',
    templateUrl: 'templates/home.template.html'
  }

  var categoriesState = {
    name: 'categories',
    component: 'categories',
    controllerAs: "categoriesRouteController",
    controller: function(categories) {
        var categoriesController = this;
        categoriesController.categories = categories;
    },
    resolve: {
        categories: function(MenuDataService) {
            return MenuDataService.getAllCategories().then(function (data) {
                return data;
            });
        }
    },
    bindings: {categories: 'categories'}
    };

  var itemsState = {
    // name: 'categories.items',
    name: 'items',
    url: '/items/{categoryShortName}',
    component: 'items',
    controllerAs: "itemsRouteController",
    controller: function(items) {
        var itemsController = this;
        itemsController.items = items;
    },
    resolve: {
        items: function(MenuDataService, $stateParams) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName).then(function(data){
                return data;
            });
        }
    },
    params: {
      categoryShortName: null
  },
    bindings: {items: 'items'}
  }

  $stateProvider.state(homeState);
  $stateProvider.state(categoriesState);
  $stateProvider.state(itemsState);
  $urlRouterProvider.otherwise('/');


}]);

})();
