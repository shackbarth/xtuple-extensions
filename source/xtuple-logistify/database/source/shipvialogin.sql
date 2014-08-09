select xt.create_table('shipvialogin', 'lg');

select xt.add_column('shipvialogin','shipvialogin_id', 'serial', 'primary key', 'lg');
select xt.add_column('shipvialogin','shipvialogin_shipvia_id', 'integer', 'references shipvia (shipvia_id)', 'lg');
select xt.add_column('shipvialogin','shipvialogin_accountnumber', 'text', '', 'lg');
select xt.add_column('shipvialogin','shipvialogin_scac', 'text', '', 'lg');
select xt.add_column('shipvialogin','shipvialogin_username', 'text', '', 'lg');
select xt.add_column('shipvialogin','shipvialogin_password', 'text', '', 'lg');

comment on table lg.shipvialogin is 'Joins Customer Shipvia with Logistify Login';