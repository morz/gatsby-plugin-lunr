/* global __PATH_PREFIX__ */
const lunr = require("lunr");
const { enhanceLunr } = require("./common.js");

exports.onClientEntry = (
    args,
    { languages, filename = "search_index1.json", fetchOptions = {} }
) => {
    enhanceLunr(lunr, languages);
    window.__LUNR1__ = window.__LUNR1__ || {};
    window.__LUNR1__.__loaded = fetch(
        `${__PATH_PREFIX__}/${filename}`,
        fetchOptions
    )
        .then(function(response) {
            return response.json();
        })
        .then(function(fullIndex) {
            window.__LUNR1__ = Object.keys(fullIndex).reduce(
                (prev, key) => ({
                    ...prev,
                    [key]: {
                        index: lunr.Index.load(fullIndex[key].index),
                        store: fullIndex[key].store
                    }
                }),
                {
                    __loaded: window.__LUNR1__.__loaded
                }
            );
            return window.__LUNR1__;
        })
        .catch(e => {
            console.log("Failed fetch search index");
            throw e;
        });
};
