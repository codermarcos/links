import yaml from 'js-yaml';

import { JoinYamlType } from './functions';

const schema = yaml.DEFAULT_SCHEMA.extend(JoinYamlType);

export default schema;