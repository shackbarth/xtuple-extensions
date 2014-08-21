/*jshint indent:2, curly:true, eqeqeq:true, immed:true, latedef:true,
newcap:true, noarg:true, regexp:true, undef:true, strict:true, trailing:true,
white:true*/
/*global XT:true, XM:true, XV:true, enyo:true */

(function () {
  "use strict";

  XT.extensions.xtuple_field_dev_sample_2 = {

    initModels: function () {
      XM.MetricFoo = XM.Model.extend({
        recordType: "XM.MetricFoo"
      });
      XM.MetricFooCollection = XM.Collection.extend({
        model: XM.MetricFoo
      });
    },

    initViews: function () {
      enyo.kind({
        name: "XV.MetricFooListParameters",
        kind: "XV.ParameterWidget",
        components: [
          {kind: "onyx.GroupboxHeader", content: "_metrics".loc()},
          {name: "name", label: "_name".loc(), attr: "name"},
          {name: "value", label: "_value".loc(), attr: "value"}
        ]
      });

      enyo.kind({
        name: "XV.MetricFooList",
        kind: "XV.List",
        label: "_metrics".loc(),
        collection: "XM.MetricFooCollection",
        parameterWidget: "XV.MetricFooListParameters",
        query: {orderBy: [
          {attribute: 'name'}
        ]},
        components: [
          {kind: "XV.ListItem", components: [
            {kind: "FittableColumns", components: [
              {kind: "XV.ListColumn", classes: "first", components: [
                {kind: "XV.ListAttr", attr: "name"},
                {kind: "XV.ListAttr", attr: "foo"}
              ]},
              {kind: "XV.ListColumn", classes: "last", fit: true, components: [
                {kind: "XV.ListAttr", attr: "value"}
              ]}
            ]}
          ]}
        ]
      });

      XT.app.$.postbooks.appendPanels("setup", [{name: "metricFooList", kind: "XV.MetricFooList"}]);
    }
  };

}());
