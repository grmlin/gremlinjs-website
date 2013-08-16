
You are adding some `data-gremlin` attributes to dom elements and create Javascript functions defining them. How will GremlinJS associate and instantiate them, what do you have to do?

### Auto discovery
**Nothing**!
GremlinJS finds every single dom element with a `data-gremlin` attribute in the document and instantiates the related gremlin class.

It does not matter if the element is a child of the document on page load or added later with Javascript, GremlinJS will find it.



#### Detection strategies

Sorted by preference, first strategy a browser supports is used.

1. [`MutationObserver`](http://devdocs.io/dom/mutationobserver)
2. [CSS animation callbacks](http://www.backalleycoder.com/2012/04/25/i-want-a-damnodeinserted/)
3. Interval

This works best in modern browsers of course. The old ones, not supporting CSS-Animations or the `MutationObserver` will use an interval to check the dom for changes.
The old, slow and deprecated events to detect changes in the document are not included!

### CSS animations
GremlinJS uses the [`animationstart`](http://devdocs.io/dom_events/animationstart) event to detect new gremlin elements in browsers not supporting `MutationObserver` and checks the animation name before searching for new elements.

**DON'T ADD ANY CSS-ANIMATIONS TO THE GREMLIN ELEMENT ITSELF!**
**It will break the auto detection of GremlinJS**