/*jshint node:true, indent:2, curly:true, eqeqeq:true, immed:true, latedef:true, newcap:true, noarg:true,
regexp:true, undef:true, trailing:true, white:true */
/*global XT:true, XM:true, enyo:true, _:true */

(function () {

  XT.extensions.icecream.initPicker = function () {

    enyo.kind({
      name: "XV.IceCreamFlavorPicker",
      kind: "XV.PickerWidget",
      collection: "XM.iceCreamFlavors"
    });
  };

}());
