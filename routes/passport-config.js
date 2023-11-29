// passport-config.js

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = await getUserByEmail(email);

    //console.log('User from authenticateUser:', user);

    if (!user || !user[0] || !user[0].password) {
      return done(null, false, { message: 'No user with that email or password not set' });
    }

    try {
      const passwordMatch = await bcrypt.compare(password, user[0].password);

      if (passwordMatch) {
        return done(null, user[0]);
      } else {
        return done(null, false, { message: 'Password incorrect' });
      }
    } catch (e) {
      console.error('Error comparing passwords:', e);
      return done(e);
    }
  };

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id, done) => {
    const user = await getUserById(id);
    return done(null, user);
  });
}

module.exports = initialize;


