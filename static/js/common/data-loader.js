(function (global) {
    var dataNamespace = global.MBTIData = global.MBTIData || {};
    dataNamespace.personalities = dataNamespace.personalities || {};

    var scriptPromiseCache = {};

    function resolveValue(getter) {
        var value = getter();

        if (typeof value === 'undefined' || value === null) {
            throw new Error('Fallback data is unavailable');
        }

        return value;
    }

    function loadScript(src) {
        if (scriptPromiseCache[src]) {
            return scriptPromiseCache[src];
        }

        scriptPromiseCache[src] = new Promise(function (resolve, reject) {
            var script = document.createElement('script');

            script.src = src;
            script.async = true;
            script.onload = resolve;
            script.onerror = function () {
                reject(new Error('Failed to load script: ' + src));
            };

            document.head.appendChild(script);
        });

        return scriptPromiseCache[src];
    }

    function loadWithFallback(jsonUrl, scriptUrl, getter) {
        var useScriptOnly = global.location.protocol === 'file:' || typeof global.fetch !== 'function';

        if (useScriptOnly) {
            return loadScript(scriptUrl).then(function () {
                return resolveValue(getter);
            });
        }

        return global.fetch(jsonUrl)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error('Failed to load JSON: ' + jsonUrl);
                }

                return response.json();
            })
            .catch(function () {
                return loadScript(scriptUrl).then(function () {
                    return resolveValue(getter);
                });
            });
    }

    dataNamespace.loadQuestions = function () {
        return loadWithFallback('./data/questions.json', './data/questions.js', function () {
            return dataNamespace.questions;
        });
    };

    dataNamespace.loadPersonalitySummaries = function () {
        return loadWithFallback('./data/personality-summaries.json', './data/personality-summaries.js', function () {
            return dataNamespace.personalitySummaries;
        });
    };

    dataNamespace.loadPersonalityDetail = function (type) {
        return loadWithFallback('./data/personalities/' + type + '.json', './data/personalities/' + type + '.js', function () {
            return dataNamespace.personalities[type];
        });
    };
})(window);
