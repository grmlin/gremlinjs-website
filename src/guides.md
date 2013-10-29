# Getting Started
<span class="gremlinjs">gremlin.js</span> allows you to organize your Javascripts in components called Gremlins. Learn how to create and use these Gremlins.

## Introduction
Every dom element may use one or more Gremlins / Components. <span class="gremlinjs">gremlin.js</span> watches your site looking for these elements and creates Gremlin instances of Gremlin Classes you provided.

Gremlins are found with a special data attribute: `data-gremlin`. This happens *automagically* whenever a dom element with this attribute is or becomes a child node of the dom.

**Yepp, <span class="gremlinjs">gremlin.js</span> observes the dom for you.**

Components you'll write with <span class="gremlinjs">gremlin.js</span> are isolated from each other and function independently. To use a Gremlin in another project, all you'll do is copy a file and add some HTML markup.
The code will be cleaner, easier to understand and understanding the work of others gets much easier, because whenever you see an element with a `data-gremlin` attribute, you will always and instantly know what javascript is responsible for it's behaviour.

### Include <span class="gremlinjs">gremlin.js</span>

#### Script element
[Download <span class="gremlinjs">gremlin.js</span>](build/0.4.0/gremlin.min.js) and include it in your HTML. From now on all gremlin components in the site will be found and instantiated.

You don't have to start or initialize it, you don't have to wait for anything, include it and you're done.

``` html
<script src="js/gremlin.min.js"></script>
``` 

The order including your gremlin definitions does **not** matter, feel free to add them at the top or bottom of the page, as long as <span class="gremlinjs">gremlin.js</span> was included before, of course.
Gremlins will be found as well, if you add the definitions some time later, eg. asynchronously with a script loader.

#### AMD
If you want to use a Javascript module loader like RequireJS, <span class="gremlinjs">gremlin.js</span> is available as `Gremlin`

```js
require(["Gremlin"], function(G) {

});
```

### The GREMLIN.JS Namespace
Once <span class="gremlinjs">gremlin.js</span> was loaded, a globally accessible Object is present:

	Gremlin

There will also be a shorter alias available if not already in use:

	G

**The guides use `G`**

### Browser support

<span class="gremlinjs">gremlin.js</span> works in all modern browsers, including Internet Explorer down to version 8.

If you need support for an even older browser (eg IE7), you have to include a JSON Library like [json2.js](https://github.com/douglascrockford/JSON-js) before including <span class="gremlinjs">gremlin.js</span>.
It uses the javascript JSON API to parse JSON strings in custom dom element data-attributes. (see [Gremlin Configuration](api.html#api-reference_gizmo_gizmo-data) for details).

A more complete lists of supported browsers (desktop and mobile) will follow some day.

# Master the horde

## Creating Gremlins

Gremlins are build by writing a javascript definition and then added to dom elements via a custom data attribute `data-gremlin`.

** No matter if you define your Gremlins inline or in separate files, add the definitions AFTER including <span class="gremlinjs">gremlin.js</span> and additional [extensions](#extend-gremlinjs_using-extensions).**

### HTML
Adding gremlins to the document is easy. Choose a name for your gremlin, eg. *Stripe*, and add the `data-gremlin` attribute to the dom element of your choice.

``` html
<div data-gremlin="Stripe"></div>
```

That's all, nothing else to do here.

If you want to link multiple gremlins to a single element, separate the names with a comma.

``` html
<div data-gremlin="Stripe,Water,Food"></div>
```

If <span class="gremlinjs">gremlin.js</span> finds a suitable dom element, one that provides the `data-gremlin` attribute, a new instance of the Gremlin, inherited from the abstract gremlin class [Gizmo](api.html#api-reference_gizmo), will be created. This instance does, beside the members and methods you defined, provide some useful properties you may need later.

> <span class="gremlinjs">gremlin.js</span> uses constructor functions, the protoype chain and the `new` keyword to create gremlin instances internally. So no matter how many gremlins of a certain type are present in the document and instantiated, they'll use the beauty and speed of the prototype.

### CoffeeScript

With CoffeeScript it's easy to create new gremlins. Create a new class extending [`G.Gizmo`](api.html#api-reference_gremlin_gremlin-gizmo) and [add](api.html#api-reference_gremlin_gremlin-add) it with a proper name (the name used in `data-gremlin`).

The only thing to remember: **Always call super inside the constructor!** Without, the gremlin will miss all the members of [`Gizmo`](api.html#api-reference_gizmo)

``` js
class Stripe extends G.Gizmo
  constructor : ->
    super
    alert "Hello World!"

G.add "Stripe", Stripe
```

If you know what you're doing, you can of cause do all the work by yourself. Read the api docs to learn which parameters are available when the class gets instantiated.

### Javascript 
With vanilla Javascript, the CoffeeScript syntax sugar isn't available, of course.   
If you don't want to implement the class mechanics with Javascript by yourself, you can write  Gremlin definitions with [`G.define()`](api.html#api-reference_gremlin_gremlin-define). This method will create constructor functions aka classes for you which are inherited from the abstract gremlin behind the scenes.

<div class="method-definition"></div>

###### `G.define(name, constructor [, instanceMembers] [, staticMembers]):`[`Gizmo`](api.html#api-reference_gizmo)

returns a Gremlin class (constructor function) that is later used to instantiate the gremlins found in the document

- **`name`** : String    
	A unique String used to reference the new Gremlin, the gremlin's name. Use this name in the `data-gremlin` attribute of a dom element to select the gremlin.

- **`constructor`** : Function    
	The constructor function being called every time a gremlin with `name` was found in the dom and gets instantiated.   
	`this` inside the constructor refers to the instance of `Gremlin`

- **`instanceMembers`** : Object *optional*  
	All instance members of this class as an object literal. Will be mixed into the `prototype` of the gremlin (the constructor function returned by `G.define`).

- **`staticMembers`** : Object *optional*   
	All static members of this class as an object literal. <br> To access static members from inside gremlin instances, `G.klass` references the original constructor function.


So *Gizmo* from above written with `G.define()` would look like this:

``` js
G.define('Stripe', function () {
  alert("Hello World!");
});
```

### G.define() in detail
Learn how to use [`G.define(name, constructor [, instanceMembers] [, staticMembers])`](api.html#api-reference_gremlin_gremlin-define) in detail below.


#### `name`
The name identifies your gremlin and is essential. The name links the dom element with the definitions you provide.
 
If you add a gremlin with the name `Foo` to an element as in 
``` html
<div data-gremlin="Foo"></div>
```
a gremlin has to be defined with this name in order to make it work.
``` js
G.define("Foo", ...);
```

If a gremlin definition with this name is missing, or you forgot to add a name, the developer tool's console will tell you. Furthermore <span class="gremlinjs">gremlin.js</span> comes with a [debug mode](api.html#api-reference_gremlin_gremlin-debug), that helps you to find working and defect gremlins in the document.

#### `constructor`
The constructor function will be called for all gremlin elements in the dom matching the `name`. The constructor function is called after all the default properties were added to the gremlin and with all extensions bound.  
Within the constructor `this` points to the gremlin instance which gives access to all properties added by <span class="gremlinjs">gremlin.js</span>, the available extensions and yourself (by providing the instance and static properties objects).

``` js
G.define("Foo", function() {
	console.log(this.id); // logs the unique id of the gremlin
});
```

The constructor is mandatory, but it can be an empty function of course. You don't have to do anything special in it, <span class="gremlinjs">gremlin.js</span> takes care of everything that has to be done to get the gremlin instance up and running.

#### `instance properties`
The instance properties argument has to be an object mixed into the `prototype` of the gremlin class.   
That's why all methods and properties are accessible through the gremlin instance, eg. within the constructor.


``` js
G.define("Foo", function() {
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

To access static properties, use the [`Gizmo#klass`](api.html#api-reference_gizmo_gizmo-klass) member, reflecting the class.

``` js
G.define("Foo", function() {
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
2. [CSS animation callbacks](http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/)
3. Interval

This works best in modern browsers of course. The old ones, not supporting CSS-Animations or the `MutationObserver` will use an interval to check the dom for changes.   
The old, slow and deprecated events to detect changes in the document are not included!

### CSS animations
GremlinJS uses the [`animationstart`](http://devdocs.io/dom_events/animationstart) event to detect new gremlin elements in browsers not supporting `MutationObserver` and checks the animation name before searching for new elements.  

**DON'T ADD ANY CSS-ANIMATIONS TO THE GREMLIN ELEMENT ITSELF!**    
**It will break the auto detection of GremlinJS**
 
## The Gremlin
When you define gremlins with [`G.define()`](api.html#api-reference_gremlin_gremlin-define), GremlinJS creates a Javascript constructor function that later will be instantiated with `new` for every gremlin element found in the document.
This class inherits from an abstract gremlin class [Gizmo](api.html#api-reference_gizmo). All it's properties, all the properties added by extensions and all the properties you define are available in every instance of this gremlin type.
The same applies to classes added with `G.add()`.

### Inherited properties
Every class properly created will add some useful members to every gremlin instance.

#### Gizmo#data

Object providing all parsed data-attributes of the gremlin's dom element. 

See ["add options"](#master-the-horde_the-gremlin_add-options) for a more detailed explanation.

#### Gizmo#el

A reference of the dom element the gremlin was added to.  
**This element should always be the starting point for all your dom manipulations, queryselectors etc...**

``` js
this.el.innerHTML = "Hello World!";
```

#### Gizmo#id

Unique id amongst all gremlin instances.

#### Gizmo#klass

Reflects the class of the instance (something that Javascript doesn't). 

Especially handy, when you define static gremlin members with [`G.define()`](api.html#api-reference_gremlin_gremlin-define) and want to access them from inside an instance.

``` js
G.define('HelloWorld', function () {
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
GremlinJS fulfills this desire by parsing data-attributes similar to jQuery. GremlinJS adds a `data`-property to every instance providing the values of the attributes.  See [`Gizmo#data`](api.html#api-reference_gizmo_gizmo-data) for details.

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

**Be careful when you plan to use lazy loaded gremlins on a mobile device. In most mobile browsers, the scroll event does not fire continuously but only when the scrolling stops completely.**

### Inheriting Gremlins

#### CoffeeScript

To inherit an existing gremlin, extend it, call `super` in the constructor and add it.

``` js
class Stripe extends G.Gizmo
	constructor: ->
		super

class StripeJunior extends Stripe
  constructor : ->
    super
    alert "Hello World!"

G.add "Stripe", Stripe
G.add "StripeJunior", StripeJunior
```

#### Javascript
*coming soon*
<!--
To inherit a gremlin with Javascript you can use `G.derive()`. It works the same way  as `G.define()` but expects the name of a Gremlin to inherit from as a first parameter.
-->

## Events

<span class="gremlinjs">gremlin.js</span> dispatches events while processing the document.

See the [api docs](api.html#api-reference_gremlin_gremlin-on) and [example](examples.html#basics_events) for more information.

## Packages

Sometimes you will feel the need to write code outside of your gremlin definitions and files. <span class="gremlinjs">gremlin.js</span> offers a simple package mechanism you can use without polluting the global namespace.



### Creating packages

Create a package with [`Gremlin.Package`](api.html#)

#### Coffeescript

``` js
G.Package "util.time", 
	getTime: ->
    	(new Date()).getTime()
```


#### Javascript

``` js
G.Package("util.time", {
	getTime: function() {
    	return (new Date()).getTime()
    }
});
```

### Accessing packages

The new package is now globally available through the `Gremlin.namespace` property. You can also use `Gremlin.ns` if you don't have the time to type all those characters. 

#### Coffeescript

``` js
class Foo extends G.Gizmo
	constructor : ->
    	super
        console.log G.namespace.util.time.getTime()
    
```

# Modules

GremlinJS is highly extensible and allows you to add functionality to all of your gremlins at once with modules.  

You want to use a template engine like handlebars in your gremlins but don't want to add the code multiple times? Write a module for it.

## Using Modules

To use a module make sure, that you include the module before any gremlin. Once you've added a module, you can use the static `include` property of a gremlin definition to include modules in this class.

Include no, one or more modules.

#### Coffeescript

``` js
class Foo extends G.Gizmo
  @include : ['jquery', 'interests']
  
  ...
  
class Bar extends G.Gizmo
  @include : 'jquery'
  
  ...
  
class Baz extends G.Gizmo
  # nothing here ;)
  
  ...
  
```


Some modules already exist for GremlinJS, feel free to use them.

### Interests (PubSub)
Pub Sub module that allows gremlins to interact with each other by dispatching messages.

``` html
<script src="gremlin.interests.min.js"></script>
```

[Download](https://github.com/grmlin/gremlinjs-interests) at Github, see the [Interests Docs](api.html#modules_interests-pubsub) for details.


### Dom Elements
Module providing element maps "vanilla javascript style".

``` html
<script src="gremlin.domelements.min.js"></script>
```

[Download](https://github.com/grmlin/gremlinjs-domelements) at Github, see the [Dom Elements Docs](api.html#modules_domelements) for details.

### jQuery
jQuery module providing element and event maps.

``` html
<script src="gremlin.jquery.min.js"></script>
```

[Download](https://github.com/grmlin/gremlinjs-jquery) at Github, see the [jQuery Docs](api.html#modules_jquery) for details.

## Building Modules

Building modules is easy. Create an object that implements the [`IModule`](api.html#api-reference_imodule) interface and create a module with `Gremlin.Module`.

Each module has to provide two methods, `.bind()` and `.extend()`. The methods won't be called in a special context, use the passed contexts to create one if you need one.

If you're interested what the <span class="gremlinjs">gremlin.js</span> does with the included extension, read the code of the extension already available for <span class="gremlinjs">gremlin.js</span>.

### .bind()

Binds the module to a specific gremlin instance. Do whatever yout want to do with a gremlins instance in here. 

[API docs](api.html#api-reference_imodule_imodule-bind)


### .extend()

Change and extend the gremlin definition (constructor function, aka. class) in this handler.

[API docs](api.html#api-reference_imodule_imodule-extend)

# Tools

## Grunt

*coming soon*

## AMD

*coming soon*