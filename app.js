import express from "express";
const app = express();
const port = 3050;

app.set('view engine', 'ejs');

app.listen(port, () => {
  console.log(`Example app listening on port: ${port}`)
});

app.use(express.static('public'));   //-----serving public file---////
app.use(express.urlencoded({ extended: true }));  //----------// parsing the incoming data-------//

//---------------------------------------------//

//session ---///
import session from "express-session";
import cookieParser from "cookie-parser";
app.set('trust proxy', 1);

//----------session middleware---------//
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}));
app.use(cookieParser());
//session setup---///

import { getHome, logIN } from './home.js';
import { showAllcommentsData, insertCommentsData } from './comments.js';
import { getPostRemove, insertPostData, viewPostDataWithId, viewAllPostDataWithId } from './post.js';
import { insertUsersData, showAllUsersdata, showAllUsersDataForPost, LogOut } from './users.js';




app.get('/home', getHome);

app.post('/signin',logIN );


app.get('/signin', (req, res) => {
  res.render('signin', { title: 'Signing Here!' });
});

app.get('/logout', LogOut);

app.get('/:id/remove', getPostRemove);

app.get('/remove', (req, res) => {
  res.render('remove', { title: 'Remove blogs' });
});

app.get('/createBlogs', (req, res) => {
  res.render('createBlogs', { title: 'create Blogs' });
});

app.post('/create', insertPostData);

app.get('/create', (req, res) => {
  res.render('create', { title: 'Create blogs' });
});

app.get('/blogs/:id', viewPostDataWithId);

app.get('/users/:id', viewAllPostDataWithId);

app.post('/users', insertUsersData);

app.get('/create/users', showAllUsersdata);
app.get('/users', showAllUsersdata);

app.get('/create/blogs', showAllUsersDataForPost);

app.post('/comments', insertCommentsData);

app.get('/create/comments', showAllcommentsData);

app.get('/comments', showAllcommentsData);


// 404 page
app.use((req, res) => {
  // console.log(path.resolve())
  res.status(404).render('404', { title: '404' });
});












// db.get('SELECT users_id FROM Posts INNER JOIN Users ON Posts.users_id = Users.id',(err, rows) =>{
//   console.log(err)
// });
