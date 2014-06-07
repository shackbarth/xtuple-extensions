/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, XM:true, Backbone:true, enyo:true, console:true */

(function () {
  "use strict";

  XT.extensions.icecream.initPostbooks = function () {
    var panels, relevantPrivileges;

    panels = [
      {name: "iceCreamFlavorList", kind: "XV.IceCreamFlavorList"}
    ];
    XT.app.$.postbooks.appendPanels("setup", panels);

    relevantPrivileges = [
      "MaintainIceCreamFlavors"
    ];
    XT.session.addRelevantPrivileges("icecream", relevantPrivileges);
    XT.session.privilegeSegments.Contact.push("MaintainIceCreamFlavors");

  };
}());

