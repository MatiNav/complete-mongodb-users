const assert = require('assert');

const User = require('../src/user');

function assertName(operation, done) {
  operation
    .then(() => User.find())
    .then(users => {
      assert(users.length === 1);
      assert(users[0].name === 'Alex');
      done();
    })
    .catch(e => done(e));
}

describe('', () => {
  let joe;
  const user = { name: 'Joe', postCount: 0 };

  beforeEach(done => {
    joe = new User(user);
    joe
      .save()
      .then(() => {
        done();
      })
      .catch(e => done(e));
  });

  it('instance type using set n save', done => {
    joe.set('name', 'Alex'); // esto lo hace localmente pero no ela bd (fijarse que si fuera a la bd sería asicnrono);
    assertName(joe.save(), done);
  });

  it('A model instance can update', done => {
    assertName(joe.updateOne({ name: 'Alex' }), done);
  });

  it('A model class can update', done => {
    assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
  });
  it('A model class can update one record', done => {
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });
  it('A model class can update a record with and Id and update', done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });

  it('A user can have their postCount incremented by 1', done => {
    User.update({ name: 'Joe' }, { $inc: { postCount: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.postCount === 10);
        done();
      })
      .catch(e => done(e));
  });
});
