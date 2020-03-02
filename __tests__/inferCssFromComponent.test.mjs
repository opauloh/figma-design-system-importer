import { inferCssFromComponent } from '../bin/functions/inferCssFromComponent';

test('inferCssFromComponent test', () => {
  expect(inferCssFromComponent()).toBe('');
});
