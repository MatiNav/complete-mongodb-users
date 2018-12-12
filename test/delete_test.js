const assert = require('assert');

const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;
  const user = { name: 'Joe' };

  beforeEach(done => {
    joe = new User(user); // aca ya tiene un _id
    joe
      .save()
      .then(() => {
        return done();
      })
      .catch(e => done(e));
  });

  it('model instance remove', done => {
    joe
      .remove({})
      .then(() => User.findOne(user))
      .then(user => {
        assert(user === null);
        return done();
      })
      .catch(e => done(e));
  });

  it('class method remove', done => {
    User.deleteOne(user)
      .then(() => User.findOne(user))
      .then(user => {
        assert(user === null);
        return done();
      })
      .catch(e => done(e));
  });

  it('class method findOneAndRemove', done => {
    User.findOneAndDelete(user)
      .then(() => User.findOne(user))
      .then(user => {
        assert(user === null);
        return done();
      })
      .catch(e => done(e));
  });

  it('class method findByIdAndRemove', done => {
    User.findOneAndDelete(joe._id)
      .then(() => User.findOne(user))
      .then(user => {
        assert(user === null);
        return done();
      })
      .catch(e => done(e));
  });
});
