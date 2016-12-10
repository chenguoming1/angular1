(function () {
"use strict";

angular.module('public')
.component('signup', {
  templateUrl: 'src/public/signup/signup.html',
  bindings: {
    //  onSignUpSuccess: '&',
     'state': '<'
    // menuItem: '<'
  },
  controller: SignupController
});

SignupController.$inject = ['UserService'];
function SignupController(UserService) {
  var $ctrl = this;

  $ctrl.isValidShortNameVar = null;

  $ctrl.signup = function() {
     UserService.getMenuItem($ctrl.user.shortName).then(function(menuItem){
         $ctrl.user.menuItem = menuItem;
         UserService.signup($ctrl.user);
         $ctrl.signupSuccessMessage = 'Your information has been saved.';
     }).catch(function(exception){
         $ctrl.isValidShortNameVar = false;
     });
  }

  $ctrl.isValidShortName = function() {
      if ($ctrl.isValidShortNameVar === false) {
          return false;
      }
      return true;
  }
}


})();
