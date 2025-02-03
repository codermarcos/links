import { App, DefaultStackSynthesizer } from 'aws-cdk-lib';
import { ComponentStack } from '.';

import * as cdk from '../cdk.json';

const app = new App();

new ComponentStack(app, 'links', {
  synthesizer: new DefaultStackSynthesizer({
    qualifier: cdk.context['@aws-cdk/core:bootstrapQualifier'],
  }),
  tags: {
    'project': 'links',
  },
  env: {
    account: process.env.AWS_ACCOUNT_ID,
    region: process.env.AWS_REGION,
  },
});
