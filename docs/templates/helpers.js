var packageJson = require('../../package.json');
var handlebarsStatic = require('handlebars-static');

module.exports = {
    repoStatic:handlebarsStatic(packageJson.homepage)
};