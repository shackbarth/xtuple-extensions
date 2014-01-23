/*jshint bitwise:true, indent:2, curly:true, eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
trailing:true, white:true, strict: false*/
/*global XT:true, XM:true, XV:true, enyo:true, Globalize:true*/

(function () {

  XT.extensions.timeExpense.initList = function () {

    // ..........................................................
    // WORKSHEET
    //

    enyo.kind({
      name: "XV.WorksheetList",
      kind: "XV.List",
      label: "_worksheets".loc(),
      collection: "XM.WorksheetListItemCollection",
      multiSelect: true,
      handlers: {
        onSelect: "menuItemSelected"
      },
      query: {orderBy: [
        {attribute: 'number', numeric: true}
      ]},
      actions: [
        {name: "approve", privilege: "CanApprove", prerequisite: "canApprove",
          method: "doApprove", notify: false},
        {name: "unapprove", privilege: "CanApprove",
          prerequisite: "canUnapprove", method: "doUnapprove", notify: false},
        {name: "invoice", privilege: "allowInvoicing",
          prerequisite: "canInvoice", method: "doInvoice", notify: false},
        {name: "voucher", privilege: "allowVouchering",
          prerequisite: "canVoucher", method: "doVoucher", notify: false},
        {name: "post", privilege: "PostTimeSheets", prerequisite: "canPost",
          method: "doPost", notify: false},
        {name: "close", privilege: "MaintainTimeExpense",
          prerequisite: "canClose", method: "doClose",
          notifyMessage: "_closeWorksheet?".loc()}
      ],
      parameterWidget: "XV.WorksheetListParameters",
      components: [
        {kind: "XV.ListItem", components: [
          {kind: "FittableColumns", components: [
            {kind: "XV.ListColumn", classes: "first", components: [
              {kind: "FittableColumns", components: [
                {kind: "XV.ListAttr", attr: "number", isKey: true},
                {kind: "XV.ListAttr", attr: "getWorksheetStatusString",
                  formatter: "formatStatus"},
                {kind: "XV.ListAttr", attr: "posted", formatter: "formatPosted"},
                {kind: "XV.ListAttr", attr: "weekOf", fit: true,
                  classes: "right"}
              ]},
              {kind: "FittableColumns", components: [
                {kind: "XV.ListAttr", attr: "employee.contact.name",
                  placeholder: "_noContact".loc()},
                {kind: "XV.ListAttr", attr: "totalHours", formatter: "formatHours",
                  classes: "right"}
              ]}
            ]},
            {kind: "XV.ListColumn", classes: "last", fit: true, components: [
              {kind: "XV.ListAttr", attr: "toInvoice", formatter: "formatInvoice",
                classes: "italic"},
              {kind: "XV.ListAttr", attr: "toVoucher", formatter: "formatVoucher"}
            ]}
          ]}
        ]}
      ],
      formatHours: XV.ProjectList.prototype.formatHours,
      formatInvoice: function (value, view, model) {
        var invoiced = model.get("invoiced");
        if (!value && invoiced) { return "_invoiced".loc(); }
        view.addRemoveClass("placeholder", invoiced !== false);
        var scale = XT.locale.currencyScale;
        return invoiced === false ? Globalize.format(value, "c" + scale) : "_noInvoice".loc();
      },
      formatPosted: function (value) {
        return value ? "_posted".loc() : "";
      },
      formatStatus: function (value, view, model) {
        var status = model.get("worksheetStatus");
        view.addRemoveClass("warn", status === XM.Worksheet.OPEN);
        view.addRemoveClass("emphasis", status === XM.Worksheet.APPROVED);
        return value;
      },
      formatVoucher: function (value, view, model) {
        var vouchered = model.get("vouchered");
        if (!value && vouchered) { return "_vouchered".loc(); }
        view.addRemoveClass("placeholder", !value);
        var scale = XT.locale.currencyScale;
        return value ? Globalize.format(value, "c" + scale) : "_noVoucher".loc();
      }
    });

    XV.registerModelList("XM.WorksheetListItem", "XV.WorksheetList");
  };

}());
