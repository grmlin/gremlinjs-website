# API Reference
Reference of the publicly available methods and properties of <span class="gremlinjs">gremlin.js</span>.

This is **not** a documentation of the <span class="gremlinjs">gremlin.js</span> sources, you have to read the code to see what's going on behind the scenes.

## Gremlin

- **`window.Gremlin`**
- **`window.G`**

**The shorter alias `G` is available, if not used in the global namespace already!**

The global <span class="gremlinjs">gremlin.js</span> namespace. This is the only directly available interface exposed to the global scope!

Access the public api via `window.Gremlin`, `window.G` or asynchronously with an AMD-Loader and the name `Gremlin`.

### Gremlin.add()

Adds a gremlin class to <span class="gremlinjs">gremlin.js</span> that later will be used to activate [elements](http://devdocs.io/dom/element) in the document for this gremlin.

------
 
<div class="method-definition"></div>

###### `.add(name, Gremlin):`[`Gizmo`](#api-reference_gizmo)

returns a Gremlin class (constructor function) that is later used to instantiate the gremlins found in the document  

- **`name`** : String    
	A unique String used to reference the new Gremlin, the gremlin's name. Use this name in the `data-gremlin` attribute of a dom element to select the gremlin.

- **`Gremlin`** : [Gizmo](#api-reference_gizmo)    
	The Gremlin class inherited from `Gremlin.Gizmo`

Adding a `HelloWorld` gremlin with CoffeeScript would look like

```html
<div data-gremlin="HelloWorld"></div>
```

**Always call `super` inside the constructor!**
```js
class HelloWorld extends G.Gremlin
  @GREETING : 'Hello World!'
  
  constructor : ->
    super
    @talk()
  
  talk: ->
    @el.innerHTML = @klass.GREETING  

G.add "HelloWorld", HelloWorld
```

[**Open example &raquo;**](examples.html#basics_hello-world)

### Gremlin.debug
###### `.debug:`[`Debug`](#api-reference_debug)

[Debugger](#api-reference_debug) instance used by <span class="gremlinjs">gremlin.js</span> for console logging and gremlin highlighting in the document.
With activated debugging, all gremlins will be highlighted visually and listed by their current state.

To enable the debug mode, set `debug` to `true` at the body of your document. See [here](#api-reference_gizmo_gizmo-data) to learn how to add JSON to data attributes in <span class="gremlinjs">gremlin.js</span>.

``` html
<body data-gremlin-config='{"debug":true}'> ... </body>
```

Moreover, the debugger wraps the browser's `console` object with `Gremlin.debug.console` which is safe to use in browsers that don't have a console. In addition, if debugging is disabled, all `console` statements will be muted.

``` js
Gremlin.debug.console.log('Hello World!');
```

[**Open example &raquo;**](examples.html#basics_debugging)

### Gremlin.Gizmo

Reference of [`Gizmo`](#api-reference_gizmo).  

Extend `G.Gizmo` when creating Gremlin classes with CoffeeScript.


``` js
class Gizmo extends G.Gremlin
  constructor : ->
    super
    alert "Hello World!"
```

[**Open example &raquo;**](examples.html#basics_hello-world)

Or use the static [`.extend()`](#api-reference_gizmo_gizmo-extend) method to inherit from `Gizmo` with Javascript.

```js

var HelloWorld = G.Gizmo.extend(function () {
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

### Gremlin.Helper
###### `.Helper:`[`Helper`](#api-reference_helper)
Object providing some useful utility methods.  
References [`Helper`](#api-reference_helper)

### Gremlin.Module
###### `.Module:`[`Module`](#api-reference_module)
Module class used to add modules to <span class="gremlinjs">gremlin.js</span>.  
References [`Module`](#api-reference_module)

Modules bake functionality into Gremlin classes, without touching them directly, or inheriting Base/Abstract Gremlins. The available modules should show you what this is good for.

### Gremlin.on()

Add an event listener to <span class="gremlinjs">gremlin.js</span>.

<div class="method-definition"></div>

###### `.on(eventType, callback)`

- **`eventType`** : String    
	The name of the event

- **`callback(element)`** : Function   
   The callback function called, if the event was dispatched. The first and only argument passed into the callback will be the affected dom element.

``` js
G.on G.ON_ELEMENT_FOUND, (el) ->
  console.log "Gremlin element found, but yet not instantiated"
  
G.on G.ON_DEFINITION_PENDING,(el) ->
  console.log "Gremlin element found, but the definition for it is pending..."
    
G.on G.ON_GREMLIN_LOADED, (el) ->
  console?.log "Gremlin element found and instantiated"
```

[**Open example &raquo;**](examples.html#basics_events)

### Gremlin.Package
###### `.Package:`[`Package`](#api-reference_package)
Package class used to create packages.  
References [`Package`](#api-reference_package)

If things get complicated, there isn't enough room for all the code in a single class. Add packages to manage code outside your gremlin classes.

``` js
G.Package "util.time", 
	getTime: -> (new Date()).getTime()
```

``` js
time = G.Package.require "util.time"
console.log time.getTime()
```


### .ON_ELEMENT_FOUND

Event dispatched, if an element with the `data-gremlin` attribute was found in the document.   
**The gremlin is not instantiated at this moment!**

[**Open example &raquo;**](examples.html#basics_events)

### .ON_DEFINITION_PENDING
Event dispatched, if an element with the `data-gremlin` attribute was found in the document but a definition for it is missing. Useful if you want to load your gremlins with a script loader on demand.

[**Open example &raquo;**](examples.html#basics_events)

### .ON_GREMLIN_LOADED
Event dispatched, if an element with the `data-gremlin` attribute was found in the document and instantiated successfully.

[**Open example &raquo;**](examples.html#basics_events)


## Gizmo
`gremlinDefinitions.Gizmo`

This is the base Gremlin you should use when you create your gremlin classes.  

### Gizmo()

Constructor

<div class="method-definition"></div>

###### `Gizmo(el, data, id, init)` 

- **`el`** : [element](http://devdocs.io/dom/element)   
	The dom element the gremlin is bound to.

- **`data`** : Object    
	The elements data attributes

- **`id`** : Number    
	A unique id for every gremlin in the page. 

- **`init`** : Function   
	A init function called inside the constructor. Here, the extensions will be bound to the newly created instance.

### Gizmo.extend
<!---
UPDATE guides.md if the define documentation changes!!!
-->

Creates a gremlin definition aka class, that later will be used to activate [elements](https://developer.mozilla.org/en-US/docs/Web/API/element) in the document for this gremlin.

**Use this method with Javascript, as the Coffeescript syntax sugar to extend classes is missing**

<div class="method-definition"></div>

###### `.extend(constructor [, instanceMembers] [, staticMembers]):`[`Gizmo`](#api-reference_gizmo)

returns a Gremlin class (constructor function) that is later used to instantiate the gremlins found in the document

- **`constructor`** : Function    
	The constructor function being called every time a gremlin with `name` was found in the dom and gets instantiated.   
	`this` inside the constructor refers to the instance of `Gremlin`

- **`instanceMembers`** : Object *optional*  
	All instance members of this class as an object literal. Will be mixed into the `prototype` of the gremlin of the gremlin you are creating.

- **`staticMembers`** : Object *optional*   
	All static members of this class as an object literal. <br> To access static members from inside gremlin instances, `Gremlin.klass` references the original constructor function.


For a basic gremlin add some HTML markup and create a Gremlin called `HelloWorld`, that processes the new element. 

```html
<div data-gremlin="HelloWorld"></div>
...
<script>
	var HelloWorld = G.Gizmo.extend(function () {
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
    
    G.add('HelloWorld', HelloWorld);
</script>
```

[**Open example &raquo;**](examples.html#basics_hello-world)


### Gizmo.include

###### `.include : String|String[]`
**Optional** static property for a gremlin definition defining the included modules.

Use a single string or an array of strings to include one or more modules

#### Example

``` js
G.Gizmo.extend(function () {
      ...
    },
    {
      ...
    },
    {
        include: "foo"
    }
);
```

``` js
G.Gizmo.extend(function () {
      ...
    },
    {
      ...
    },
    {
        include: ["foo", "bar"]
    }
);
```

### Gizmo#constructor

###### `#constructor : `[`Gizmo`](#api-reference_gizmo)
Reflects the [`Gizmo`](#api-reference_gizmo) this instance belongs to. 

Can be handy, when you define static gremlin members and want to access them from inside an instance.


#### Example

``` js
G.Gizmo.extend(function () {
        this.talk();
    },
    {
        talk: function () {
            this.el.innerHTML = this.constructor.GREETING;
        }
    },
    {
        GREETING: 'Hello World!'
    }
);
```

[**Open example &raquo;**](examples.html#basics_gremlin-properties_class-reflection)

### Gizmo#data

###### `#data:Object`
All data-attributes of the gremlin's dom element.   
<span class="gremlinjs">gremlin.js</span> will parse all the data-attributes for you and tries to guess their types. Numbers will be Javascript Numbers, the strings *true* and *false* Booleans... and it's possible to define native Objects as JSON.

<span class="gremlinjs">gremlin.js</span> converts the attribute names separated by '-' into camel cased keys without the leading *data*. `data-foo-bar` becomes `#data.fooBar`.

###### JSON inside data-attributes

Objects in data-attributes will be parsed with `JSON.parse`. It's absolutely necessary to enter a valid JSON string inside the attribute, otherwise the object wont be parsed and becomes an uninteresting string.   
Enclose the JSON string in single quotes and write your JSON.

```html
<div data-gremlin="Foo" data-config='{"foo":"bar"}'></div>
```

###### Using data-attributes
The following attributes will be available as a number (`this.data.myNumber`) and an object (`this.data.config`) inside the gremlin instance.
                                                           
``` html
<div data-gremlin="foo" 
    data-config='{"foo":"bar"}' 
    data-my-number="42">
</div>
```
    
    

``` js
console.log(this.data.number); // prints 42
console.log(typeof this.data.number); // prints number
console.log(this.data.config.foo); // prints bar
console.log(typeof this.data.config); // prints object
```

[**Open example &raquo;**](examples.html#basics_gremlin-properties_setting-gremlin-options)


### Gizmo#el

###### `#el : `[`element`](http://devdocs.io/dom/element)

A reference of the dom element the gremlin was added to.  
**This element should always be the starting point for all your dom manipulations, queryselectors etc...**

[**Open example &raquo;**](examples.html#basics_gremlin-properties_the-gremlin-element)

### Gizmo#id

###### `#id : Number`
Unique id amongst all gremlin instances. Nothing fancy, just an index incremented for every instance.

[**Open example &raquo;**](examples.html#basics_gremlin-properties_unique-identifier)

## Debug
`util.Debug` 

Debugger Class used for console logging and gremlin highlighting in the document.   
If instantiated with activated debugging, all gremlins
will be highlighted visually by Gremlin, and components that are ready, pending or broken are listed at the bottom left
part of the site.

**This class is not directly accessible and listed here for reference. Use the [`Gremlin.debug`](#api-reference_gremlin_gremlin-debug) instance to debug your gremlins!**

### Debug()
Constructor

<div class="method-definition"></div>

###### `Debug(isDebug)`

- **`isDebug`** : Boolean  
	Set `isDebug` to `true`, if debugging should be enabled.

### Debug#console
A reference to the console object you know and love.

###### `#console:`[`Console`](http://devdocs.io/dom/console)

**If** <span class="gremlinjs">gremlin.js</span> is in debug mode, the `console` methods are linked directly to the native `console` object. Otherwise all your `console.log` statements will be muted.

The following console commands are currently supported by `Gremlin.debug.console` *(if the browser supports them, of course)*:

```js
["debug", "error", "info", "log", "warn", "dir", "dirxml", "trace", "assert", "count", "markTimeline", "profile", "profileEnd", "time", "timeEnd", "timeStamp", "group", "groupCollapsed", "groupEnd", "clear"]
```
## Helper
`util.Helper`

Utility methods used by <span class="gremlinjs">gremlin.js</span> that may be useful.

### Helper.extend()

Extends an object. Copy all properties of the source objects into the target, overwriting existing properties.

<div class="method-definition"></div>

###### `.extend(target, *objects):Object` 
- **`target`** : Object   
	The object to extend

- **`objects`** : Object   
	One or more source objects

``` js
var defaults = {foo: 'bar'},
    options = Gremlin.Helper.extend({},defaults,{foo:'baz'});

console.log(options.foo); //logs 'baz'
```

###  Helper.mixin()

Mix an object into a constructor functions prototype

<div class="method-definition"></div>

###### `.mixin(targetClass, mixinObject)`
- **`targetClass`** : Function   
	The constructor function to extend

- **`mxinObject`** : Object   
	An object containing all properties that will be mixed into the prototype of `targetClass`

``` js
var Animal = function(name) {
	this.name = name;
};

Gremlin.Helper.mixin(Animal, {
	bark: function(){
		alert("I'm a dog and my name is " + this.name);
	}
});

var karl = new Animal('Karl');
karl.bark(); // alerts "I'm a dog and my name is Karl"
```

### Helper.clone()

Creates a deep copy of an object and returns the copy.

<div class="method-definition"></div>

###### `.clone(obj):Object`
- **`obj`** : Object   
	The object to clone 

### Helper.hasClass()

Test, if a dom element has a certain class.

<div class="method-definition"></div>

###### `.hasClass(element, className):Boolean`
- **`element`** : [element](https://developer.mozilla.org/en-US/docs/Web/API/element)   
	The dom element

- **`className`** : String   
	The class name

### Helper.addClass()

Add a new class to a dom element.

<div class="method-definition"></div>

###### `.addClass(element, className)`
- **`element`** : [element](https://developer.mozilla.org/en-US/docs/Web/API/element)    
	The dom element

- **`className`** : String   
	The class name

### Helper.removeClass()

Remove a class from a dom element

<div class="method-definition"></div>

###### `.removeClass(element, className)`
- **`element`** : [elements](https://developer.mozilla.org/en-US/docs/Web/API/element)   
	The dom element

- **`className`** : String   
	The class name

### Helper.addStyleSheet() 

Add some new css styles to your document

<div class="method-definition"></div>

###### `.addStyleSheet(cssText)`
- **`cssText`** : String   
	The css you want to add to your document

```js
    var css = '.foo {color:red;}';
	Gremlin.Helper.addStyleSheet(css);
```

## Module
`modules.Module`

A module that can later be used to extend the functionality of gremlin classes.

### Module()
Constructor

*You can omit the `new` keyword when creating `Module` instances*

<div class="method-definition"></div>

###### `Module(name, obj)`

- **`name`** : String  
	The name of the module. Will later be used with `include` to add the module to a gremlin
- **`obj`** : Object  
    Object describing the module. Has to implement [`IModule`](#api-reference_imodule)   
    
Example from the interests module *(some code is missing here...)*
```js
"controller code ..."

Gremlin.Module 'interests',
  extend: (Gremlin) ->
    Gremlin::emit = (name, data) ->
      Controller.dispatch name, data

  bind: (gremlinInstance) ->
    addInterests.call gremlinInstance
```

## IModule
`gremlinDefinitions.IModule`

Interface every module has to implement.

**This is pseudo code that can't be found in the <span class="gremlinjs">gremlin.js</span> sources. There will be no bulletproof
error checking or whatsoever when processing modules**

### IModule.bind()

Will be called to bind the module to a gremlin instance. Do whatever yout want to do with a specific element in here. Event binding for dom elements would be a good example.

<div class="method-definition"></div>

###### `.bind(gremlin)`

- **`gremlin`** : [Gizmo](#api-reference_gizmo)   
	The [`Gizmo`](#api-reference_gizmo) instance the module will be bound to.

**called for every gremlin element including this module in the document separately**

```js
Module.bind = function(gremlin) {
    gremlin.foo = 'bar';
};
```
### IModule.extend()

Change and extend the gremlin definition (constructor function, aka. class) in this handler.  

<div class="method-definition"></div>

###### `.extend(Gremlin)`
- **`Gremlin`** : [Gizmo](#api-reference_gizmo)      
	The constructor function used to create gremlin instances later.

`extend` is the place where you might want to add static members to the classes or extend their prototypes. 

**called once for every gremlin class including this module**

```js
Module.extend= function(Gremlin) {
    Gremlin.foo = 'bar';
    Gremlin.prototype.talk = function(){
        alert(this.klass.foo);
    }
};
```

## Package
`packages.Package`

Provides an easy way to manage packages outside your gremlin classes, without polluting the global namespace.

### Package()
Constructor

*You can omit the `new` keyword creating `Package` instances*

<div class="method-definition"></div>

###### `Package(namespace, content)`

- **`namespace`** : String  
	Namespace of the package, will be merged into [`G.namespace`](#api-reference_gremlin_gremlin-namespace)
- **`content`** : *  
    Whatever you want to add to the namespace. Objects, functions... 

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

### Package.require
Access a package defined with `G.Package`

<div class="method-definition"></div>

###### `.require(namespace): *`

**returns the package**

- **`namespace`** : String    
	The package namespace

#### Coffeescript

``` js
time = G.Package.require "util.time"
```


#### Javascript

``` js
var time = G.Package.require("util.time");
```

# Modules
<span class="gremlinjs">gremlin.js</span> already provides some useful modules. Feel free to use them.

You'll find them at Github, with the following naming pattern: `gremlinjs-MODULE` inside the `dist` directory.

## Interests (PubSub)

`include: "interests"`

Pub Sub module that allows gremlins to interact with each other by dispatching messages.

``` html
<script src="gremlin.interests.min.js"></script>
```

[Download](https://github.com/grmlin/gremlinjs-interests) at Github

[**Open example &raquo;**](examples.html#modules_interests)

### About Interests
   
To use interests, there must be a gremlin emitting messages and another one that subscribed to these messages.

Dispatching messages is as easy as writing [`gremlin.emit()`](#available-extensions_interests-pubsub_gizmo-emit). Every gremlin
in the document that [defines an interest](#available-extensions_interests-pubsub_gizmo-interests) for this message, will be informed and a callback gets called. 

#### Why do I need this?
Gremlins are components, self-contained and isolated. But sometimes it's really useful when these components can talk to each other.   
Think of a gremlin that asks the user for his [`geolocation`](http://devdocs.io/dom/window.navigator.geolocation). There may be other gremlins in the page, that rely on this information. Emit a message with a new location and all other (listening)  gremlins will be informed.  

### Gizmo.interests
An Object defining message types the gremlin will be listening to and callbacks handling those messages. 

###### `.interests:Object`

The `interests` object consists of key value pairs, with the interest/message type as the key,
and the name of the handler as a value.  
`interests` is added as a static member of the gremlin's definition! `this` inside 
the handler will be correctly bound to the gremlin instance you're currently in.

``` js
G.Gizmo.extend(function () {
    },
    {
        onFoo: function (data) {
            console.dir(data);
        }
    },
    {
    	include: 'interests',
        interests: {
            'FOO': 'onFoo'
        }
    }
);
```

### Gizmo#emit()
Dispatch a new broadcasting message

<div class="method-definition"></div>

###### `#emit(name [, data])`
- **`name`** : String   
  The message type

- **`data`** : Object *optional*   
  Some additional event data that will be passed into the handler defined in the interests object.	

``` js
var Holly = G.Gizmo.extend(function () {
    this.emit("FOO", {foo: 'bar'})
  },
  {}, 
  {
    include: 'interests',
  });
```

## DomElements

`include : "domelements"`

Module providing element maps "vanilla javascript style".

``` html
<script src="gremlin.domelements.min.js"></script>
```

[Download](https://github.com/grmlin/gremlinjs-domelements) at Github

[**Open example &raquo;**](examples.html#modules_domelements)

### About dom elements
Newer browsers come with a very powerful dom element selector engine, [`element.querySelectorAll()`](http://devdocs.io/dom/element.queryselectorall). The `DomElements` extension allows you to define element maps utilizing `querySelectorAll` for gremlins.

**If you want to use DomElements with older browsers, include a `querySelectorAll` shim first!** 

### Gizmo.elements 

###### `.elements:Object`
Object literal / map,  defining node lists to be added to the [`Gizmo`](#api-reference_gizmo) instance.

The object has to be composed of a selector as a key, and an instance property name as the value.   
`{SELECTOR:NAME, *SELECTOR:NAME}`  

**`querySelectorAll` will always be executed relatively to the [gremlin's dom element](#api-reference_gizmo_gizmo-el)**.

``` html
<div data-gremlin="Foo">
	<h1 class="content"></h1>
</div>
```
``` js
G.Gizmo.extend(function () {
    alert(this.contentEl.length); //alerts "1"
  },
  {},
  {
    include: "domelements",
    elements: {
      "div.content": "contentEl"
  	}
  });
```

## jQuery
`include: "jquery"`

jQuery module providing element **and** event maps.

``` html
<script src="gremlin.jquery.min.js"></script>
```

[Download](https://github.com/grmlin/gremlinjs-jquery) at Github

[**Open example &raquo;**](examples.html#modules_jquery)

### About jQuery
Gremlin doesn't require jQuery, but it's used a lot these days. That's why this handy extension is provided. *(I use it all the time btw.)*
Keep the code defining gremlins clean with element and event maps. 

To use the jQuery module, [download and include it](http://jquery.com/) in your document **before** including <span class="gremlinjs">gremlin.js</span>. Than, the module provides access to

- **event maps** utilizing jQuery's powerful event delegation 
- **element maps** defined with jQuery's selector engine 

### Gizmo#$el

###### `#$el:jQuery`
The gremlin's dom element as jQuery object
 
### Gizmo.elements

###### `.elements:Object`
Object literal / map,  defining jQuery objects to be added to the [`Gizmo`](#api-reference_gizmo) instance.

The object has to be composed of jQuery selectors as a key, and an instance property name as the value.   
`{SELECTOR:NAME, *SELECTOR:NAME}`  

**The selector will always be executed relatively to the [gremlin's dom element](#api-reference_gizmo_gizmo-el).**

``` html
<div data-gremlin="Foo">
	<h1 class="content"></h1>
</div>
```
``` js
var Foo = G.Gizmo.extend(function () {
    this.$content.html('Hello World!');
  },
  {},
  {
    include: "jquery",
    elements: {
      "div.content": "$content"
  	}
  });
  
G.add('Foo', Foo);
```

### Gizmo.events

###### `.events:Object`
Object literal / map,  defining jQuery event handler to be added to the [`Gizmo`](#api-reference_gizmo) instance.

The object has to be composed of an event description combining the event type and a selector as a key, and an instance method name as the value.  
**If you use a handler name not available on your gremlin's instance, <span class="gremlinjs">gremlin.js</span> throws an Error.**

#### Event map description
It's possible to to bind events to the gremlin's dom element or to delegate events deeper into the gremlin.

##### Binding events to [`#el`](#api-reference_gizmo)
Add the event type as a key, and the name of the handler as the value of the event map entry.

``` js
events = {
	'click' : 'onClick'
}
```

##### Delegating events into the gremlin
To delegate events, add a selector to the event type separated by a single whitespace.

``` js
events = {
	'click div.content' : 'onClick'
}
```

Feel free to use all the event types jQuery provides and read the jQuery API docs to learn how to bind events with [`jQuery#on()`](http://api.jquery.com/on/)    

#### Callback context and arguments

Inside the callback you define, the context will be set to the gremlin instance. The callback function will
be called with two arguments

1. `event`: the [jQuery event object](http://api.jquery.com/category/event-object/)
2. `context`: the original context (`this`) of the jQuery event.   
	The [jQuery event docs](http://api.jquery.com/on/#event-handler):
	> When jQuery calls a handler, the this keyword is a reference to the element where the event is being delivered; for directly bound events this is the element where the event was attached and for delegated events this is an element matching selector. (Note that this may not be equal to event.target if the event has bubbled from a descendant element.) To create a jQuery object from the element so that it can be used with jQuery methods, use $(this).


``` html
<div data-gremlin="Foo">
	<button>Click me</button>
</div>
```
``` js
var Foo = G.Gizmo.extend(function () {},
  {
    onClick: function(event, context){
		alert('Hello World');
    }
  },
  {
    include: "jquery",
    events: {
      "click button": "onClick"
  }
});

G.add('Foo', Foo);
```
