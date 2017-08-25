import { OnlyCheckedPipe } from './only-checked.pipe';

describe('OnlyCheckedPipe', () => {
  it('create an instance', () => {
    const pipe = new OnlyCheckedPipe();
    expect(pipe).toBeTruthy();
  });
});
