import { readFileSync } from 'fs';

import yaml from 'js-yaml';

import schema from './yaml/schema';

const language = (l: 'pt' = 'pt') => {
    const templateParameters = yaml.load(readFileSync(`./i18n/${l}.yaml`, 'utf8'), { schema }) as Record<string, string>;

    const parameters = {
        ...templateParameters,
        favIcons: [
            ['icon', 'favicon.ico', 'image/x-icon'],

            ['icon', 'favicon-32x32.png', 'image/png', '32x32'],
            ['icon', 'favicon-16x16.png', 'image/png', '16x16'],

            ['shortcut icon', 'favicon.ico', 'image/x-icon'],

            ['apple-touch-icon', 'apple-touch-icon.png', , '180x180'],
        ],
        date: Date.now(),
        language: l,
    };

    return parameters;
};

export default language;

