# Google Closure Tools

Google Closure Tools build python files on npm

## Quick Start

Install...
```shell
npm istall superstartup-closure-compiler --save-deps
```

* **getPath( filename )**
  - Get the relative path for the defined `filename`.
  - The `filename` can have any value that coresponds to [Google Closure's Tools folder][closure-bin].

example:
```js
var closureTools = require('closure-tools'),
    exec     = require('require('child_process').exec');

/* ... */

// prepare the closurebuilder command
var command = closureTools.getPath('build/closurebuilder.py') + ' ' + buildOptions;

// run the closureTools command
exec( command, cb );

```

## The Closure `bin` Contents

This is the current breakout of the [Google Closure's Tools folder][closure-bin], and in effect all the possible values the `getPah()` method will make sense:

```text
build/closurebuilder.py
build/depstree_test.py
build/source_test.py
build/depstree.py
build/depswriter.py
build/source.py
build/treescan.py
build/jscompiler.py
calcdeps.py
scopify.py
```

[closure-bin]: http://code.google.com/p/closure-library/source/browse/#git%2Fclosure%2Fbin "Google closure bin folder"
