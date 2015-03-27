## Custom Elements

Custom elements are a great way to add some custom behaviour to dom elements, in a reusable and modular manner. 
GREMLIN.JS offers a simple interface to create and describe these custom elements.

### Browser support

Creating custom elements with [`document.registerElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/registerElement)
is supported in modern Chrome, Firefox and Opera. For older browser there exists a small 
[polyfill](https://github.com/WebReflection/document-register-element), that's already included in GREMLIN.JS. If you 
need support for IE8, you'll have to include another script available at the 
[polyfills repository](https://github.com/WebReflection/document-register-element).

<br>

## Creating components

### The spec

Every gremlin component is described with a [component specification](api.md#component-specifications), an object literal providing methods, properties and an optional 
constructor function `initialize`.

You'll add the spec to GREMLIN.JS by calling the [`gremlins.create`](api.md#create) function.

property     | description
-------------|--------------
String `name`       | **required**, the unique name of this component
Function `initialize` | will be called for all elements found in the site and added to the dom
HTMLElement `el`         | is a reference to the dom element and added for you by GREMLIN.JS
Function `create`     | **readonly** gremlin inheritance can't be overwritten.

```js
var gremlins = require('gremlins');

gremlins.create({
  name: 'foo',
  initialize: function(){
    console.log('a new foo is in town!', this.el);
  }
});
```
<br>

### The custom element

When you created a spec, you can use the corresponding custom element to add gremlin components to your site. In fact,
it does not matter if you create the spec first, specs can be added after the element exists in the dom.
 
The custom element's (tag) name is created with the `name` property of the gremlin's  spec as the first part.

`<[name]-gremlin />`

So the spec 
```js
gremlins.create({
  name: 'foo'
)};
```

would be used for all

```html
<foo-gremlin>...</foo-gremlin>
```

elements.

<br>

#### But I don't like these tag names

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

-----

If you keep these restrictions in mind, feel free to use the [`tagName`](api.md#tagname) property in the components spec to overwrite the
default behaviour and use tag names you like.

So the spec 
```js
gremlins.create({
  name: 'foo',
  tagName: 'my-foo'
)};
```

would be used for all

```html
<my-foo>...</my-foo>
```
elements


<br>

## Using mixins

