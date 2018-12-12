const assert = require('assert');

const User = require('../src/user');

describe('Reading users out of database', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe' }); // aca ya tiene un _id
    joe
      .save()
      .then(() => {
        done();
      })
      .catch(e => done(e));
  });

  it('finds all users with name of joe', done => {
    User.find({ name: 'Joe' })
      .then(users => {
        assert(joe._id.toString() === users[0]._id.toString());
        done();
      })
      .catch(e => done(e));
  });

  it('find a user with a particular id', done => {
    User.findById(joe._id)
      .then(user => {
        assert(joe._id.toString() === user._id.toString());
        done();
      })
      .catch(e => {
        done(e);
      });
  });
});
