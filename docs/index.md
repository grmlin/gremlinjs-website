no_nav: true

<div class="text-center">
    <p>
        <br><br>
        <img alt="logo" src="./img/logo.png">
    </p>
</div>

# GREMLIN.JS <small>dead simple web components</small>

<div class="lead">
GREMLIN.JS is a dependency-free library to build web components. Web components for boringly normal websites, all your
websites. Webapps are not for everyone and everything, but modular and well organized code is.
</div>

## How does it feel?

<div class="alert alert-info">
	All examples in this documentation use the <a href="https://babeljs.io/docs/learn-es2015/">ES2015/ES6 syntax</a>. Use a compiler like <a href="https://babeljs.io/"> Babel </a>  to compile them into ES5 compatible Javascript.
</div>

<br>
**Add a custom dom element**
``` html
<hello-world>
  <p data-content></p>
</hello-world>
```
<br>
**Add a spec** 
``` js
gremlins.create('hello-world', {
  initialize: function(){
    this.el.querySelector('[data-content]').textContent = 'Hello World!';
  }
});
```

<br>
**done**
<div class="well well-sm">
    <hello-world>
      <span data-content></span>
    </hello-world>
</div>

## Installation

### NPM

    $ npm install --save gremlins 
    
    
### Classic
download the latest relase [at github](https://github.com/grmlin/gremlins) and include the minified file found in `dist`

     <script src="gremlins.js" />
     
## Usage
     
### Browserify, Webpack

	import gremlins from 'gremlins';

    
### Global

    const gremlins = window.gremlins;

*the global namespace isn't available in a common-js/es2015-module environment*    
<br><br><br>