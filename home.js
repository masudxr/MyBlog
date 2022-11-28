import { db } from './database.js';
import { getAllPosts } from "./post.js";
import { getAllUsers } from "./users.js";

export async function getHome(req, res) {
  console.log(req.session);
  let logedIn = req.session.userid;

  let Arr = [];
  const posts = await getAllPosts();
  const users = await getAllUsers();

  for (let i = 0; i < posts.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (posts[i].users_id == users[j].id) {
        posts['AuthorName'] = users[j].name;
        Arr.push(posts.AuthorName);
      };
    };
  };
  res.render('home', { title: 'Home Page', posts, logedIn, Arr });
};

export function logIN(req, res, next) {
  const getId = req.body;

  db.get('SELECT * from Users WHERE name = $name AND password = $password', { $name: getId.name, $password: getId.password }, (err, loginId) => {

    req.session.userid = loginId.id;
    console.log(req.session);

    if (loginId) {
      res.redirect('/home');
    }
    else {
      res.render('signin', { title: 'Failed!' });
    };
  });
};



