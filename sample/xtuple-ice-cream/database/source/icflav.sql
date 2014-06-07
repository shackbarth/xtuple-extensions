select xt.create_table('icflav', 'ic');

select xt.add_column('icflav','icflav_id', 'serial', 'primary key', 'ic');
select xt.add_column('icflav','icflav_name', 'text', '', 'ic');
select xt.add_column('icflav','icflav_description', 'text', '', 'ic');
select xt.add_column('icflav','icflav_calories', 'integer', '', 'ic');

comment on table ic.icflav is 'Ice cream flavors';
