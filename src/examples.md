# GremlinJS Basics

Gremlins can be written with [CoffeeScript](http://coffeescript.org/) (the little language GremlinJS was build with) or Javascript.

The examples below exist in both variants and are embedded with [codepen.io](http://codepen.io/). You'll see the CoffeeScript example by default. A link to the Javascript version of it can be found next to it.   
Some of the examples will work in modern browsers, only!

## Hello World!

The most basic gremlin prints *Hello World!*, of course. The one in the Example below modifies the gremlin element's `innerHTML` property to do so.

### HTML

The gremlin is added to the dom with the following html.

``` html
<div data-gremlin="HelloWorld"></div>
```

 
### Definition

In this example, every instance of a `HelloWorld` gremlin will 1.) call the method `HelloWorld#talk()` from inside the constructor and 2.) change the html content of `#el` to the content of the static property `HelloWorld.GREETING`.

 
<p data-gremlin="Codepen" data-height="300" data-theme-id="0" data-slug-hash="yDrKb" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/yDrKb'>GremlinJS - Hello World</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

[This example in Javascript](http://codepen.io/grmlin/pen/IqFbf)


## Multiple Gremlins

Feel free to add as many gremlin types to a single element as you want.

### HTML

Separate the names with a `,`. 

``` html
<div data-gremlin="GremlinA, GremlinB, GremlinC"></div>
```

### Definition

In this example, every gremlin prints *Hello World! GremlinXYZ here*.


<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="300" data-theme-id="0" data-slug-hash="xrLHz" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/xrLHz'>GremlinJS - Multiple Gremlins (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>


[This example in Javascript](http://codepen.io/grmlin/pen/xciDp)


## Auto discovery

GremlinJS discovers all gremlin elements for you fully automatically. 

### Definitions
In the example there are two gremlin definitions. `HelloWorld` and `Builder`.   
A click on the `Builder` element will append a new div with the attribute `data-attribute="HelloWorld"`to the document body.  
When attached to the document, the `HelloWorld` gremlin is found and processed. Nothing else is necessary to get the gremlin instantiated by GremlinJS.

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="300" data-theme-id="0" data-slug-hash="wCthx" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/wCthx'>GremlinJS - Auto loading (JS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Gremlin properties 

Every Gremlin instance comes with some useful properties. 

### #data, setting gremlin options

Object providing all parsed data-attributes of the gremlin's dom element. Everything you add to the element via an `data` attribute will be published into the gremlins `#data` property.

See ["add options"](#add-options) for a more detailed explanation.

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="193" data-theme-id="0" data-slug-hash="zBtHn" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/zBtHn'>GremlinJS - #data (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

[This example in Javascript](http://codepen.io/grmlin/pen/Ljwod)


### #el,  the gremlin element

A reference of the dom element the gremlin was added to. See the example above. The gremlin's content is changed by setting the `innerHTML` property of `#el`.

``` html
@el.innerHTML = html 
```

### #id, unique identifier

Every gremlin has a unique ID, a number incremented for every gremlin found in the document. 

In the example below, `GREETING` is a static property of the `HelloWorld` gremlin and used to change the gremlin's `innerHTML`.

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="200" data-theme-id="0" data-slug-hash="grstB" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/grstB'>GremlinJS - #id (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

[This example in Javascript](http://codepen.io/grmlin/pen/ndCgD)

### #klass, class reflection

If you add static members to a gremlin class with CoffeeScript, or create some with `.define()`, the `Gremlin#klass` property will be useful. It reflects the original class. Use it to access static members from inside the instance.

<p data-gremlin="Codepen" data-height="300" data-theme-id="0" data-slug-hash="yDrKb" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/yDrKb'>GremlinJS - Hello World</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

[This example in Javascript](http://codepen.io/grmlin/pen/IqFbf)
 
## Lazy loading

An awesome feature is lazy loading of the gremlins in the document. They will be instantiated if they are scrolled into the viewport.

The embedded codepen samples on this page are lazy loaded gremlins. The page loads fast and examples are loaded only when necessary.

### HTML

The example below is a `Modal` gremlin showing a a modal window from [twitter bootstrap](http://getbootstrap.com/javascript/#modals) when instantiated.   
To activate lazy loading an additional attribute is added, `data-gremlin-lazy="true"`.

``` html
<div data-gremlin="Modal" data-gremlin-lazy="true">
  <p>Modal ahead...</p>
  <div class="modal">
    ...
  </div>
</div>
```

### Definition

All the gremlin does is adding the css style `display: block` to the `<div class="modal"></div>` inside when found and instantiated.   
Furthermore the debug mode is enabled. Have a look into the lower left corner of the sample to see the current status of the document's gremlins.

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="260" data-theme-id="0" data-slug-hash="FDuhg" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/FDuhg'>GremlinJS - Lazy Loading (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>


# Extensions

# AMD / Require