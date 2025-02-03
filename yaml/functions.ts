import yaml from 'js-yaml';

export const JoinYamlType = new yaml.Type('!join', {
    kind: 'sequence',
    instanceOf: String,
    construct: (data) => data.join(''),    
    resolve: data => data !== null && data.length > 1,
});