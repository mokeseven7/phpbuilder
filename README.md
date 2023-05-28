[![codecov](https://codecov.io/gh/mokeseven7/phpbuilder/branch/main/graph/badge.svg?token=2GBDST81U7)](https://codecov.io/gh/mokeseven7/phpbuilder)

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
import * as phpbuilder from 'cdk-docker-image-deployment';

//The Construct requires 3 things - 

//1. and instance of ecr.Repository, either new or existing
const repo = new ecr.Repository.fromRepositoryName(this, 'MyRepository', 'latest');

//2. A path to a valid Dockerfile location
const source = phpbuilder.PHPDockerImageSource.directory('path/to/dockerfile');

//3. A valid Docker Image Host, only Supports aws ecr as of now
const destination = phpbuilder.PHPDockerImageDestination.ecr(repo, {tag: 'latest'});
```


Once you have those 3 items, you can build the constructs and thier corresponding resources:


```typescript
 new phpbuilder.PHPDockerImageBuilder(stack, 'TestDeployment', {
    source,
    destination,
});

```

