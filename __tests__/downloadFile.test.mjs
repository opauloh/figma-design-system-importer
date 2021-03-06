import trash from 'trash';

import { downloadFile } from '../bin/functions/filesystem/downloadFile';

test('It should throw an error if no parameter is provided', async () => {
  await expect(downloadFile()).rejects.toThrow();
});

test('It should download a file if given valid arguments', async () => {
  await downloadFile(
    'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0882/9cc7/c4731c8d0df07592cd6f7dc0519bb3bb',
    '__testing',
    'testfile.svg'
  );
  trash(`./__testing`);
});

test('It should fail if returning a non-200 status', async () => {
  await downloadFile(
    'https://s3-us-west-2.amazonaws.com/figma-alpha-api/img/0882/9cc7/c4731c8d0df07592cd6f7dc0519bb3bb-asdf',
    '__testing',
    'testfile.svg'
  );
  trash(`./__testing`);
});
