# Getting Started
GremlinJS allows you to organize your Javascripts in components called Gremlins. Learn how to create and use these Gremlins. 

## Introduction
Every dom element may use one or more Gremlins / Components. GremlinJS watches your site looking for these elements and creates Gremlin instances of Gremlin Classes you provided.

Gremlins are found with a special data attribute: `data-gremlin`. This happens *automagically* whenever a dom element with this attribute is or becomes a child node of the dom.

**Yepp, GremlinJS observes the dom for you.**

Components you'll write with GremlinJS are isolated from each other and function independently. To use a Gremlin in another project, all you'll do is copy a file and add some HTML markup. 
The code will be cleaner, easier to understand and understanding the work of others gets much easier, because whenever you see an element with a `data-gremlin` attribute, you will always and instantly know what javascript is responsible for it's behaviour.

### Include GremlinJS
[Download GremlinJS](http://grml.in) and include it in your HTML. From now on all gremlin components in the site will be found and instantiated.

You don't have to start or initialize it, you don't have to wait for anything, include it and you're done.

``` html
<script src="js/gremlinjs.min.js"></script>
``` 

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

### Javascript 
Gremlin definitions are Javascript snippets describing the gremlin. With these definitions you will create constructor functions which are inherited from an abstract gremlin class behind the scenes.

The order including your gremlin definitions does **not** matter, feel free to add them at the top or bottom of the page, as long as GremlinJS was included before, of course.  
Gremlins will be found as well, if you add the definitions some time later, eg. asynchronously with a script loader.

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


### Hello World!

The most basic gremlin alerting *"Hello World!"* would look like this:

``` html
<div data-gremlin="HelloWorld"></div>

<script>
  GremlinJS.define('HelloWorld', function () {
    alert("Hello World!");
  });
</script>

```

## The Gremlin
When you define gremlins with [`GremlinJS.define()`](api.html#gremlinjs-define), GremlinJS creates a Javascript constructor function that later will be instantiated with `new` for every gremlin element found in the document.  
This class inherits from an [abstract Gremlin class](api.html#gremlin). All it's properties, all the properties added by extensions and all the properties you define are available in every instance of this gremlin type.

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

### Inherited properties

### Add Options

### Lazy loading

  

## Using Extensions

## Building Extensions

## Grunt

## AMD