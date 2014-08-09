## xTuple Extension Tutorial
### Part II: Extending a business object

Having completed **Part I** of our tutorial, we can now manage `IceCreamFlavors` per the customer's requirements. Now we need to be able to extend the `Contact` business object to add `IceCreamFlavor` as a field.

### Tables

Let's create a new table that will function as a link table between `contact` and `icflav`, and then extend the `Contact` ORM.
[ [WHY?] ](TUTORIAL-FAQ.md#why-do-we-need-a-new-table-to-extend-contact)
Enter the following code into the file `/path/to/xtuple-extensions/source/xtuple-ice-cream/database/source/cntcticflav.sql`:


```javascript
select xt.create_table('cntcticflav', 'ic');

select xt.add_column('cntcticflav','cntcticflav_id', 'serial', 'primary key', 'ic');
select xt.add_column('cntcticflav','cntcticflav_cntct_id', 'integer', 'references cntct (cntct_id)', 'ic');
select xt.add_column('cntcticflav','cntcticflav_icflav_id', 'integer', 'references ic.icflav (icflav_id)', 'ic');

comment on table ic.cntcticflav is 'Joins Contact with Ice cream flavor';
```

Don't forget to add this new file to the `manifest.js` file, underneath the definition for `icflav.sql`.

### ORMs

We need to extend the pre-existing `Contact` ORM to have it include `IceCreamFlavor` as a new field. Enter the following code into the file `/path/to/xtuple-extensions/source/xtuple-ice-cream/database/orm/ext/contact.json`:

```javascript
[
  {
    "context": "xtuple-ice-cream",
    "nameSpace": "XM",
    "type": "Contact",
    "table": "ic.cntcticflav",
    "isExtension": true,
    "isChild": false,
    "comment": "Extended by Icecream",
    "relations": [
      {
        "column": "cntcticflav_cntct_id",
        "inverse": "id"
      }
    ],
    "properties": [
     {
        "name": "favoriteFlavor",
        "toOne": {
         "type": "IceCreamFlavor",
         "column": "cntcticflav_icflav_id"
        }
     }
    ],
    "isSystem": true
  },
  {
    "context": "xtuple-ice-cream",
    "nameSpace": "XM",
    "type": "ContactListItem",
    "table": "ic.cntcticflav",
    "isExtension": true,
    "isChild": false,
    "comment": "Extended by Icecream",
    "relations": [
      {
        "column": "cntcticflav_cntct_id",
        "inverse": "id"
      }
    ],
    "properties": [
     {
        "name": "favoriteFlavor",
        "toOne": {
         "type": "IceCreamFlavor",
         "column": "cntcticflav_icflav_id"
        }
     }
    ],
    "isSystem": true
  }
]
```

What we're doing here is pointing back to the original `Contact` ORM and telling it that there's another bit of data for it, in the `ic.cntcticflav` table. Note that we're adding the field both to the editable object and the list item object. That's because one drives the workspace and the other drives the list, and we're going to want both to have access to the new `favoriteFlavor` field.

### Models

We don't need to add anything to the model layer. The new field to `Contact` will be pulled up reflectively from the ORM. The link table itself has no ORM and therefore needs no model.

### The Cache

We are going to use a `XV.Picker` in the `Contact` workspace, which will rely on the `XM.IceCreamFlavorCollection` to be cached in the browser. Enter the following code into the file `/path/to/xtuple-extensions/source/xtuple-ice-cream/client/models/startup.js`:

```javascript
XT.extensions.icecream.initStartup = function () {
  XT.cacheCollection("XM.iceCreamFlavors", "XM.IceCreamFlavorCollection");
};
```

That 
[ [WHAT?] ](TUTORIAL-FAQ.md#what-is-the-xm-collection-cache)
was easy! (Don't forget reference this in the `package.js` file, underneath `ice_cream_flavor.js`)
[ [HOW?] ](https://github.com/xtuple/xtuple-extensions/blob/master/sample/xtuple-ice-cream/client/models/package.js)

**Verify** that this worked by refreshing the browser, opening up the Javascript console, and entering the line `XM.iceCreamFlavors`. The console should display the collection with all the flavors you added in **Part I**. 

### Widgets

Next is to create a widget for the selection of `IceCreamFlavors`. In this case, we choose a `XV.Picker` over a `XV.RelationalWidget` because there will be a limited number of options and we will not need full-fledged search capabilites.

Create a new directory `/path/to/xtuple-extensions/source/xtuple-ice-cream/client/widgets`, and update the file `/path/to/xtuple-extensions/source/xtuple-ice-cream/client/package.js` file by uncommenting the `widgets` entry.

Then, enter the following code into the file `/path/to/xtuple-extensions/source/xtuple-ice-cream/client/widgets/package.js`:

```javascript
enyo.depends(
  "picker.js"//,
  //"parameter.js" // We'll get to this one later on.
);
```

And enter the following code into the file `/path/to/xtuple-extensions/source/xtuple-ice-cream/client/widgets/picker.js`:

```javascript
XT.extensions.icecream.initPicker = function () {
  enyo.kind({
    name: "XV.IceCreamFlavorPicker",
    kind: "XV.PickerWidget",
    collection: "XM.iceCreamFlavors"
  });
};
```

Note that we set the collection of the picker to be the cache that we've just set up. This kind is a good illustration of the power of the way that we use Object-Oriented behavior on the client-side. All of the functionality this picker will need is shared among all pickers. The code lives in `XV.PickerWidget`. All we have to do to make a picker widget backed by this particular collection is point that general code at our new cache, and all the details will take care of themselves.

### Extending views

The last step is to add the new `IceCreamFlavorPicker` to the `Contact` workspace, by adding it into the component array. Of course, we're not allowed to change the core source of `XV.ContactWorkspace`. We have to inject it in from the extension. Luckily, our core workspaces give you an easy way to do this. Add the following code to `/path/to/xtuple-extensions/source/xtuple-ice-cream/client/views/workspace.js`.

```javascript
var extensions = [
  {kind: "onyx.GroupboxHeader", container: "mainGroup", content: "_iceCreamFlavor".loc()},
  {kind: "XV.IceCreamFlavorPicker", container: "mainGroup", attr: "favoriteFlavor" }
];

XV.appendExtension("XV.ContactWorkspace", extensions);
```

**Verify** this step by setting some flavors in with the contacts and making seeing that they stick if you back out and go back into them.

We can use the same trick to add this picker to the advanced search options for contact. Enter the following code into the file `/path/to/xtuple-extensions/source/xtuple-ice-cream/client/widgets/parameter.js`.

```javascript
XT.extensions.icecream.initParameterWidget = function () {
  extensions = [
    {kind: "onyx.GroupboxHeader", content: "_iceCreamFlavor".loc()},
    {name: "iceCreamFlavor", label: "_favoriteFlavor".loc(),
      attr: "favoriteFlavor", defaultKind: "XV.IceCreamFlavorPicker"}
  ];

  XV.appendExtension("XV.ContactListParameters", extensions);
};
```

Add update the `package.js` file by uncommenting the `parameter.js` line. **Verify** this step by pressing the magnifying glass icon when you're in the Contact list view, and filtering based on ice cream flavor. Only those contacts that you've set up to have that flavor should get fetched.

Congratulations! You've added the new business object to `Contact`. If you're still hungry to learn more about the capabilities of the xTuple stack, read on to [Part III](TUTORIAL3.md) to see what sorts of bells and whistles we can add to what we've built.
