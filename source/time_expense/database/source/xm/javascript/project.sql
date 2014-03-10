select xt.install_js('XM','Project','xtte', $$
  /* Copyright (c) 1999-2014 by OpenMFG LLC, d/b/a xTuple. 
     See www.xm.ple.com/CPAL for the full text of the software license. */

(function () {
  
  if (!XM.Project) { XM.Project = {}; }
  
  XM.Project.isDispatchable = true;

  /**
    Determine if a project is referenced by worksheets

    @param {String} Project number
    @returns Boolean
  */
  XM.Project.worksheetUsed = function(projectNumber) {  
    var sql = "select count(teitem_id) as used " +
              "from prj " +
              " join prjtask on prj_id=prjtask_prj_id " +
              " join te.teitem on teitem_prjtask_id=prjtask_id " +
              "where prj_number = $1;";
    return plv8.execute(sql, [projectNumber])[0].used;
  };

}());

$$);

