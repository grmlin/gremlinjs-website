Building extensions is easy. Create an object that implements the [`IExtension`](api.html#gremlinjs-reference_iextension) interface and register the extension.

Each extension has to provide two methods, `.bind()` and `.extend()`. Extensions won't be instantiated or called in a special context, extending GremlinJS in a meaningful way is your task.
If you created the extension add it with `GremlinJS.registerExtension()`.

If you're interested what the GremlinJS does with the included extension, read the code of the extension [already available](#extend-gremlinjs_using-extensions) for GremlinJS.

### .bind()

Binds the extension to a gremlin instance. Do whatever yout want to do with a gremlins instance in here.

[API docs](api.html#gremlinjs-reference_iextension_iextension-bind)


### .extend()

Change and extend the gremlin definition (constructor function, aka. class) in this handler.

[API docs](api.html#gremlinjs-reference_iextension_iextension-extend)

## Events

GremlinJS dispatches events while processing the document.

See the [api docs](api.html#gremlinjs-reference_gremlinjs_gremlinjs-on) and [example](examples.html#gremlinjs-basics_events) for more information.