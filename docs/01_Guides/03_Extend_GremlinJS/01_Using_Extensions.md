GremlinJS is highly extensible and allows you to add functionality to all of your gremlins at once.

You want to use a template engine like handlebars in your gremlins but don't want to add the code multiple times? Write an extension for it.

## Using Extensions

To use an extension make sure, that you include the extension before any gremlin. Once you've added an extension, it's automatically available to all of your gremlins.

Some extensions are exist for GremlinJS, if you meet the requirements, feel free to use them.

### Interests (PubSub)
Pub Sub extension that allows gremlins to interact with each other by dispatching messages.

``` html
<script src="gremlin.interests.min.js"></script>
```

[Download](https://github.com/grmlin/gremlinjs-interests) at Github, see the [Interests Docs](api.html#available-extensions_interests-pubsub) for details.


### Dom Elements
Extension providing element maps "vanilla javascript style".

**Don't use the jquery and dom elements extension at the same time!**

``` html
<script src="gremlin.domelements.min.js"></script>
```

[Download](https://github.com/grmlin/gremlinjs-domelements) at Github, see the [Dom Elements Docs](api.html#available-extensions_domelements) for details.

### jQuery
jQuery extension providing element and event maps.

**Don't use the jquery and dom elements extension at the same time!**

``` html
<script src="gremlin.jquery.min.js"></script>
```

[Download](https://github.com/grmlin/gremlinjs-jquery) at Github, see the [jQuery Docs](api.htmll#available-extensions_jquery) for details.
