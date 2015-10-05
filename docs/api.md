## GREMLINS
The main entry point creating gremlin components

### create

`Gremlin create(string tagName, object specification)`

Creates a new gremlin based on [`specification`](#gremlin-component-specification). 
The spec is used for all custom elements later found in the dom

The `tagName` will be used to register the new element with the dom.

#### Example

```js
var gremlins = require('gremlins');

gremlins.create('my-element', {
  initialize: function(){
    this.el.innerHTML = 'Hello Foo';
  }
});
```

will be used for all

```html
<my-element></my-element>
```

<br><br>

### findGremlin

`gremlin findGremlin(HTMLElement element)`

Returns the gremlin instance for a dom element.

#### Example

```js
var gremlins = require('gremlins');

var g = gremlins.findGremlin(el);
```

<br><br><br>

## COMPONENT SPECIFICATION

### mixins

`object mixins` 

An object, or an array of objects, used as mixin(s). This way it's easy to extend you're components capabilities in a 
modular way.  


```js
var gremlinsJquery = require('gremlins-jquery');

gremlins.create({
  mixins: [gremlinsJquery],
  name: 'foo', 
  initialize: function(){
    this.$el.text('Hello Foo');
  }
});
```

### initialize() 

`function initialize()`

constructor function called for all instances on creation

### destroy()

`function destroy()`

called, when the element leaves the dom. Can be used to unbind event handlers and such

### attributeDidChange()

`function attributeDidChange(String attributeName, previousValue, value)`

called, when an attribute of the dom element changed

## Component
    
### el

`HTMLElement el`

The dom element for this component. Available inside the `initialize` call and all other component methods

```js
gremlins.create({
  name: 'foo', 
  initialize: function(){
    this.el.innerHTML = 'Hello Foo';
  }
});
```


## MIXINS / MODULES

Mixins are an easy way to share component behaviour between components.   
Mixins are simple javascript object literals extending the components prototype. 

If a mixin and a component or another mixin use the same method names, they will be decorated and called in the order 
they were added to the spec, the mixins are always called before the actual spec method.

<span class="label label-primary">mixin</span>
```js
var gremlinsJquery = {
  initialize: function(){
    this.$el = $(this.el);
  }
}
```

<br>  
<span class="label label-primary">specification</span>
```js
gremlins.create('my-element', {
  mixins: [gremlinsJquery],
  initialize: function(){
    this.$el.text('Hello Foo');
  }
});
```