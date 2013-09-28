select xt.create_table('shiptolglogin', 'lg');

select xt.add_column('shiptolglogin','shiptolglogin_id', 'serial', 'primary key', 'lg');
select xt.add_column('shiptolglogin','shiptolglogin_shipto_id', 'integer', 'references shiptoinfo (shipto_id)', 'lg');
select xt.add_column('shiptolglogin','shiptolglogin_lglogin_id', 'integer', 'references lg.lglogin (lglogin_id)', 'lg');

comment on table lg.shiptolglogin is 'Joins Customer Shipto with Logistify Login';