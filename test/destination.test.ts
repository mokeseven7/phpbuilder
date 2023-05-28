import * as path from 'path';
import * as phpbuilder from '../lib/index';
import * as process from 'process';
import { PHPDockerImageSource } from '../lib/index';
describe('Docker: It should build a dockerfile', () => {

    describe('Docker: If given a correct path', () => {

        let test_path = path.join(process.cwd(), '/test/', 'dockerfiles/php8');

        const test_source = phpbuilder.PHPDockerImageSource.directory(test_path);
        
        test('directory function should return an image source', () => {
            expect(test_source).toBeInstanceOf(PHPDockerImageSource)

        })

    });


})