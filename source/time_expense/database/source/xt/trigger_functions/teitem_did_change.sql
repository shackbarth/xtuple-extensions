create or replace function xt.teitem_did_change() returns trigger as $$
/* Copyright (c) 1999-2014 by OpenMFG LLC, d/b/a xTuple.
   See www.xm.ple.com/CPAL for the full text of the software license. */

   if (typeof XT === 'undefined') {
     plv8.execute("select xt.js_init();");
   }

   var data = Object.create(XT.Data),
     sql,
     params,
     qry,
     rate;

   /* Populate employee cost if it wasn't already included */
   if (NEW.teitem_type === 'T') {
     if (NEW.teitem_empcost === null) {
       sql = "update te.teitem set teitem_empcost = (" +
             "  select te.calcrate(emp_wage, emp_wage_period) as cost " +
             "  from te.tehead " +
             "    join emp on tehead_emp_id = emp_id " +
             "  where tehead_id = teitem_tehead_id)" +
             "where teitem_id = $1;"
       plv8.execute(sql, [NEW.teitem_id]);
     }

     if (!data.checkPrivilege("CanViewRates")) {
       if (NEW.teitem_billable) {
         sql = "select prj_number, " +
               " prjtask.obj_uuid as task_uuid, " +
               " emp_code, cust_number, item_number " +
               "from te.teitem " +
               " join prjtask on teitem_prjtask_id=prjtask_id " +
               " join prj on prjtask_prj_id=prj_id " +
               " join te.tehead on teitem_tehead_id=tehead_id " +
               " join emp on tehead_emp_id=emp_id " +
               " join custinfo on teitem_cust_id=cust_id " +
               " join item on teitem_item_id=item_id " +
               "where teitem_id=$1 ";

         row = plv8.execute(sql, [NEW.teitem_id])[0];
         params = {
           isTime: true,
           taskId: row.task_uuid,
           projectId: row.prj_number,
           employeeId: row.emp_code,
           customerId: row.cust_number,
           itemId: row.item_number
         };
         rate = XM.Worksheet.getBillingRate(params).rate;
       } else {
         rate = 0;
       }
       sql = "update te.teitem set teitem_rate = $1, teitem_total = $1 * teitem_qty " +
             "where teitem_id = $2;"
       plv8.execute(sql, [rate, NEW.teitem_id]);
     }
   }
   return NEW;

$$ language plv8;
