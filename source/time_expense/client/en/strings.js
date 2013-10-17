/*jshint node:true, indent:2, curly:false, eqeqeq:true, immed:true,
latedef:true, newcap:true, noarg:true, regexp:true, undef:true,
strict:true, trailing:true, white:true */
/*global XT:true */

(function () {
  "use strict";

  var lang = XT.stringsFor("en_US", {
    // ********
    // Labels
    // ********

    "_approve": "Approve",
    "_approved": "Approved",
    "_byAccount": "by Account",
    "_byCategory": "by Category",
    "_billing": "Billing",
    "_billable": "Billable",
    "_cost": "Cost",
    "_isContractor": "Contractor",
    "_custPo": "Cust. PO#",
    "_detail": "Detail",
    "_expense": "Expense",
    "_invoiced": "Invoiced",
    "_isSpecifiedRate": "Specified Rate",
    "_noInvoice": "No Invoice",
    "_noVoucher": "No Voucher",
    "_notUsed": "Not Used",
    "_TE": "Time Expense",
    "_tE": "Time Expense",
    "_posted": "Posted",
    "_prepaid": "Prepaid",
    "_projectBilling": "Project Billing",
    "_rate": "Rate",
    "_site": "Site",
    "_task": "Task",
    "_time": "Time",
    "_timeExpense": "Time Expense",
    "_unapprove": "Unapprove",
    "_unitCost": "Unit Cost",
    "_vouchered": "Vouchered",
    "_weekOf": "Week Of",
    "_workDate": "Work Date",
    "_worksheet": "Worksheet",
    "_worksheets": "Worksheets",

    // ********
    // Messages
    // ********
    "_postWorksheetFor": "Post Time Sheet for ",
    "_toProject": " to Project",
    "_closeWorksheet?": "Are you sure you want to close the worksheet? This action can not be undone.",

    // ********
    // Privileges
    // ********

    "_accessPPMExtension": "Access PPM Extension",
    "_canApprove": "Approve Worksheets",
    "_canViewRates": "Can View Billing Rates",
    "_maintainEmpCostAll": "Maintain All Employee Costs",
    "_maintainTimeExpense": "Delete and Close Worksheets",
    "_maintainTimeExpenseOthers": "Maintain All Worksheets",
    "_maintainTimeExpenseSelf": "Maintain Personal Worksheets",
    "_postTimeSheets": "Post Worksheets",
    "_viewTimeExpenseHistory": "View Worksheet History",
    "_allowInvoicing": "Invoice Worksheets",
    "_allowVouchering": "Voucher Worksheets"
  });

  if (typeof exports !== 'undefined') {
    exports.language = lang;
  }
}());
