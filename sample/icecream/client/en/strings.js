/*jshint node:true, indent:2, curly:false, eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
strict:true, trailing:true, white:true */
/*global XT:true */

(function () {
  "use strict";

  var lang = XT.stringsFor("en_US", {
    "_calories": "Calories",
    "_favoriteFlavor": "Favorite Flavor",
    "_iceCream": "Ice Cream",
    "_iceCreamFlavor": "Ice Cream Flavor",
    "_iceCreamFlavors": "Ice Cream Flavors",
    "_maintainIceCreamFlavors": "Maintain Ice Cream Flavors",
    "_mustUseLite": "Any flavor under 450 calories must start with the word 'Lite'"
  });

  if (typeof exports !== 'undefined') {
    exports.language = lang;
  }
}());
