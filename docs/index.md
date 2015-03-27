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


**Add a custom dom element**

``` html
<hello-gremlin>
  <p data-content></p>
</hello-gremlin>
```

**Add a spec**

``` javascript
gremlins.create({
  name: 'hello',
  initialize: function(){
    this.el.querySelector('[data-content]').textContent = 'Hello World!';
  }
});
```

**done**

<div class="well well-sm">
    <hello-gremlin>
      <span data-content></span>
    </hello-gremlin>
</div>

## Installation

### NPM

    $ npm install gremlins --save
    
### Bower

    $ bower install gremlins
    
### Classic
download from [`dist` at github](https://github.com/grmlin/gremlins) and include it

     <script src="gremlins.js" />
     
## Usage
     
### Browserify, Webpack

    var gremlins = require('gremlins');
    
### Global

    var gremlins = window.gremlins;
    
<br><br><br>