const fs = require('fs');
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
['template', 'scheme', 'colors'].forEach(name => contents[name] = fs.readFileSync(PATHS[name], CHARSET));

const scheme = JSON.parse(contents.scheme);

const renderedColors = mustache.render(contents.colors, { scheme });
const colors = JSON.parse(renderedColors);

const renderedTemplate = mustache.render(contents.template, { scheme, colors });
const templateBeautified = JSON.stringify(JSON.parse(renderedTemplate), null, 2);

fs.writeFileSync(PATHS.output, templateBeautified, { encoding: CHARSET });
