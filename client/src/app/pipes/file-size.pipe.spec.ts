import { FileSizePipe } from './file-size.pipe';
/**
 * Funcion describe
 */
describe('FileSizePipe', () => {
  it('create an instance', () => {
    const pipe = new FileSizePipe();
    expect(pipe).toBeTruthy();
  });
});
