import {
  App,
  aws_s3_deployment,
  aws_certificatemanager,
  Stack,
  StackProps,
  Arn,
  // Tags,
} from 'aws-cdk-lib';
import { CloudFrontToS3 } from '@aws-solutions-constructs/aws-cloudfront-s3';

import * as pkg from '../package.json';
import { DistributionProps, HttpVersion } from 'aws-cdk-lib/aws-cloudfront';

export class LinksStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);
    const certificate = aws_certificatemanager.Certificate.fromCertificateArn(
      this, 'certificate', Arn.format({
        resourceName: '50de358c-1c2b-470c-9417-be23a18b4eff',
        resource: 'certificate',
        region: 'us-east-1',
        service: 'acm',
      }, this)
    );

    const S3withCloudfront = new CloudFrontToS3(this, id, {
      cloudFrontDistributionProps: {
        enableLogging: false,
        comment: id,
        certificate,
        domainNames: [
          "codermarcos.zone",
          "www.codermarcos.zone",
        ],
        httpVersion: HttpVersion.HTTP2_AND_3,
      } as DistributionProps,
      cloudFrontLoggingBucketProps: undefined,
      bucketProps: {
        bucketName: `${id.toLowerCase()}-assets`,
        serverAccessLogsBucket: undefined,
      },
      logCloudFrontAccessLog: false,
      logS3AccessLogs: false,
    });

    // Tags.of(S3withCloudfront.cloudFrontWebDistribution).add('', '');
    // Tags.of(S3withCloudfront.s3Bucket!).add('', '');

    new aws_s3_deployment.BucketDeployment(
      this,
      'deploy_version',
      {
        sources: [aws_s3_deployment.Source.asset(pkg.config.out)],
        destinationBucket: S3withCloudfront.s3Bucket!,
        destinationKeyPrefix: new Date().toDateString(),
        prune: false,
      }
    );

    new aws_s3_deployment.BucketDeployment(
      this,
      'deploy_latest',
      {
        sources: [aws_s3_deployment.Source.asset(pkg.config.out)],
        destinationBucket: S3withCloudfront.s3Bucket!,
        destinationKeyPrefix: 'latest',
      }
    );
  }
}
