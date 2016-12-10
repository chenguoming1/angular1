(function () {
"use strict";

angular.module('public')
.component('myinfo', {
  templateUrl: 'src/public/myinfo/myinfo.html',
  // bindings: {
  //   // menuItem: '<'
  // },
  controller: MyinfoController
});

MyinfoController.$inject = ['UserService'];
function MyinfoController(UserService) {
  var $ctrl = this;

  $ctrl.getUser = function() {
      return UserService.getUser();
  }
}


})();
