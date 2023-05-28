[![codecov](https://codecov.io/gh/mokeseven7/phpbuilder/branch/main/graph/badge.svg?token=2GBDST81U7)](https://codecov.io/gh/mokeseven7/phpbuilder) ![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/mokeseven7/phpbuilder/tests.yml?style=flat) ![npm](https://img.shields.io/npm/v/@mikemcgrath/phpbuilder)

# CDK Docker Image Builder 

Although the construct can technically build an image from any docker file, it's optimized towards the building of php images. If you want to build images for other languages, there are probably better options out there.


## Installation

In your existing CDK project, pull in the library using one of the package managers:

```bash
# Using pnpm
$ pnpm i @mikemcgrath/phpbuilder

# Using NPM
$ npm i @mikemcgrath/phpbuilder

# Using Yarn
yarn add @mikemcgrath/phpbuilder
```

## Using The Construct

The below is a basic example of how the contruct could be used in an existing CDK project:

```typescript
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as phpbuilder from '@mikemcgrath/phpbuilder';

//The Construct requires 3 things - 

//1. and instance of ecr.Repository, either new or existing
const repo = new ecr.Repository.fromRepositoryName(this, 'MyRepository', 'latest');

//2. A path to a valid Dockerfile location
const source = phpbuilder.PHPDockerImageSource.directory('path/to/dockerfile');

//3. A valid Docker Image Host, only Supports aws ecr as of now
const destination = phpbuilder.PHPDockerImageDestination.ecr(repo, {tag: 'latest'});

//4. Once you a repo, source and destination, simply call new on the builder
  new phpbuilder.PHPDockerImageBuilder(stack, 'TestDeployment', {
    source,
    destination,
});
```


## Full Example:

```typescript
import * as path from 'path';
import * as process from 'process';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ecr from 'aws-cdk-lib/aws-ecr';
import * as phpbuilder from '@mikemcgrath/phpbuilder';


export class MyDockerImageDeployment extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    
    const repository = new ecr.Repository(this, "phpbuilder", {
      repositoryName: "phpbuilder"
    });

    const source = phpbuilder.PHPDockerImageSource.directory(path.join(process.cwd()));
    const destination = phpbuilder.PHPDockerImageDestination.ecr(repository, {tag: 'latest'});

    const image = new phpbuilder.PHPDockerImageBuilder(this, 'PHPBuilderStack', {
      source,
      destination
    })
  }
}

```

Thats It! You can now synthethize and deploy!

## Need More Help?

Theres a full example implementation of how one might use this construct in this [example repo](https://github.com/mokeseven7/phpbuilder-example)



