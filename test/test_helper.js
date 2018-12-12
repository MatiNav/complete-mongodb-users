const { connect, connection } = require('mongoose');

connect(
  'mongodb://localhost/users_test',
  { useNewUrlParser: true }
);

// estos dos son event handler methods, once escucha q ocurra una vez, on escucha siempre

before(done => {
  connection.once('open', () => done()).on('error', err => done(err));
});

beforeEach(done => {
  connection.collections.users.drop(() => {
    done();
  });
});
