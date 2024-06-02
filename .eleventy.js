const yaml = require('js-yaml');

module.exports = function (eleventyConfig) {
    // Passthrough copies
    eleventyConfig.addPassthroughCopy('./src/style.css');
    eleventyConfig.addPassthroughCopy('./src/stylepc.css');
    eleventyConfig.addPassthroughCopy('./src/index.js');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/_data');
    eleventyConfig.addPassthroughCopy('./src/admin');

    // Add custom filter for array chunking
    eleventyConfig.addFilter("arrayChunk", function (arr, size) {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    });

    // Extend Eleventy to support YAML data files
    eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
    return {
        dir: {
            input: "src",
            output: "_site"
        }
    };
};