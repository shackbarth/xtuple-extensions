/*jshint node:true, indent:2, curly:true, eqeqeq:true, immed:true, latedef:true, newcap:true, noarg:true,
regexp:true, undef:true, trailing:true, white:true */
/*global XT:true, XV:true, enyo:true, _:true */

(function () {

  XT.extensions.icecream.initParameterWidget = function () {

    var extensions = [
      {kind: "onyx.GroupboxHeader", content: "_iceCreamFlavor".loc()},
      {name: "iceCreamFlavor", label: "_favoriteFlavor".loc(),
        attr: "favoriteFlavor", defaultKind: "XV.IceCreamFlavorPicker"}
    ];

    XV.appendExtension("XV.ContactListParameters", extensions);
  };

}());
