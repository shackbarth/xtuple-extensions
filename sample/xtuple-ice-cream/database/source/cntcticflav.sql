select xt.create_table('cntcticflav', 'ic');

select xt.add_column('cntcticflav','cntcticflav_id', 'serial', 'primary key', 'ic');
select xt.add_column('cntcticflav','cntcticflav_cntct_id', 'integer', 'references cntct (cntct_id)', 'ic');
select xt.add_column('cntcticflav','cntcticflav_icflav_id', 'integer', 'references ic.icflav (icflav_id)', 'ic');

comment on table ic.cntcticflav is 'Joins Contact with Ice cream flavor';

