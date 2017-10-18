const controllers = require('../controllers');
const restrictedPages = require('./auth');

module.exports = app => {
  app.get('/', controllers.home.get);
  app.get('/user/register', controllers.user.register.get);
  app.post('/user/register', controllers.user.register.post);
  app.post('/user/logout', controllers.user.logout);
  app.get('/user/login', controllers.user.login.get);
  app.post('/user/login', controllers.user.login.post);

  app.get('/user/find', restrictedPages.isAuthed, controllers.user.search);
  app.get('/user/:id/block', restrictedPages.isAuthed, controllers.user.block);
  app.get('/user/:id/unblock', restrictedPages.isAuthed, controllers.user.unblock);

  app.get('/message/:id/like', restrictedPages.isAuthed, controllers.message.like);
  app.get('/message/:id/unlike', restrictedPages.isAuthed, controllers.message.unlike);

  app.get('/thread/:username', restrictedPages.isAuthed, controllers.thread.chatRoomGet);
  app.post('/thread/:username', restrictedPages.isAuthed, controllers.thread.chatRoomPost);

  app.all('*', (req, res) => {
    res.status(404);
    res.send('404 Not Found');
    res.end();
  });
};
