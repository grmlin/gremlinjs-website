# Basics

Gremlins can be written with [CoffeeScript](http://coffeescript.org/) (the little language <span class="gremlinjs">gremlin.js</span> was build with) or Javascript.

The examples below exist in both variants and are embedded with [codepen.io](http://codepen.io/). You'll see the CoffeeScript example by default. A link to the Javascript version of it can be found next to it.   
Some of the examples will work in modern browsers, only!

## Hello World!

The most basic gremlin prints *Hello World!*, of course. The one in the Example below modifies the gremlin element's `innerHTML` property to do so.

### HTML

The gremlin is added to the dom with the following html.

``` html
<div data-gremlin="HelloWorld"></div>
```

 
### JS

In this example, every instance of a `HelloWorld` gremlin will 1.) call the method `HelloWorld#talk()` from inside the constructor and 2.) change the html content of `#el` to the content of the static property `HelloWorld.GREETING`.

Read the guides to learn [how to create gremlins](guides.html#master-the-horde_creating-gremlins) in Javascript and Coffeescript
 
<p data-gremlin="Codepen" data-height="300" data-theme-id="543" data-slug-hash="yDrKb" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/yDrKb'><span class="gremlinjs">gremlin.js</span> - Hello World</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

[This example in Javascript](http://codepen.io/grmlin/pen/IqFbf)


## Multiple Gremlins

Feel free to add as many gremlin types to a single element as you want.

### HTML

Separate the names with a `,`. 

``` html
<div data-gremlin="GremlinA, GremlinB, GremlinC"></div>
```

### JS

In this example, every gremlin prints *Hello World! GremlinXYZ here*.


<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="300" data-theme-id="543" data-slug-hash="xrLHz" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/xrLHz'><span class="gremlinjs">gremlin.js</span> - Multiple Gremlins (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

[This example in Javascript](http://codepen.io/grmlin/pen/xciDp)


## Auto discovery

<span class="gremlinjs">gremlin.js</span> discovers all gremlin elements for you fully automatically.

### JS
In the example there are two gremlin definitions. `HelloWorld` and `Builder`.   
A click on the `Builder` element will append a new div with the attribute `data-attribute="HelloWorld"`to the document body.  
When attached to the document, the `HelloWorld` gremlin is found and processed. Nothing else is necessary to get the gremlin instantiated by <span class="gremlinjs">gremlin.js</span>.

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="241" data-theme-id="543" data-slug-hash="quFta" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/quFta'><span class="gremlinjs">gremlin.js</span> - Auto Discovery (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

[This example in Javascript](http://codepen.io/grmlin/pen/wCthx)


## Gremlin properties 

Every Gremlin instance comes with some useful properties. 

### setting gremlin options

Object providing all parsed data-attributes of the gremlin's dom element. Everything you add to the element via an `data` attribute will be published into the gremlins `#data` property.

See ["add options"](api.html#api-reference_gizmo_gizmo-data) for a more detailed explanation.

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="193" data-theme-id="543" data-slug-hash="zBtHn" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/zBtHn'><span class="gremlinjs">gremlin.js</span> - #data (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

[This example in Javascript](http://codepen.io/grmlin/pen/Ljwod)


### the gremlin element

A reference of the dom element the gremlin was added to. See the example above. The gremlin's content is changed by setting the `innerHTML` property of `#el`.

``` html
@el.innerHTML = html 
```

### unique identifier

Every gremlin has a unique ID, a number incremented for every gremlin found in the document. 

In the example below, `GREETING` is a static property of the `HelloWorld` gremlin and used to change the gremlin's `innerHTML`.

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="200" data-theme-id="543" data-slug-hash="grstB" data-user="grmlin" data-default-tab="js" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/grstB'><span class="gremlinjs">gremlin.js</span> - #id (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

[This example in Javascript](http://codepen.io/grmlin/pen/ndCgD)

### class reflection

If you add static members to a gremlin class with CoffeeScript, or create some with `.define()`, the `Gremlin#klass` property will be useful. It reflects the original class. Use it to access static members from inside the instance.

<p data-gremlin="Codepen" data-height="300" data-theme-id="543" data-slug-hash="yDrKb" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/yDrKb'><span class="gremlinjs">gremlin.js</span> - Hello World</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

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

### JS

All the gremlin does is adding the css style `display: block` to the `<div class="modal"></div>` inside when found and instantiated.   
Furthermore the debug mode is enabled. Have a look into the lower left corner of the sample to see the current status of the document's gremlins.

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="260" data-theme-id="543" data-slug-hash="FDuhg" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/FDuhg'><span class="gremlinjs">gremlin.js</span> - Lazy Loading (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Events

<span class="gremlinjs">gremlin.js</span> dispatches some events while searching gremlins and instantiating them.

- [`Gizmo.ON_ELEMENT_FOUND`](api.html#api-reference_gremlin_on-element-found)

- [`Gizmo.ON_DEFINITION_PENDING`](api.html#api-reference_gremlin_on-definition-pending)

- [`Gizmo.ON_GREMLIN_LOADED`](api.html#api-reference_gremlin_on-gremlin-loaded)


The example below uses all three events and logs the event type and the affected element into the console.

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="306" data-theme-id="543" data-slug-hash="cyxbB" data-user="grmlin" data-default-tab="js" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/cyxbB'><span class="gremlinjs">gremlin.js</span> - Events (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Debugging

Sometimes, with documents full of gremlins, it can be very helpful to get visual feedback in the site and console logs or errors of the gremlins. `Gremlin.debug` does that.

### HTML

Activate debugging by changing the <span class="gremlinjs">gremlin.js</span> configuration at the document `body`. By doing so, debugging is activated, console logs are printed and gremlins are highlighted visually in the document.

``` html
<body data-gremlin-config='{"debug":true}'> ... </body>
```

### JS

Programmatically the debugger can be used to use the browser console in debug mode.
 
``` js
G.debug.console.log("Hello World!");
```

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="280" data-theme-id="543" data-slug-hash="qpmEc" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/qpmEc'>qpmEc</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>


# Extensions

## Interests
Pub Sub extension that allows gremlins to interact with each other by dispatching messages.

See the [api docs](api.html#available-extensions_interests-pubsub) for more details.

In the example below, the gremlin `Chatterbox` dispatches events and the gremlin `Logger` listenes to them. Every time the input of `Chatterbox` contains a text and is submitted, it dispatches the event `"log"`: 

``` js
this.emit("log", { 
  msg: msg 
});
```

`Logger` on the other hands declares an interest for this type of event:

``` js
interest: {
  log: 'onLog'
}
```

Every time any gremlin dispatches the event `"log"`, the `onLog()` method will be called. It adds the message to the document.

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="370" data-theme-id="543" data-slug-hash="aCJDL" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/aCJDL'><span class="gremlinjs">gremlin.js</span> - Extension - Interests (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

## jQuery

The jQuery introduces two new features to every gremlin, [event](api.html#available-extensions_jquery_gremlin-events) and [element](api.html#available-extensions_jquery_gremlin-elements) maps. Additionally, the instance property `$el` references the jQuery object of the gremlin's dom element.

The example uses all of these features.  
A click handler on the button is added

``` js
events : {
	"click button" : "onClick"
}
```

The span the timestamp will be added to on click is bound

``` js
elements: { 
    '.timestamp' : 'timestamp' 
}
```

Even `$el` is used to add a border to the gremlin.

see [momentjs](http://momentjs.com/)

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="353" data-theme-id="543" data-slug-hash="jIhyA" data-user="grmlin" data-default-tab="js" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/jIhyA'><span class="gremlinjs">gremlin.js</span> - Extension - Interests (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

## domElements

Extension providing element maps javascript "vanilla style".

The example adds the instance property `timestamp`, a node list. Internally `timestamp` is the result of `this.el.querySelectorAll(".timestamp")`

``` js
elements : {
	".timestamp" : "timestamp"
}
```

In the constructor `timestamp` is used to add a, surprise, timestamp to the document.

``` js
this.timestamp.innerHTML = moment().format('LLL') 
```

see [momentjs](http://momentjs.com/)

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="234" data-theme-id="543" data-slug-hash="mJkHL" data-user="grmlin" data-default-tab="js" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/mJkHL'><span class="gremlinjs">gremlin.js</span> - Extension - domElements (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

## Building your own

It's easy to add custom extensions to your gremlins, 1) implement the extension and 2) register it.

Every extension has to provide two methods, `.bind()` and `.extend()`. See [the api docs](api.html#api-reference_iextension) for a more detailed explanation.

#### .extend()
The extension below adds a static string `Greeting` to the abstract gremlin class and `talk()` method to the gremlin prototype.

#### .bind()
Furthermore, the extension assigns an instance property for every gremlin instance, `#contentId`, a unique id incremented by the extension itself.

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="318" data-theme-id="543" data-slug-hash="svboK" data-user="grmlin" data-default-tab="js" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/svboK'><span class="gremlinjs">gremlin.js</span> - Custom extension (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

[This example in Javascript](http://codepen.io/grmlin/pen/mAGDC)

# AMD / Require

*coming soon*