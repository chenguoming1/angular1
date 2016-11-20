(function(){
'use strict';

var shoppingApp = angular.module('shoppingApp', []);
shoppingApp.controller('ToBuyListController', ['BuyService', 'BoughtService', function ToBuyListController(BuyService, BoughtService){
		var toBuyCtrl = this;
		toBuyCtrl.getCartItems = function() {
			return BuyService.getCartItems();
		};

		toBuyCtrl.hasMessage = function() {
			return BuyService.isEverythingBought();
		};

		toBuyCtrl.bought = function(index) {
			var boughtItem = BuyService.getCartItems()[index];
			BoughtService.addBoughtItem(boughtItem);
			BuyService.bought(index);
		};
}]);


shoppingApp.controller('BoughtListController', ['BoughtService', function BoughtListController(BoughtService){
		var boughtCtrl = this;
		
		boughtCtrl.getBoughtItems = function() {
			return BoughtService.getBoughtItems();
		}

		boughtCtrl.hasMessage = function() {
			return BoughtService.isCartEmpty();
		};
}]);

shoppingApp.service('BuyService', [function BuyService() {
	var buySvc = this;
	buySvc.cartItems = [
			{ name: "cookies", quantity: 3 },
			{ name: "cheese", quantity: 5 },
			{ name: "coke", quantity: 2 },
			{ name: "carrot", quantity: 1 },
			{ name: "apple", quantity: 10 }
		];
		buySvc.getCartItems = function() {
			return buySvc.cartItems;
		};
		buySvc.isEverythingBought = function() {
			return buySvc.cartItems.length == 0;
		};
		buySvc.bought = function(index) {
			buySvc.cartItems.splice(index, 1);
		};
}]);


shoppingApp.service('BoughtService', [function BoughtService() {
	var boughtSvc = this;
		boughtSvc.boughtItems = [];
		
		boughtSvc.getBoughtItems = function() {
			return boughtSvc.boughtItems;
		}
		boughtSvc.addBoughtItem = function(item) {
			boughtSvc.boughtItems.push(item);
		}
		boughtSvc.isCartEmpty = function() {
			return boughtSvc.boughtItems.length == 0;
		};
}]);

})();