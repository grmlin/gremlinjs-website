## gremlins
The main entry point creating gremlin components

### create

`Gremlin create(object specification)`

Creates a new gremlin based on [`specification`](#gremlin-component-specification). 
The spec is used for all custom elements later found in the dom

The spec has to provide one property, `name`, that is required. Unless you specify a `tagName`, the name will be used
create the custom element and it's tag name: `${name}-gremlin`.

#### Example

```js
var gremlins = require('gremlins');

gremlins.create({
  name: 'foo', // finds all custom elements <foo-gremlin></foo-gremlin>
  initialize: function(){
    this.el.innerHTML = 'Hello Foo';
  }
});
```

<br><br><br>

## Gremlin component specification

### name

`string name`

Unique component name. 
Without a `tagName` it will be used to create the custom elements tag name with the pattern `${name}-gremlin`:

```js
gremlins.create({
  name: 'foo'
});
```

```html
<foo-gremlin></foo-gremlin>
```
    

### tagName

`string tagName` 

Override the default tag name. It has to use a minimum of one hyphen, otherwise the custom element can't be created.

```js
gremlins.create({
  name: 'hello',
  tagName: 'hello-world'
});
```

```html
<hello-world></hello-world>
```
    
### el

`HTMLElement el`

The dom element for this component. Available inside the `initialize` call and all other component method

```js
gremlins.create({
  name: 'foo', 
  initialize: function(){
    this.el.innerHTML = 'Hello Foo';
  }
});
```

### mixins

`object mixins` 

An object, or an array of objects, used as mixin(s). This way it's easy to extend you're components capabilities in a modular way.  
If you're mixins and componenet use the same method names, they will be decorated and called in the order they were added to the spec.

### initialize() 

`function initialize()`

constructor function called for all instances on creation

### destroy()

`function destroy()`

called, when the element leaves the dom. Can be used to unbind event handlers and such

