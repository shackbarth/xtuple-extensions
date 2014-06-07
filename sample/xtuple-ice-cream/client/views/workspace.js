/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, XV:true, Backbone:true, enyo:true, console:true */

(function () {
  "use strict";

  XT.extensions.icecream.initWorkspace = function () {

    var extensions = [
      {kind: "onyx.GroupboxHeader", container: "mainGroup", content: "_iceCreamFlavor".loc()},
      {kind: "XV.IceCreamFlavorPicker", container: "mainGroup", attr: "favoriteFlavor" }
    ];
    XV.appendExtension("XV.ContactWorkspace", extensions);

    enyo.kind({
      name: "XV.IceCreamFlavorWorkspace",
      kind: "XV.Workspace",
      title: "_iceCreamFlavor".loc(),
      model: "XM.IceCreamFlavor",
      components: [
        {kind: "Panels", arrangerKind: "CarouselArranger",
          fit: true, components: [
          {kind: "XV.Groupbox", name: "mainPanel", components: [
            {kind: "onyx.GroupboxHeader", content: "_overview".loc()},
            {kind: "XV.ScrollableGroupbox", name: "mainGroup", classes: "in-panel", components: [
              {kind: "XV.InputWidget", attr: "name"},
              {kind: "XV.InputWidget", attr: "description"},
              {kind: "XV.NumberWidget", attr: "calories"}
            ]}
          ]}
        ]}
      ]
    });

    XV.registerModelWorkspace("XM.IceCreamFlavor", "XV.IceCreamFlavorWorkspace");
  };
}());
