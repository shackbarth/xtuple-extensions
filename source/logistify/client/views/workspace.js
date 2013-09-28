/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, XV:true, Backbone:true, enyo:true, console:true */

(function () {
  "use strict";

  XT.extensions.logistify.initWorkspace = function () {
    var extensions = [
      {kind: "onyx.Button", container: "settingsGroup", content: "_logistifyMe".loc(), ontap: "logistify" }
    ];
    XV.appendExtension("XV.SalesOrderWorkspace", extensions);
  };

  XV.SalesOrderWorkspace.prototype.logistify = function () {
    console.log(this.kind, this.id);
  };

}());
