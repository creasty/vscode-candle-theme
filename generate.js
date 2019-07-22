const fs = require('fs').promises;
const mustache = require('mustache');
const path = require('path');

const CHARSET = 'utf-8';

const PATHS = {
    template: path.join(__dirname, 'themes/.template/theme.json'),
    scheme: path.join(__dirname, 'themes/.template/scheme.json'),
    colors: path.join(__dirname, 'themes/.template/colors.json'),
    output: path.join(__dirname, 'themes/candle.json'),
};

const contents = {};
['template', 'scheme', 'colors'].forEach(name => contents[name] = fs.readFile(PATHS[name], CHARSET));

const scheme = contents.scheme.then(content => JSON.parse(content));

const colors = Promise.all([contents.colors, scheme])
    .then(([colors, scheme]) => mustache.render(colors, { scheme }))
    .then((rendered) => JSON.parse(rendered));

const template = Promise.all([contents.template, scheme, colors])
    .then(([template, scheme, colors]) => mustache.render(template, { scheme, colors }))
    .then(rendered => JSON.stringify(JSON.parse(rendered), null, 2));

(async () => {
    const output = await template;
    await fs.writeFile(PATHS.output, output, { encoding: CHARSET });
})();
