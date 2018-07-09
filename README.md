### Autoloader CDN based on package.json dependencies, and unpkg.com

Useful when you needed to load everything from one file,
for example a library with tons of dependencies,
you won't bundle everything, just create 5kb `autoloader.js` file in your project.
## Install

You can install this package with `npm`.

### npm

```shell
npm install --save autoloader-cdn
```

### CDN

Can also be found on [unpkg.com](https://unpkg.com/autoloader-cdn):

```
//unpkg.com/autoloader-cdn@1.0.2/dist/autoloader.cdn.js
//unpkg.com/autoloader-cdn@1.0.2/dist/autoloader.cdn.min.js
```

## Basic usage example
##### 1. Add a `<script>` tag to your `index.html`
```html
    <script src="../dist/autoloader.cdn.js"></script>
    <script type="text/javascript">
         var autoloader = autoloaderCdn({
             env: 'development',
             deps: true,
             pkgDependencies: {
                 "jquery": "^1.8.2"
             },
             loadDependencies: {
                 "jquery": {
                     version: "3.3.1"
                 },
                 "video.js": {
                     fileName: 'video',
                     version: "7.0.5"
                 }
             }
         });
        autoloader.loadjs.ready('bundle', function() {
            $('body').html('Jquery works!!');
        });
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

## Recommended usage example(webpack)
A recommended way is to use js precompilers,
 that allows to include the package.json,
 and send all the dependencies to the configuration automatically,
 so in this case the dependencies versions will be parsed from package.json.
 include it to `pkgDependencies` parameter.

##### 1. Create new file `autoloader.js`, add it for `webpack` - `entry.autoloader`, then use this: 
```js 
// provide the path to package.json, or use webpack DefinePlugin insead.
var pkg = require('./package'); 
// require the library
var autoloaderCdn = require('autoloader-cdn');
// library initialization
var autoloader = autoloaderCdn({
             env: 'development',
             pkgDependencies: pkg.dependencies,
             loadDependencies: {
                 "jquery": {
                     version: "3.3.1"
                 },
                 "video.js": {
                     fileName: 'video',
                     version: "7.0.5"
                 }
             }
         });
// export
module.exports = autoloader.loadjs;
```
Create `UMD` library from this file, for example with `webpack` name the library `autoloader`, also it's recommended to use `webpack.DefinePlugin`, to set only dependencies from `package.json`.

#### 2. After all, it would look like this: 
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
Available options here:

* `deps` dependencies should be included? (default `false`)
* `deps-exclude` what to exclude from dependencies (sepparated by comma `,`, ex: `jquery,bootstrap`)
* `deps-before` what to include before all dependencies added (sepparated by comma `,`, ex: `https://code.jquery.com/jquery-2.2.4.min.js,https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/js/bootstrap.min.js`)
* `deps-after` the same like `deps-before` but the opposite .

For now that's all, in the future this will be improved in a common manner.
## Change Log

### 9th July 2018
* [geoshar] First 1.0.0 version added.
* [geoshar] First documentation added.

Copyright © 2018 Georgy Sharapov | BSD & MIT license
