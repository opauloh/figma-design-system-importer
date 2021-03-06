import {
  msgProcessElementsCreatingElement,
  msgDownloadFileWritingFile
} from '../bin/meta/messages';

test('It should show new and old values with separating marks', () => {
  expect(msgProcessElementsCreatingElement('something', 'something')).toBe(
    '* something > something'
  );
});

test('It should write a helpful line describing what file it has written', () => {
  expect(msgDownloadFileWritingFile('asdf')).toMatch(`* Writing file: asdf`);
});
