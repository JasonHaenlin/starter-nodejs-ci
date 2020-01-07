const assert = require('assert');
const crypt = require('../../app/utils/crypt');

const psd = 'testme';
let hash = '';

describe('Testing bcrypt for first use', () => {
  it('should have return true from hashing', async () => {
    try {
      hash = await crypt.cipher(psd);
    } catch (error) {
      assert.fail(error);
    }
  });
  it('should have return true from the comparison', async () => {
    try {
      await crypt.decipher(hash, psd);
    } catch (error) {
      assert.fail(error);
    }
  });
  it('should have return an error from the comparison', async () => {
    try {
      await crypt.decipher(hash, 'other');
      assert.fail();
    } catch (error) {
      console.log('\tthrow error');
    }
  });
});
