### Autoloader CDN based on package.json dependencies, and unpkg.com

Useful when you needed to load everything from one file,
for example a library with tons of dependencies,
you won't bundle everything, just create `autoloader.js` file in your project.
## Install

You can install this package with `npm`.

### npm

```shell
npm install --save autoloader_cdn
```

### CDN

Can also be found on [unpkg.com](https://cdnjs.com/libraries/nestable2):

```
//unpkg.com/cdn-autoloader@1.0.0/dist/autoloader_cdn.js
//unpkg.com/cdn-autoloader@1.0.0/dist/autoloader_cdn.min.js
```

## Basic usage example
#####1. Add a `<script>` tag to your `index.html`
```html
<script>
window.autoloader_cdn_options = {
    env: 'development',
    pkgDependencies: {
       "jquery": "^1.7.2"
    },
    loadDependencies: {
        "jquery": {},
        "jquery-contextmenu": {
            fileName: "jquery.contextMenu",
        },
        "video.js": {
            fileName: 'video'
        },
        "videojs-hotkeys": {
            fileName: 'videojs.hotkeys',
            path: "/"
    
        },
        "clipboard": {},
        "owl.carousel": {},
   }
};
</script>
```
Available options here
* `env` environment variable(`development`,`production`), if production, will load minified files (default `production`)
* `pkgDependencies` usually that's the place to put package.json dependencies directly (default: `{}`), it has two parameters: package name, and it's version.
* `loadDependencies` the order of dependencies are loaded, and each with following parameters by default:
```html
{
    pkgName: key,
    version: pkgDependencyVersion,
    path: '/dist/',
    fileName: key,
    fileMin: '.min',
    fileExt: '.js'
}
``` 
* `urlTemplate` The url structure (default: `https://unpkg.com/[pkgName]@[version][path][fileName][fileMin][fileExt]`), unrecommended to change.
#####2. Add another `<script>` tag to your `index.html`:

```html
  <script src="autoloader_cdn.js"
            deps="true"
            deps-before="anotherCss.css"
            deps-after="cssExample.css,scriptExample.js">
    </script>
```
Available options here:

* `deps` dependencies should be included? (default `false`)
* `deps-exclude` what to exclude from dependencies (sepparated by comma `,`, ex: `jquery,bootstrap`)
* `deps-before` what to include before all dependencies added (sepparated by comma `,`, ex: `https://code.jquery.com/jquery-2.2.4.min.js,https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js`)
* `deps-after` the same like `deps-before` but the opposite .

#####3. Add last one `<script>` tag to your `index.html`:
```html
autoloader.loadjs.ready('bundle', function() {
        $('body').html('Jquery works!!');
    });

```

## Recommended usage example(webpack)
A recommended way is to use js precompilers,
 that allows to include the package.json,
 and send all the dependencies to the configuration automatically,
 so in this case the dependencies versions will be parsed from package.json.
 include it to `pkgDependencies` parameter.

#####1.  Add to your code 
```js 
var pkg = require('./package'); 
var autoloader_cdn = require('autoloader_cdn');
var autoloader = autoloader_cdn({
        env: 'development',
        pkgDependencies: pkg.dependencies,
        loadDependencies: {
              "jquery": {},
              "jquery-contextmenu": {
                  fileName: "jquery.contextMenu",
              },
              "video.js": {
                  fileName: 'video'
              },
              "videojs-hotkeys": {
                      fileName: 'videojs.hotkeys',
                      path: "/"
          
              },
              "clipboard": {},
              "owl.carousel": {},
         }
    });
    
module.exports = autoloader.loadjs;
```
Create a `UMD` library from this, for example with webpack, library named `autoloader`, also is recommended to use `webpack.DefinePlugin`, to send special values from `package.json`.

#### 2. After all add two `<script>` tags to your `index.html` 
```html
<script src="autoloader.js"
            deps="true"
            deps-before="anotherCss.css"
            deps-after="cssExample.css,scriptExample.js">
</script>
<script>
autoloader.ready('bundle', function() {
        $('body').html('Jquery works!!');
    });
</script>
```
That's all, enjoy.
## Change Log

### 9th July 2018
* [geoshar] First 1.0.0 version added.
* [geoshar] First documentation added.

Copyright © 2018 Georgy Sharapov | BSD & MIT license
