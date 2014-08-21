select xt.create_schema('xtfielddev');

select xt.create_view('xtfielddev.metric_foo', $$

  select metric_name, metric_value, 'foo'::text as foo
  from public.metric

$$);
