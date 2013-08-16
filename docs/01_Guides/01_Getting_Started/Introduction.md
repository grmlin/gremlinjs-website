GremlinJS allows you to organize your Javascripts in components called Gremlins. Learn how to create and use these Gremlins. 

## Introduction
Every dom element may use one or more Gremlins / Components. GremlinJS watches your site looking for these elements and creates Gremlin instances of Gremlin Classes you provided.

Gremlins are found with a special data attribute: `data-gremlin`. This happens *automagically* whenever a dom element with this attribute is or becomes a child node of the dom.

**Yepp, GremlinJS observes the dom for you.**

Components you'll write with GremlinJS are isolated from each other and function independently. To use a Gremlin in another project, all you'll do is copy a file and add some HTML markup. 
The code will be cleaner, easier to understand and understanding the work of others gets much easier, because whenever you see an element with a `data-gremlin` attribute, you will always and instantly know what javascript is responsible for it's behaviour.

### Include GremlinJS

#### Script element
[Download GremlinJS](build/0.4.0/gremlin.min.js) and include it in your HTML. From now on all gremlin components in the site will be found and instantiated.

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
GremlinJS uses the javascript JSON API to parse JSON strings in custom dom element data-attributes. (see [Gremlin Configuration](api.html#gremlinjs-reference_gremlin_gremlin-data) for details).

A more complete lists of supported browsers (desktop and mobile) will follow some day.