const fs = require('fs');
const mustache = require('mustache');
const path = require('path');

const CHARSET = 'utf-8';

const PATHS = {
    template: path.join(__dirname, 'themes/.template/theme.json'),
    settings: path.join(__dirname, 'themes/.template/settings.json'),
    output: path.join(__dirname, 'themes/candle.json'),
};

const template = fs.readFileSync(PATHS.template, CHARSET);
const settings = JSON.parse(fs.readFileSync(PATHS.settings, CHARSET));

const rendered = mustache.render(template, settings);
const templateJSONStringified = JSON.stringify(JSON.parse(rendered), null, 2);

fs.writeFileSync(PATHS.output, templateJSONStringified, { encoding: CHARSET });
