# GremlinJS Reference
Reference of the publicly available methods and properties of GremlinJS. 

This is **not** a documentation of the GremlinJS sources, you have to read the code to see what's going on behind the scenes. 
## GremlinJS
The GremlinJS namespace. This is the only directly available interface exposed to the global scope!

Access GremlinJS via `window.GremlinJS` or asynchronously with an AMD-Loader. 

### GremlinJS.debug
###### `.debug:`[`Debug`](#debug)

[Debugger](#debug) instance used by GremlinJS for console logging and gremlin highlighting in the document.    
With activated debugging, all gremlins will be highlighted visually by GremlinJS, listing components that are ready, pending or broken.

To enable the debug mode, set `debug` to `true` at the body of your document. See [here](#gremlin-data) to learn how to add JSON to data attributes in GremlinJS. 

``` html
<body data-gremlin-config='{"debug":true}'> ... </body>
```

Moreover, the debugger wraps the browser's `console` object with `GremlinJS.debug.console` which is safe to use in browsers that don't have a console. In addition, if debugging is disabled, all `console` statements will be muted.

``` js
GremlinJS.debug.console.log('Hello World!');
```

#### Example

Open your console to see the logging there.

<pre class="codepen" data-height="250" data-type="result" data-href="qpmEc" data-user="grmlin" data-safe="true">
</pre>
<script async src="http://codepen.io/assets/embed/ei.js">
</script>

### GremlinJS.define()

Creates a gremlin definition aka class, that later will be used to activate [elements](https://developer.mozilla.org/en-US/docs/Web/API/element) in the document for this gremlin.

###### `.define(name, constructor [, instanceMembers] [, staticMembers]):`[`Gremlin`](#gremlin)

- **`name`** : String    
	A unique String used to reference the new Gremlin, the gremlin's name. Use this name in the `data-gremlin` attribute of a dom element to select the gremlin.

- **`constructor`** : Function    
	The constructor function being called every time a gremlin with `name` was found in the dom and gets instantiated.   
	`this` inside the constructor refers to the instance of `Gremlin`

- **`instanceMembers`** : Object *optional*  
	All instance members of this class as an object literal. Will be mixed into the `prototype` of the gremlin (the constructor function returned by `GremlinJS.define`). 

- **`staticMembers`** : Object *optional*   
	All static members of this class as an object literal. <br> To access static members from inside gremlin instances, `Gremlin.klass` references the original constructor function.


For a basic gremlin add some HTML markup and create a Gremlin called `HelloWorld`, that processes the new element. 

```html
<div data-gremlin="HelloWorld"></div>
...
<script>
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
</script>
```

#### Example

<pre class="codepen" data-height="150" data-type="result" data-href="IqFbf" data-user="grmlin" data-safe="true">
</pre>
<script async src="http://codepen.io/assets/embed/ei.js">
</script>


### GremlinJS.Helper
###### `.Helper:`[`Helper`](#helper)
Object providing some useful utility methods.
References [`Helper`](#helper)

### GremlinJS.registerExtension() 

Adds a new extension to GremlinJS.

###### `.registerExtension(Extension)`

- **`Extension`** : Object implementing [`IExtension`](#iextension)

	[`IExtension`](#iextension) does not exist in code and there is no error handling when registring extensions at all. Take care and be sure to provide the necessary methods. 

**Always include your extensions before your gremlin definitions**

#### Example

The extension in the example below modifies the prototype for all gremlin instances, adds a property to the class itself and then binds custom data to each individual instance.

<pre class="codepen" data-height="430" data-type="js" data-href="mAGDC" data-user="grmlin" data-safe="true">
</pre>
<script async src="http://codepen.io/assets/embed/ei.js">
</script>


## Gremlin
`gremlin.gremlinDefinitions.AbstractGremlin`

All gremlin definitions added with [`GremlinJS.define()`](#gremlinjs-define) are inheriting from this class.

**This class is not directly accessible from outside GremlinJS and used internally, only!** 

### Gremlin()

Constructor

###### `Gremlin(el, data, id, init)` 

- **`el`** : [element](http://devdocs.io/dom/element)   
	The dom element the gremlin is bound to.

- **`data`** : Object    
	The elements data attributes

- **`id`** : Number    
	A unique id for every gremlin in the page. 

- **`init`** : Function   
	A init function called inside the constructor. Here, the extensions will be bound to the newly created instance.

### Gremlin#data

###### `#data:Object`
All data-attributes of the gremlin's dom element.   
GremlinJS will parse all the data-attributes for you and tries to guess their types. Numbers will be Javascript Numbers, the strings *true* and *false* Booleans... and it's possible to define native Objects as JSON. 

GremlinJS converts the attribute names separated by '-' into camel cased keys without the leading *data*. `data-foo-bar` becomes `#data.fooBar`.

###### JSON inside data-attributes

Objects in data-attributes will be parsed with `JSON.parse`. It's absolutely necessary to enter a valid JSON string inside the attribute, otherwise the object wont be parsed and becomes an uninteresting string.   
Enclose the JSON string in single quotes and write your JSON.

```html
<div data-gremlin="Foo" data-config='{"foo":"bar"}'></div>
```

###### Using data-attributes
The following attributes are becoming a number (`this.data.myNumber`) and an object (`this.data.config`) inside the gremlin instance.
                                                           
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

### Gremlin#el

###### `#el : `[`element`](http://devdocs.io/dom/element)

A reference of the dom element the gremlin was added to.  
**This element should always be the starting point for all your dom manipulations, queryselectors etc...**


### Gremlin#id

###### `#id : Number`
Unique id amongst all gremlin instances.

### Gremlin#klass

###### `#klass : `[`Gremlin`](#gremlin)
Points to the [`Gremlin`](#gremlin) the instance belongs to. 

Especially handy, when you define static gremlin members with [`GremlinJS.define()`](#gremlinjs-define) and want to access them from inside an instance.


#### Example

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
## IExtension
`gremlin.gremlinDefinitions.IExtension`

Interface every extension has to implement.

**This is pseudo code that can't be found in the GremlinJS sources. There will be no
error checking or whatsoever when processing extensions**

### IExtension.bind()

Binds the extension to a gremlin instance. Do whatever yout want to do with a gremlins instance in here. 

###### `.bind(gremlin)`

- **`gremlin`** : [Gremlin](#gremlin)   
	The [`Gremlin`](#gremlin) instance the extension will be bound to.

**called for every gremlin element in the document separately**

```js
Extension.bind = function(gremlin) {
    gremlin.foo = 'bar';
};
```
### IExtension.extend()

Change and extend the gremlin definition (constructor function, aka. class) in this handler.  

###### `.extend(Gremlin)`
- **`Gremlin`** : [Gremlin](#gremlin)      
	The constructor function used to create gremlin instances later.

`extend` is the place where you might want to add static members to the classes or extend their prototypes. 

**called once when adding the extension**

```js
Extension.extend= function(Gremlin) {
    Gremlin.foo = 'bar';
    Gremlin.prototype.talk = function(){
        alert(this.klass.foo);
    }
};
```
### IExtension.test()
Test the extensions availability

###### `.test():Boolean`
Should return `true`, if the extension is available, `false` otherwise.

This little helper is needed to prevent errors for the some of the build in extensions. In most cases you will return `true` here.

**called once when adding the extension**

```js
Extension.test= function() {
    return Modernizr.geolocation
};
```
## Debug
`gremlin.util.Debug` 

Debugger Class used for console logging and gremlin highlighting in the document.   
If instantiated with activated debugging, all gremlins
will be highlighted visually by GremlinJS, and components that are ready, pending or broken are listed at the bottom left
part of the site.

**This class is not directly accessible and listed here for reference. Use the [`GremlinJS.debug`](#gremlinjs-debug) instance to debug your gremlins!**

### Debug()
Constructor

###### `Debug(isDebug)`

- **`isDebug`** : Boolean  
	Set `isDebug` to `true`, if debugging should be enabled.

### Debug#console
A reference to the console object you know and love.

###### `#console:`[`Console`](http://devdocs.io/dom/console)

**If** GremlinJS is in debug mode, the `console` methods are linked directly to the native `console` object. Otherwise all your `console.log` statements will be muted.

The following console commands are currently supported by `GremlinJS.debug.console` *(if the browser supports them, of course)*:

```js
["debug", "error", "info", "log", "warn", "dir", "dirxml", "trace", "assert", "count", "markTimeline", "profile", "profileEnd", "time", "timeEnd", "timeStamp", "group", "groupCollapsed", "groupEnd", "clear"]
```
## Helper
`gremlin.util.Helper` 

Utility methods used by GremlinJS that may be useful.

### Helper.extend()

Extends an object. Copy all properties of the source objects into the target, overwriting existing properties.

###### `.extend(target, *objects):Object` 
- **`target`** : Object   
	The object to extend

- **`objects`** : Object   
	One or more source objects

``` js
var defaults = {foo: 'bar'},
    options = GremlinJS.Helper.extend({},defaults,{foo:'baz'});

console.log(options.foo); //logs 'baz'
```

###  Helper.mixin()

Mix an object into a constructor functions prototype

###### `.mixin(targetClass, mixinObject)`
- **`targetClass`** : Function   
	The constructor function to extend

- **`mxinObject`** : Object   
	An object containing all properties that will be mixed into the prototype of `targetClass`

``` js
var Animal = function(name) {
	this.name = name;
};

GremlinJS.Helper.mixin(Animal, {
	bark: function(){
		alert("I'm a dog and my name is " + this.name);
	}
});

var karl = new Animal('Karl');
karl.bark(); // alerts "I'm a dog and my name is Karl"
```

### Helper.clone()

Creates a deep copy of an object and returns the copy.

###### `.clone(obj):Object`
- **`obj`** : Object   
	The object to clone 

### Helper.hasClass()

Test, if a dom element has a certain class.

###### `.hasClass(element, className):Boolean`
- **`element`** : [element](https://developer.mozilla.org/en-US/docs/Web/API/element)   
	The dom element

- **`className`** : String   
	The class name

### Helper.addClass()

Add a new class to a dom element.

###### `.addClass(element, className)`
- **`element`** : [element](https://developer.mozilla.org/en-US/docs/Web/API/element)    
	The dom element

- **`className`** : String   
	The class name

### Helper.removeClass()

Remove a class from a dom element

###### `.removeClass(element, className)`
- **`element`** : [elements](https://developer.mozilla.org/en-US/docs/Web/API/element)   
	The dom element

- **`className`** : String   
	The class name

### Helper.addStyleSheet() 

Add some new css styles to your document

###### `.addStyleSheet(cssText)`
- **`cssText`** : String   
	The css you want to add to your document

```js
    var css = '.foo {color:red;}';
	GremlinJS.Helper.addStyleSheet(css);
```


# Build In Extensions
GremlinJS includes some useful extensions. If the browser supports the extension, 
it will automatically be available for all your gremlins.

## Interests (PubSub)
Pub Sub extension that allows gremlins to interact with each other by dispatching messages.

### About Interests
The interests extension works always, there are no additional dependencies.   
To use interests, there must be a gremlin emitting messages and another one that subscribed to these messages.

Dispatching messages is as easy as writing [`gremlin.emit()`](#gremlin-emit). Every gremlin
in the document that [defines an interest](#gremlin-interests) for this message, will be informed and a callback gets called. 

#### Why do I need this?
Gremlins are components, self-contained and isolated. But sometimes it's really useful when these components can talk to each other.   
Think of a gremlin that asks the user for his [`geolocation`](http://devdocs.io/dom/window.navigator.geolocation). There may be other gremlins in the page, that rely on this information. Emit a message with a new location and all other (listening)  gremlins will be informed.  

### Gremlin.interests
An Object defining message types the gremlin will be listening to and callbacks handling those messages. 

###### `.interests:Object`

The `interests` object consists of key value pairs, with the interest/message type as the key,
and the name of the handler as a value.  
`interests` is added as a static member of the gremlin's definition! `this` inside 
the handler will be correctly bound to the gremlin instance you're currently in.

``` js
GremlinJS.define("Foo", function () {},
    {
        onFoo: function (data) {
            console.dir(data);
        }
    },
    {
        interests: {
            'FOO': 'onFoo'
        }
    }
);
```

### Gremlin#emit()
Dispatch a new broadcasting message

###### `#emit(name [, data])`
- **`name`** : String   
  The message type

- **`data`** : Object *optional*   
  Some additional event data that will be passed into the [`Gremlin#on`](#gremlin-on) handler.	

``` js
var Holly = GremlinJS.define("Bar", function () {
    this.emit("FOO", {foo: 'bar'})
});
```

## DomElements
Extension providing element maps "vanilla javascript style".

### About dom elements
Newer browsers come with a very powerful dom element selector engine, [`element.querySelectorAll()`](http://devdocs.io/dom/element.queryselectorall). The `DomElements` extension allows you to define element maps utilizing `querySelectorAll` for gremlins.

**If you want to use DomElements with older browsers, include a `querySelectorAll` shim first!**
### Gremlin.elements 

###### `.elements:Object`
Object literal / map,  defining node lists to be added to the [`Gremlin`](#gremlin) instance.

The object has to be composed of a selector as a key, and an instance property name as the value.   
`{SELECTOR:NAME, *SELECTOR:NAME}`  

**`querySelectorAll` will always be executed relatively to the [gremlin's dom element](#gremlin-el)**.

``` html
<div data-gremlin="Foo">
	<h1 class="content"></h1>
</div>
```
``` js
GremlinJS.define("Foo",
  function () {
    alert(this.contentEl.length); //alerts "1"
  },
  {},
  {
    elements: {
      "div.content": "contentEl"
  	}
  });
```

## jQuery
jQuery extension providing element and event maps.


### About jQuery
GremlinJS doesn't require jQuery, but it's used a lot these days. That's why this handy extension is included.     
Keep the code defining gremlins clean with element and event maps. 

To use the jQuery extension, [download and include it](http://jquery.com/) in your document **before** including GremlinJS. Than, the extension provides access to  

- **event maps** utilizing jQuery's powerful event delegation 
- **element maps** defined with jQuery's selector engine 

### Gremlin#$el

###### `#$el:jQuery`
The gremlin's dom element as jQuery object
 
### Gremlin.$elements

###### `.$elements:Object`
Object literal / map,  defining jQuery objects to be added to the [`Gremlin`](#gremlin) instance.

The object has to be composed of jQuery selectors as a key, and an instance property name as the value.   
`{SELECTOR:NAME, *SELECTOR:NAME}`  

**The selector will always be executed relatively to the [gremlin's dom element](#gremlin-el).**

``` html
<div data-gremlin="Foo">
	<h1 class="content"></h1>
</div>
```
``` js
GremlinJS.define("Foo",
  function () {
    this.$content.html('Hello World!');
  },
  {},
  {
    $elements: {
      "div.content": "$content"
  	}
  });
```

### Gremlin.$events

###### `.$events:Object`
Object literal / map,  defining jQuery event handler to be added to the [`Gremlin`](#gremlin) instance.

The object has to be composed of an event description combining the event type and a selector as a key, and an instance method name as the value.  
**If you use a handler name not available on your gremlin's instance, GremlinJS throws an Error.**

#### Event map description
It's possible to to bind events to the gremlin's dom element or to delegate events deeper into the gremlin.

##### Binding events to [`#el`](#gremlin-el)
Add the event type as a key, and the name of the handler as the value of the event map entry.

``` js
$events = {
	'click' : 'onClick'
}
```

##### Delegating events into the gremlin
To delegate events, add a selector to the event type separated by a single whitespace.

``` js
$events = {
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
GremlinJS.define("Foo", 
  function () {},
  {
    onClick: function(event, context){
		alert('Hello World');
    }
  },
  {
    $elements: {
      "click button": "onClick"
  }
});
```
