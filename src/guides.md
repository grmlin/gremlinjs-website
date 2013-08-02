# Getting Started
GremlinJS allows you to organize your Javascripts in components called Gremlins. Learn how to create and use these Gremlins. 

## Introduction
Every dom element may use one or more Gremlins / Components. GremlinJS watches your site looking for these elements and creates Gremlin instances of Gremlin Classes you provided.

Gremlins are found with a special data attribute: `data-gremlin`. This happens *automagically* whenever a dom element with this attribute is or becomes a child node of the dom.

**Yepp, GremlinJS observes the dom for you.**

Components you'll write with GremlinJS are isolated from each other and function independently. To use a Gremlin in another project, all you'll do is copy a file and add some HTML markup. 
The code will be cleaner, easier to understand and understanding the work of others gets much easier, because whenever you see an element with a `data-gremlin` attribute, you will always and instantly know what javascript is responsible for it's behaviour.

### Include GremlinJS

#### Script element
[Download GremlinJS](http://grml.in) and include it in your HTML. From now on all gremlin components in the site will be found and instantiated.

You don't have to start or initialize it, you don't have to wait for anything, include it and you're done.

``` html
<script src="js/gremlinjs.min.js"></script>
``` 

The order including your gremlin definitions does **not** matter, feel free to add them at the top or bottom of the page, as long as GremlinJS was included before, of course.  
Gremlins will be found as well, if you add the definitions some time later, eg. asynchronously with a script loader.

#### AMD
If you want to use a Javascript module loader like RequireJS, GremlinJS is available as `GremlinJS`

```js
require(["GremlinJS"], function(G) {

});
```

### The GremlinJS Namespace
Once GremlinJS was loaded, a globally accessible Object is present: 


	GremlinJS


There will also be a shorter alias for GremlinJS if not already in use:


	G


### Browser support

GremlinJS works in all modern browsers, including Internet Explorer down to version 8.

If you need support for an even older browser (eg IE7), you have to include a JSON Library like [json2.js](https://github.com/douglascrockford/JSON-js) before including GremlinJS.
GremlinJS uses the javascript JSON API to parse JSON strings in custom dom element data-attributes. (see [Gremlin Configuration](api.html#gremlin-data) for details).

A more complete lists of supported browsers (desktop and mobile) will follow some day.

## Creating Gremlins

Gremlins are build by writing a javascript definition and then added to dom elements via a custom data attribute `data-gremlin`.

** No matter if you define your Gremlins inline or in separate files, add the definitions AFTER including GremlinJS and additional [extensions](#using-extensions).**
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

### CoffeeScript

With CoffeeScript it's easy to create new gremlins. Create a new class extending [`G.Gremlin`](api.html#gremlinjs-gremlin) and [add](api.html#gremlinjs-add) it with a proper name (the name used in `data-gremlin`).

The only thing to remember: **Always call super inside the constructor!** Without, the gremlin will miss all the members of the abstract [`Gremlin`](api.html#gremlin)   

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
If you don't want to implement the class mechanics with Javascript by yourself, you can write  Gremlin definitions. With these definitions you will create constructor functions aka classes which are inherited from the abstract gremlin for you behind the scenes.

If GremlinJS finds a suitable dom element, one that provides the `data-gremlin="NAME"` attribute, a new instance of the Gremlin `NAME`, inherited from the [abstract gremlin class](api.html#gremlin), will be created. This instance does, beside the members and methods you defined, provide some useful properties you may need later.

> GremlinJS uses constructor functions, the protoype chain and the new keyword to create gremlin instances internally. So no matter how many gremlins of a certain type are present in the document and instantiated, they'll use the beauty and speed of the prototype.

To make the developer's life easier, GremlinJS provides a helper method to add gremlin definitions.  [`GremlinJS.define()`](api.html#gremlinjs-define)

#### `GremlinJS.define(name, constructor [, instanceMembers] [, staticMembers]):`[`Gremlin`](api.html#gremlin)
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
</script>

```

### GremlinJS.define() in detail
Learn how to use [`GremlinJS.define(name, constructor [, instanceMembers] [, staticMembers])`](api.html#gremlinjs-define) in detail below.


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

If a gremlin definition with this name is missing, or you forgot to add a name, the developer tool's console will tell you. Furthermore GremlinJS comes with a [debug mode](api.html#gremlinjs-debug), that helps you to find working and defect gremlins in the document.

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

To access static properties, use the [`Gremlin#klass`](api.html#gremlin-klass) member, reflecting the class.

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
## Detecting Gremlins
You are adding some `data-gremlin` attributes to dom elements and create Javascript functions defining them. How will GremlinJS associate and instantiate them, what do you have to do?

### Auto discovery
**Nothing**!  
GremlinJS finds every single dom element with a `data-gremlin` attribute in the document and instantiates the related gremlin class. 

It does not matter if the element is a child of the document on page load or added later with Javascript, GremlinJS will find it.



#### Detection strategies

Sorted by preference, first strategy a browser supports is used.

1. [`MutationObserver`](http://devdocs.io/dom/mutationobserver)
2. CSS animation callbacks
3. Interval

This works best in modern browsers of course. The old ones, not supporting CSS-Animations or the [`MutationObserver`](http://devdocs.io/dom/mutationobserver) will use an interval to check the dom for changes.   
The old, slow and deprecated events to detect changes in the document are not included!

### CSS animations
GremlinJS uses the [`animationstart`](http://devdocs.io/dom_events/animationstart) event to detect new gremlin elements in browsers not supporting [`MutationObserver`](http://devdocs.io/dom/mutationobserver) and checks the animation name before searching for new elements.  

**DON'T ADD ANY CSS-ANIMATIONS TO THE GREMLIN ELEMENT ITSELF!**    
**It will break the auto detection of GremlinJS**
 
## The Gremlin
When you define gremlins with [`GremlinJS.define()`](api.html#gremlinjs-define), GremlinJS creates a Javascript constructor function that later will be instantiated with `new` for every gremlin element found in the document.  
This class inherits from an [abstract Gremlin class](api.html#gremlin). All it's properties, all the properties added by extensions and all the properties you define are available in every instance of this gremlin type.   
The same applies to classes added with `GremlinJS.add()`.

### Inherited properties
Every class properly created will add some useful members to every gremlin instance.

#### Gremlin#data

Object providing all parsed data-attributes of the gremlin's dom element. 

See ["add options"](#add-options) for a more detailed explanation.

#### Gremlin#el

A reference of the dom element the gremlin was added to.  
**This element should always be the starting point for all your dom manipulations, queryselectors etc...**

``` js
this.el.innerHTML = "Hello World!";
```

#### Gremlin#id

Unique id amongst all gremlin instances.

#### Gremlin#klass

Reflects the [`Gremlin`](api.htmml#gremlin) the instance belongs to. 

Especially handy, when you define static gremlin members with [`GremlinJS.define()`](api.html#gremlinjs-define) and want to access them from inside an instance.

``` js
GremlinJS.define('HelloWorld', function () {
        this.talk();
    },
    {
        talk: function () {
            this.el.innerHTML = this.klass.GREETING;
        }
    },
    {
        GREETING: 'Hello World!'
    }
);
```

### Add Options

With a modular approach like GremlinJS, there will always be the need to add some configuration to your components.   
GremlinJS fulfills this desire by parsing data-attributes similar to jQuery. GremlinJS adds a `data`-property to every instance providing the values of the attributes.  See [`Gremlin#data`](api.html#gremlin-data) for details.

Think of a slideshow gremlin like the one on the front page, that should have a configurable slideshow interval in milliseconds.

Add a data attribute storing this information

``` html
<div data-gremlin="Slideshow" data-interval="2500"></div>
```

and use the information inside your instance.


``` js
window.setInterval(this.onInterval, this.data.interval);	
```

### Lazy loading

GremlinJS supports lazy loading of your gremlins. If you want to execute a gremlin's javascript **only** if it's in the browsers viewport, activate lazy loading for the element, by setting the ` data-gremlin-lazy` attribute to `true`.

``` html
<div data-gremlin="Foo" data-gremlin-lazy="true"></div>	
```

#### Browser Support
Lazy loading isn't available in older browsers. It's inactive then and all Gremlins will be loaded immediately.

GremlinJS uses [`element.getBoundingClientRect`](http://devdocs.io/dom/element.getboundingclientrect) to decide, if an element is in the viewport.

### Inheriting Gremlins

#### CoffeeScript

To inherit an existing gremlin, extend it, call `super` in the constructor and add it.

``` js
class Mogwai extends G.Gremlin
	constructor: ->
		super

class Gizmo extends Mogwai
  constructor : ->
    super
    alert "Hello World!"

G.add "Gizmo", Gizmo
```

#### Javascript
*coming soon*
<!--
To inherit a gremlin with Javascript you can use `GremlinJS.derive()`. It works the same way  as `GremlinJS.define()` but expects the name of a Gremlin to inherit from as a first parameter.
-->
## Using Extensions

To use an extension make sure, that you include the extension before any gremlin. Once you've added an extension, it's automatically available to all of your gremlins.

Some extensions are already included in GremlinJS, if you meet the requirements, feel free to use them.

### Interests (PubSub)
Pub Sub extension that allows gremlins to interact with each other by dispatching messages.

See [Interests Docs](api.html#interests-pubsub)


### Dom Elements
Extension providing element maps "vanilla javascript style".

See [Dom Elements Docs](api.html#domelements)

### jQuery
jQuery extension providing element and event maps.

See [jQuery Docs](api.html#jquery)

## Building Extensions

Building extensions is easy. Create an object that implements the [`IExtension`](api.html#iextension) interface and register the extension.

Each extension has to provide three methods, `.bind()`, `.extend()` and `.test()`. Extensions won't be instantiated or called in a special context, extending GremlinJS in a meaningful way is your task.  
If you created the extension add it with `GremlinJS.registerExtension()`.

If you're interested what the GremlinJS does with the included extension, read the code. You'll find the extensions at `app\scripts\extensions`

### Example

A working example can be seen below.   
The extension modifies the prototype for all gremlin instances, adds a property to the class itself and then binds custom data to each individual instance.

<pre class="codepen" data-height="430" data-type="js" data-href="mAGDC" data-user="grmlin" data-safe="true">
</pre>
<script async src="http://codepen.io/assets/embed/ei.js">
</script>


## Grunt

## AMD

*coming soon*