(function(){
  'use strict';

  angular.module('LunchCheck', [])
    .controller('LunchCheckController', function() {
      var lunchBox = this;
      lunchBox.lunchMenu = '';
      lunchBox.message = '';

      lunchBox.checkItTooMuch = function() {
        //Check whether the string is empty
        if(lunchBox.lunchMenu.trim().length == 0) {
          lunchBox.message = "Please enter data first";
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
          lunchBox.message = "Too much!";
          return;
        }

        // 1 <= array length < 3
        if (newLunchMenu.length >= 1) {
          lunchBox.message = "Enjoy!";
          return;
        }

        lunchBox.message = "Please enter data first";
      };
    });
})();
