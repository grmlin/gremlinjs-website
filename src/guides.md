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

If GremlinJS finds a suitable dom element, one that provides the `data-gremlin="NAME"` attribute, a new instance of the Gremlin `NAME`, inherited from the [abstract gremlin class](api.html#gremlin), will be created. This instance does, beside the members and methods you defined, provide some useful properties you may need later.

> GremlinJS uses constructor functions, the protoype chain and the new keyword to create gremlin instances internally. So no matter how many gremlins of a certain type are present in the document and instantiated, they'll use the beauty and speed of the prototype.

To make the developer's life easier, GremlinJS provides a helper method to add gremlin definitions.  [`GremlinJS.define()`](api.html#gremlinjs-define)

#### `GremlinJS.define(name, constructor [, instanceMembers] [, staticMembers])`

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
### name
### constructor

### instance properties

### static properties

### defining options

### lazy loading

  

## Using Extensions

## Building Extensions

## Grunt

## AMD