Gremlins are build by writing a javascript definition and then added to dom elements via a custom data attribute `data-gremlin`.

** No matter if you define your Gremlins inline or in separate files, add the definitions AFTER including GremlinJS and additional [extensions](#extend-gremlinjs_using-extensions).**

### HTML
Adding gremlins to the document is easy. Choose a name for your gremlin, eg. *Gizmo*, and add the `data-gremlin` attribute to the dom element of your choice.

``` html
<div data-gremlin="Gizmo"></div>
```

That's all, nothing else to do here.

If you want to link multiple gremlins to a single element, separate the names with a comma.

``` html
<div data-gremlin="Gizmo,Water,Food"></div>
```

If GremlinJS finds a suitable dom element, one that provides the `data-gremlin="NAME"` attribute, a new instance of the Gremlin `NAME`, inherited from the [abstract gremlin class](api.html#gremlinjs-reference_gremlin), will be created. This instance does, beside the members and methods you defined, provide some useful properties you may need later.

> GremlinJS uses constructor functions, the protoype chain and the `new` keyword to create gremlin instances internally. So no matter how many gremlins of a certain type are present in the document and instantiated, they'll use the beauty and speed of the prototype.

### CoffeeScript

With CoffeeScript it's easy to create new gremlins. Create a new class extending [`G.Gremlin`](api.html#gremlinjs-reference_gremlinjs_gremlinjs-gremlin) and [add](api.html#gremlinjs-reference_gremlinjs_gremlinjs-add) it with a proper name (the name used in `data-gremlin`).

The only thing to remember: **Always call super inside the constructor!** Without, the gremlin will miss all the members of the abstract [`Gremlin`](api.html#gremlinjs-reference_gremlin)

``` js
class Gizmo extends G.Gremlin
  constructor : ->
    super
    alert "Hello World!"

G.add "Gizmo", Gizmo
```

If you know what you're doing, you can of cause do all the work by yourself. Read the api docs to learn which parameters are available when the class gets instantiated.

### Javascript
With vanilla Javascript, the CoffeeScript syntax sugar isn't available, of course.
If you don't want to implement the class mechanics with Javascript by yourself, you can write  Gremlin definitions with [`GremlinJS.define()`](api.html#gremlinjs-reference_gremlinjs_gremlinjs-define)	. This method will create constructor functions aka classes for you which are inherited from the abstract gremlin behind the scenes.


#### `GremlinJS.define(name, constructor [, instanceMembers] [, staticMembers]):`[`Gremlin`](api.html#gremlinjs-reference_gremlin)
returns a Gremlin class (constructor function) that is later used to instantiate the gremlins found in the document

- **`name`** : String
	A unique String used to reference the new Gremlin, the gremlin's name. Use this name in the `data-gremlin` attribute of a dom element to select the gremlin.

- **`constructor`** : Function
	The constructor function being called every time a gremlin with `name` was found in the dom and gets instantiated.
	`this` inside the constructor refers to the instance of `Gremlin`

- **`instanceMembers`** : Object *optional*
	All instance members of this class as an object literal. Will be mixed into the `prototype` of the gremlin (the constructor function returned by `GremlinJS.define`).

- **`staticMembers`** : Object *optional*
	All static members of this class as an object literal. <br> To access static members from inside gremlin instances, `Gremlin.klass` references the original constructor function.


So *Gizmo* from above written with `GremlinJS.define()` would look like this:

``` js
GremlinJS.define('Gizmo', function () {
  alert("Hello World!");
});
```

### GremlinJS.define() in detail
Learn how to use [`GremlinJS.define(name, constructor [, instanceMembers] [, staticMembers])`](api.html#gremlinjs-reference_gremlinjs_gremlinjs-define) in detail below.


#### `name`
The name identifies your gremlin and is essential. The name links the dom element with the definitions you provide.

If you add a gremlin with the name `Foo` to an element as in
``` html
<div data-gremlin="Foo"></div>
```
a gremlin has to be defined with this name in order to make it work.
``` js
GremlinJS.define("Foo", ...);
```

If a gremlin definition with this name is missing, or you forgot to add a name, the developer tool's console will tell you. Furthermore GremlinJS comes with a [debug mode](api.html#gremlinjs-reference_gremlinjs_gremlinjs-debug), that helps you to find working and defect gremlins in the document.

#### `constructor`
The constructor function will be called for all gremlin elements in the dom matching the `name`. The constructor function is called after all the default properties were added to the gremlin and with all extensions bound.
Within the constructor `this` points to the gremlin instance which gives access to all properties added by GremlinJS, the available extensions and yourself (by providing the instance and static properties objects).

``` js
GremlinJS.define("Foo", function() {
	console.log(this.id); // logs the unique id of the gremlin
});
```

The constructor is mandatory, but it can be an empty function of course. You don't have to do anything special in it, GremlinJS takes care of everything that has to be done to get the gremlin instance up and running.

#### `instance properties`
The instance properties argument has to be an object mixed into the `prototype` of the gremlin class.
That's why all methods and properties are accessible through the gremlin instance, eg. within the constructor.


``` js
GremlinJS.define("Foo", function() {
	this.logId();
  },
  {
	logId: function() {
	  console.log(this.id); // logs the unique id of the gremlin
	}
  }
);
```

#### `static properties`
The static properties parameter has to be an object, too. This time, all methods and members are added to the Gremlin class itself.
Static properties are really useful if you have to define properties that don't have to clutter the gremlin's prototype, eg string constants.

To access static properties, use the [`Gremlin#klass`](api.html#gremlinjs-reference_gremlin_gremlin-klass) member, reflecting the class.

``` js
GremlinJS.define("Foo", function() {
	this.logId();
  },
  {
	logId: function() {
	  console.log(this.klass.GREETING + this.id); // logs "Hello, I'm the gremlin #ID"
	}
  },
  {
    GREETING: "Hello, I'm the gremlin #"
  }
);
```