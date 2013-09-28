select xt.create_table('lglogin', 'lg');

select xt.add_column('lglogin','lglogin_id', 'serial', 'primary key', 'lg');
select xt.add_column('lglogin','lglogin_accountnumber', 'text', '', 'lg');
select xt.add_column('lglogin','lglogin_scac', 'text', '', 'lg');
select xt.add_column('lglogin','lglogin_username', 'text', '', 'lg');
select xt.add_column('lglogin','lglogin_password', 'text', '', 'lg');

comment on table lg.lglogin is 'Logistify Login';
