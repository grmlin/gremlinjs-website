<div class="lead">
    <span class="gremlinjs">gremlin.js</span>, a dependency-free library to build <abbr title="aka: Gremlins">Javascript components</abbr>.
</div>
<hr/>
<div class="row">
    <div class="span5">
        <h3>Tasty Vanilla</h3>

        <p>
            <span class="gremlinjs">gremlin.js</span> has no dependencies! Use it with
            <a href="https://developer.mozilla.org/docs/JavaScript">vanilla js</a>,
            <a href="http://jquery.com/">jQuery</a>,
            <a href="http://zeptojs.com/">zepto</a> or any other library you want.
        </p>
    </div>
    <div class="span5">
        <h3>Modular</h3>

        <p>
            Gremlins are modular pieces of code describing the behaviour of dom
            elements.
            Fight the unorganized code masses, <span class="gremlinjs">gremlin.js</span> does the dirty work.
        </p>
    </div>
</div>
<div class="row">
    <div class="span5">
        <h3>Fast and Lightweight</h3>

        <p>
            <span class="gremlinjs">gremlin.js</span> was build with performance in mind. Using hundreds of inefficient dom
            selectors is slow. <span class="gremlinjs">gremlin.js</span> uses <strong>a single</strong> dom query to find elements
            in
            the document that should be enhanced with Javascript
        </p>
    </div>
    <div class="span5">
        <h3>Easy to use</h3>

        <p>
            <span class="gremlinjs">gremlin.js</span> is well documented and works completely autonomous. Concentrate on
            implementing dom behaviour and don't get lost in meta tasks anymore.
        </p>
    </div>
</div>
<div class="row">
    <div class="span5">
        <h3>Lazy Loading</h3>

        <p>
            Want to add lots of cpu intensive components to the document? Load the components when
            entering the viewport and minimize the load times of a site.
        </p>
    </div>
    <div class="span5">
        <h3>Extensions</h3>

        <p>
            Extend <span class="gremlinjs">gremlin.js</span> by yourself or use the existing AMD, PubSub, jQuery and domElements
            extensions.
        </p>
    </div>
</div>
<div class="clear"></div>


<hr/>



## Gremlins?

<span class="gremlinjs">gremlin.js</span> will help you add modular, robust and well organized Javascript functionality to all the *classic* websites existing and created in the future.

*Classic?* <span class="gremlinjs">gremlin.js</span> isn't for every website: it is no MVC library, does not provide magic binding tricks, it was not created to add another SPA (single page application) client library to the list... **It's a library for the masses.** All the sites currently built *Spaghetti* style without **any** supporting layer that helps you structuring the site and organizing the code at all will benefit greatly.


#### 1. Include gremlin.js

``` html
<script src="js/gremlin.min.js"></script>
```

#### 2. Add a Gremlin

``` html
<div data-gremlin="Slideshow"></div>
```

#### 3. Done

<p data-gremlin="Codepen" data-gremlin-lazy="true" data-height="510" data-theme-id="543" data-slug-hash="jhIig"
   data-user="grmlin" data-default-tab="result" class='codepen-lazy'>See the Pen <a
        href='http://codepen.io/grmlin/pen/jhIig'>gremlin.js - Slideshow (CS)</a> by Andreas (<a
        href='http://codepen.io/grmlin'>@grmlin</a>) on <a href='http://codepen.io'>CodePen</a></p>
[This example in Javascript](http://codepen.io/grmlin/pen/vsxDk)

## Why?

**Because Gremlins are cute, of course!**   
If this isn't enough for you, think of your current way adding Javascript functionality to websites. In most cases jQuery will be used, plugins are included, and in the best case, there is some sort of `main.js` that handles all the magic inside a `$(document).ready` handler.
This tends to end in a huge mess of hardly maintainable code snippets and it's up to you to initialize new elements added with Javascript to the document.

<span class="gremlinjs">gremlin.js</span> forces you to write modular and sandboxed Javascript that can be used everywhere. It will manage all components for you, takes care of them and initializes every single one when needed.

*btw: <span class="gremlinjs">gremlin.js</span> works fully autonomously*

<br>
## Awesome, where to start?

[**Download <span class="gremlinjs">gremlin.js</span>**](build/latest/gremlin.min.js), read [the guides](guides.html), see [the examples](examples.html) or learn about <span class="gremlinjs">gremlin.js</span> in the [api docs](api.html).


## Thanks
- [Matthias](http://www.matzilla.de/) for the logo
- [DECAF](http://decaf.de/) for the support
- ... anyone else who supported me creating <span class="gremlinjs">gremlin.js</span>, of course


- Using CSS animation callbacks to detect dom changes [is an awesome idea](http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/)
- [Flatdoc](http://ricostacruz.com/flatdoc/), this site was generated with it
- [daux.io](http://daux.io/), for the layout inspirations