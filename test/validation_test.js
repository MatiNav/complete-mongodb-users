const assert = require('assert');

const User = require('../src/user');

describe('Validatin records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'A user must have a name !!');
  });

  it("requires a user's name longer than 2 characters", () => {
    const user = new User({ name: 'lo' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;
    assert(message === 'Name must be longer than 2 characters !!');
  });

  it('disallows invalid records from being saved', done => {
    const user = new User({ name: 'lo' });

    user
      .save()
      .then(() => done('Algo anduvo mal !'))
      .catch(validationResult => {
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters !!');
        done();
      });
  });
});
