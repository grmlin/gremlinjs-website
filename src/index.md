GremlinJS will help you add modular, robust and well organized Javascript functionality to all the *classic* websites incoming.   
**GremlinJS isn't for everyone**: it is no MVC library, does not provide magic binding tricks... but all the sites built *Spaghetti* style without **any** supporting layer at all will benefit greatly.

## Gremlins?

#### 1. Include GremlinJS

``` html
<script src="http://grmlin.github.io/gremlinjs-website/build/latest/gremlin.min.js"></script>    
```
#### 2. Add a Gremlin

``` html
<div data-gremlin="Gizmo"></div>
```
#### 3. Done

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="580" data-theme-id="0" data-slug-hash="jhIig" data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a href='http://codepen.io/grmlin/pen/jhIig'>GremlinJS - Slideshow (CS)</a> by Andreas (<a href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>

[This example in Javascript](http://codepen.io/grmlin/pen/vsxDk)

## Why?

**Because Gremlins are cute, of course!**   
If this isn't enough for you, think of your current way adding Javascript functionality to websites. In most cases jQuery will be used, plugins are included, and in the best case, there is some sort of `main.js` that handles all the magic inside a `$(document).ready` handler.     
This tends to end in a huge mess of hardly maintainable code snippets and it's up to you to initialize new elements added with Javascript to the document.

GremlinJS forces you to write modular and sandboxed Javascript that can be used everywhere. It will manage all components for you, takes care of them and initializes every single one when needed. 

*btw: it works fully autonomously*   

## Awesome, where to start?

[**Download GremlinJS**](build/latest/gremlin.min.js), read [the guides](guides.html), see [the examples](examples.html) or learn about GremlinJS in the [api docs](api.html).

