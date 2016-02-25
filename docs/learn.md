<div class="alert alert-info">
	All examples in this documentation use the <a href="https://babeljs.io/docs/learn-es2015/">ES2015/ES6 syntax</a>. Use a compiler like <a href="https://babeljs.io/"> Babel </a>  to compile them into ES5 compatible Javascript.
</div>

## Custom Elements

Custom elements are a great way to add some custom behaviour to dom elements, in a reusable and modular manner. 
GREMLIN.JS offers a simple interface to create and describe these custom elements.

### Browser support

Creating custom elements with [`document.registerElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/registerElement)
is supported in modern Chrome, Firefox and Opera. For older browser there exists a small 
[polyfill](https://github.com/WebReflection/document-register-element), that's already included in GREMLIN.JS. If you 
need support for IE8, you'll have to include another script available at the 
[polyfills repository](https://github.com/WebReflection/document-register-element).

You can use the barebones GREMLIN.JS library, too, if you want to bring your own polyfill or prefer to live on the cutting edge.
Include the `lib/native.js` instead to omit the polyfill.

<br>

## Creating components

### The spec

Every gremlin component is described with a [component specification](api.md#component-specifications), an object 
literal providing methods, properties and an optional constructor function `initialize`.

You'll add the spec to GREMLIN.JS by calling the [`gremlins.create`](api.md#create) function.

property            | type                  | description
-------------       | -----                 |--------------
`mixin`             | Object, [Object]      | on or more mixins to use with this component
`initialize`        | Function              | will be called for all elements found after they were added to the dom
`destroy`           | Function              | will be called for all elements found when they are removed from the dom


```js
var gremlins       = require('gremlins');
var gremlinsJquery = require('gremlins-jquery');

gremlins.create('foo-gremlin', {
  mixins: [gremlinsJquery],
  initialize: function(){
    console.log('a new foo is in town!', this.el);
  }
});
```
<br>

### The custom element

When you created a spec, you can use the corresponding custom element to add gremlin components to your site. In fact,
it does not matter if you create the spec first, specs can be added after the element exists in the dom.
 
The custom element's (tag) name is created with the tag name you provide when creating the gremlin.

The spec
```js
gremlins.create('my-element'};
```

would be used for all

```html
<my-element>...</my-element>
```

elements.

<br>

#### Tag names

[Some theory first](http://w3c.github.io/webcomponents/spec/custom/#concepts):

> The custom element type identifies a custom element interface and is a sequence of characters that must match the NCName production, must contain a U+002D HYPHEN-MINUS character, and must not contain any uppercase ASCII letters.
 The custom element type must not be one of the following values:
 
> - annotation-xml
 - color-profile
 - font-face
 - font-face-src
 - font-face-uri
 - font-face-format
 - font-face-name
 - missing-glyph

**works: **  
`<foo-bar />` or `<my-tag />` 

**throws an exception: **  
`<foo />`, `<foo_bar />` or `<fooBar />`  


