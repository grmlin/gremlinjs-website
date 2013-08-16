

## The Gremlin
When you define gremlins with [`GremlinJS.define()`](api.html#gremlinjs-reference_gremlinjs_gremlinjs-define), GremlinJS creates a Javascript constructor function that later will be instantiated with `new` for every gremlin element found in the document.
This class inherits from an [abstract Gremlin class](api.html#gremlinjs-reference_gremlin). All it's properties, all the properties added by extensions and all the properties you define are available in every instance of this gremlin type.
The same applies to classes added with `GremlinJS.add()`.

### Inherited properties
Every class properly created will add some useful members to every gremlin instance.

#### Gremlin#data

Object providing all parsed data-attributes of the gremlin's dom element.

See ["add options"](#master-the-horde_the-gremlin_add-options) for a more detailed explanation.

#### Gremlin#el

A reference of the dom element the gremlin was added to.
**This element should always be the starting point for all your dom manipulations, queryselectors etc...**

``` js
this.el.innerHTML = "Hello World!";
```

#### Gremlin#id

Unique id amongst all gremlin instances.

#### Gremlin#klass

Reflects the class of the instance (something that Javascript doesn't).

Especially handy, when you define static gremlin members with [`GremlinJS.define()`](api.html#gremlinjs-reference_gremlinjs_gremlinjs-define) and want to access them from inside an instance.

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
GremlinJS fulfills this desire by parsing data-attributes similar to jQuery. GremlinJS adds a `data`-property to every instance providing the values of the attributes.  See [`Gremlin#data`](api.html#gremlinjs-reference_gremlin_gremlin-data) for details.

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
