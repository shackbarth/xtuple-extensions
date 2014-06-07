/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, XM:true, Backbone:true, enyo:true, console:true */

(function () {
  "use strict";

  XT.extensions.icecream.initList = function () {
    enyo.kind({
      name: "XV.IceCreamFlavorList",
      kind: "XV.List",
      label: "_iceCreamFlavors".loc(),
      collection: "XM.IceCreamFlavorCollection",
      query: {orderBy: [
        {attribute: 'name'}
      ]},
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "short",
              components: [
              {kind: "XV.ListAttr", attr: "name", isKey: true},
              {kind: "XV.ListAttr", attr: "description"}
            ]},
            {kind: "XV.ListColumn", classes: "last", fit: true, components: [
              {kind: "XV.ListAttr", attr: "calories"}
            ]}
          ]}
        ]}
      ]
    });
  };
}());
