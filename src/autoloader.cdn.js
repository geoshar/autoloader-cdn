module.exports = function (optionsExternal) {

    let options = Object.assign({
        env: 'production',
        pkgDependencies: {},
        loadDependencies: {},
        urlDependencies: [],
        loadjs: {
            enabled: true,
            name: 'bundle',
            options: {
                async: false
            }
        },
        deps: document.currentScript.getAttribute('deps'),
        depsExclude: document.currentScript.getAttribute('deps-exclude'),
        depsBefore: document.currentScript.getAttribute('deps-before'),
        depsAfter: document.currentScript.getAttribute('deps-after'),
        urlTemplate: 'https://unpkg.com/[pkgName]@[version][path][fileName][fileMin][fileExt]',
        urlTemplateParse: function (dependency, urlTemplate) {
            for (let key in dependency) {
                if (dependency.hasOwnProperty(key)) {
                    if (typeof dependency[key] === 'string') {
                        urlTemplate = urlTemplate.replace('[' + key + ']', dependency[key]);
                    }
                }
            }
            return urlTemplate;
        }
    }, optionsExternal);
    // load scripts before dependencies
    if (options.depsBefore) {
        options.depsBefore = options.depsBefore.split(',');
        options.depsBefore.forEach(function (depBefore) {
            options.urlDependencies.push(depBefore);
        });
    }
    // if something is excluded
    if(options.depsExclude){
        options.depsExclude = options.depsExclude.split(',');
        options.depsExclude.forEach(function(depRemove){
            if(options.loadDependencies.hasOwnProperty(depRemove)) {
                delete options.loadDependencies[depRemove];
            }
        });
    }

    // get the dependencies
    if (options.deps && options.loadDependencies) {
        if (options.pkgDependencies) {
            for (let key in options.pkgDependencies) {
                if (options.pkgDependencies.hasOwnProperty(key)) {
                    options.pkgDependencies[key] = options.pkgDependencies[key].replace('^', '');
                }
            }
        }
        for (let key in options.loadDependencies) {
            if (options.loadDependencies.hasOwnProperty(key)) {
                let pkgDependencyVersion = 'version-not-found';
                if (options.pkgDependencies.hasOwnProperty(key)) {
                    pkgDependencyVersion = options.pkgDependencies[key];
                }
                options.loadDependencies[key] = Object.assign({
                    pkgName: key,
                    version: pkgDependencyVersion,
                    path: '/dist/',
                    fileName: key,
                    fileMin: '.min',
                    fileExt: '.js',
                    assets: {
                        //fileName: '',
                    }
                }, options.loadDependencies[key]);
                if (options.env === 'development' || options.loadDependencies[key].fileMinProd === false) {
                    options.loadDependencies[key].fileMin = '';
                }
                let cdnUrlFine = options.urlTemplateParse(options.loadDependencies[key], options.urlTemplate);
                //console.log(cdnUrlFine);
                options.urlDependencies.push(cdnUrlFine);
            }
        }
    }
    // load urls from script tag directly
    if (options.depsAfter) {
        options.depsAfter = options.depsAfter.split(',');
        options.depsAfter.forEach(function (path) {
            options.urlDependencies.push(path);
        });
    }
    // finally load the scripts
    if (options.loadjs.enabled) {
        let loadjs = require('loadjs');
        loadjs(options.urlDependencies, options.loadjs.name, options.loadjs.options);
        options.loadjs = loadjs;
    }
    return options;
};