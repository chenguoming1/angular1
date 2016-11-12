(function(){
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', function() {
      var lunchBox = this;
      lunchBox.lunchMenu = '';
      lunchBox.message = '';
      lunchBox.error = false;
      lunchBox.success = false;

      function lunchBoxSuccess(successMessage) {
        lunchBox.message = successMessage;
        lunchBox.error = false;
        lunchBox.success = true;
      }

      function lunchBoxError() {
        lunchBox.error = true;
        lunchBox.success = false;
        lunchBox.message = "Please enter data first";
      }

      lunchBox.checkItTooMuch = function() {
        //Check whether the string is empty
        if(lunchBox.lunchMenu.trim().length == 0) {
          lunchBoxError();
          return;
        }

        var lunchMenu = lunchBox.lunchMenu.split(',');
        var newLunchMenu = [];

        // Do not count empty element eg, a, ,b = 2
        for(var i = 0; i < lunchMenu.length; i++) {
          if(lunchMenu[i].trim().length > 0) {
            newLunchMenu.push(lunchMenu[i]);
          }
        }

        // array length > 3
        if (newLunchMenu.length > 3) {
          lunchBoxSuccess("Too much!");
          return;
        }

        // 1 <= array length < 3
        if (newLunchMenu.length >= 1) {
          lunchBoxSuccess("Enjoy!");
          return;
        }

        lunchBoxError();
      };
    });
})();
