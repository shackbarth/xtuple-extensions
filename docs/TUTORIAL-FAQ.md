## xTuple Extension Tutorial FAQ

### How to fork and clone `xtuple-extensions`
Log in to github.com (you will need a user account, which
is free to set up), go to 
https://github.com/xtuple/xtuple-extensions,
and click the "fork" button in the upper-right.

Then, navigate on the command line of your development
environment to the directory that contains the `xtuple`
repository. Type

```bash
git clone git@github.com:yourusername/xtuple-extensions.git
```

(with your own username, of course.) 

Congratulations! The `xtuple-extensions` directory is now
created. It *is* important that this repository sits 
alongside the core `xtuple` repository.

### Why create a new schema?
We do this to avoid namespace collisions, and generally to 
keep every extension code neatly cordoned off into its own
area. It's easy enough to do and our `xm` (ORM) layer hides all
of these details from the client. For the purposes of this
tutorial all our tables will be in the `ic` schema, whereas
the ORM-backed views will live in `xm`.

### Why not use native postgres functions to create tables?
Our `xt.create_table` and `xt.add_column` functions ensure that
you can run the same script over and over and not have to make 
separate install and update packages. The system will only 
add things that weren't there before.

### Where should I put ORM definitions?
By convention, we put new orms in the `orm/models` directory, and 
extensions to existing orms in the `orm/ext` directory. Unlike with 
the sql scripts, you don't need to have a master file like the 
`manifest.js` that references them all. The core build tool will 
find all the files in these directories and load them in the 
appropriate order based on the dependency chain.

### What is wrapping the sample client code?
At the beginning of all of our client-side files you'll see a jshint 
declaration, and the entirety of the code is wrapped in an anonymous 
function which is executed immediately. If possible, we also 
`"use strict"`. These are all good practices and you should 
follow them when writing in our style. Moreover, you'll also 
see that for the extension client-side files (except for `core.js` 
and the `package.js` files), the code is wrapped in another, named 
function that is not executed immediately. This allows us to load 
the code of the extension and actually execute the code later on 
in our setup process. 

For the sake of concision the code examples in this tutorial will 
ignore the jsdoc and anonymous function wrappers (your code will
work without them), but you will see them in the actual 
implementation of this sample extension.

You might find yourself copying and pasting the tops and bottoms 
of client-side files, so as to avoid writing the jshint, 
`"use strict"`, and wrapper functions. This is fine to do, 
but make sure that you rename the `XT.extensions` functions. 
There must only be one `XT.extensions.iceCream.initModels` 
[function](http://github.com/xtuple/xtuple-extensions/tree/master/sample/xtuple-ice-cream/client/models/ice_cream_flavor.js#L9), 
for example. 

### What are the differences between the base model classes?
We extend `XM.IceCreamFlavor` off of `XM.Document`, 
which is itself extended off of `XM.Model`, which itself extends 
Backbone-relational and Backbone models. `XM.Document` has some features 
on top of `XM.Model`, such as having a user-defined key. This is the 
most commonly extended base object in `backbone-x`.

For the larger business objects, we'll typically define one or 
two lighterweight models (and ORMs) to be used in lists or as 
nested objects within other business objects. So, along with the 
"editable" model `XM.Quote`, we have `XM.QuoteListItem` and 
`XM.QuoteRelation`, which have fewer fields and are not editable. 
These lightweight models are extended from `XM.Info`. In the case 
of `IceCreamFlavor` our editable model is so light that we don't 
need to define any others.

### How do I update the strings file?

The `/path/to/xtuple-extensions/source/xtuple-ice-cream/client/en/strings.js` file 
provides the English translations for all the visible text in your app. If you're
diligent about always entering your visible text in the format "_myWord".loc(),
then you'll notice the underscores onscreen, which will remind you to
add the English translation into the `strings.js` file.

By the end of your tutorial your `strings.js` file will look like
[this](https://github.com/xtuple/xtuple-extensions/blob/master/sample/xtuple-ice-cream/client/en/strings.js).

### Why do we need a new table to extend `contact`?
In a perfect world, we would just go into the `cntct` table and add a 
column. This is not an option. We're writing a humble extension here! 
We have no authority to make changes to core tables in the `public` schema.

Adding a new table is next-easiest approach. The good news is that 
when we complete this plumbing in the database, the `Contact` business 
object will appear in the application as if this field were in it from 
the beginning. 

### What is the `XM` collection cache?
There are many collections of data that we want to be immediately
accessible to the client, such as a list of the supported currencies,
or incident priorities, or anything else that we'll want to use to fuel
a `picker` dropdown. When we declare that we want a collection to
be included in our cache, then it will be fetched when we start the app,
and will be accessible as `XM.termsTypes`, for example. These caches
are automatically kept up-to-date if you go to the setup area and change
their models.

