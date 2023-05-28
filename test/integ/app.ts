import * as path from 'path';
import { Stack } from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';
import * as phpbuilder from '../../lib/index'
import * as process from 'process';




export class TESTPHPDockerImageStack extends Stack {
    constructor(scope: Construct, id: string) {
        super(scope, id);

        const repo = new ecr.Repository(this, 'MyTestRepostitory', {
            repositoryName: 'testrepo',
          });

          new phpbuilder.PHPDockerImageBuilder(this, 'TestPHPImageBuilder', {
            source: phpbuilder.PHPDockerImageSource.directory(path.join(process.cwd(), '/test/', 'dockerfiles/php8')),
            destination: phpbuilder.PHPDockerImageDestination.ecr(repo, {
                tag: 'latest'
            })
          }); 
    }
}

