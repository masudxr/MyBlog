import { db } from './database.js';
//---------Sqlite DB------//
import { showAllcommentsData } from "./comments.js";


export function getAllPosts() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * from Posts order by date desc', (err, posts) => {
      if (err) reject(err);
      resolve(posts);
    });
  });
}

export async function viewPostDataWithId(req, res) {
  let logedIn = req.session.userid;
  let BlogsId = Number(req.params.id);

  const Comment = await showAllcommentsData();

  // console.log('BlogsId:',BlogsId);
  db.get('SELECT * from Posts WHERE id = $id', { $id: BlogsId }, (err, row) => {
    res.render('blogs', { title: 'Post with Id', row, logedIn, Comment});
  });
};



export function insertPostData(req, res) {
  let logedIn = req.session.userid;
  // console.log('    fun     ',logedIn);
  let Txt = 'You Just Missed Proper Entry. Plz fill up Title and Body Both Carefully and Try again !';

  console.log('req.body.title:      ',req.body.title);
  console.log('req.body.body:      ',req.body.body);
  db.all('SELECT * from Users', (err, rows) =>{

  if (req.body.title && req.body.body){

    db.run(`INSERT INTO Posts (users_id, title, body, date) VALUES ($users, $title, $body, $date)`, {
      $users: logedIn,
      $title: req.body.title,
      $body: req.body.body,
      $date: new Date().toISOString(),
  
    }, (err) => {
      console.log(err);
      res.redirect('/home');
    });
  } else {
    res.render('createBlogs', { title: 'Plz fill up properly', logedIn, rows, Txt});
  }
  });
};



export function getPostRemove(req, res) {
  let ReqId = Number(req.params.id);
  db.run("DELETE FROM Posts WHERE id=$id", { $id: ReqId });
  res.redirect('/home');
};

//--------------//------------//

export async function viewAllPostDataWithId(req, res) {
  let logedIn = req.session.userid;

  let UsersId = Number(req.params.id);
  // console.log('UsersId:',UsersId);
  let Arr = [];

  const posts = await getAllPosts();
  
    for (let j = 0; j < posts.length; j++) {
      if (UsersId == posts[j].users_id) {
        posts['authorPost'] = posts[j].body;
        Arr.push(posts.authorPost);
      };
    };
    res.render('users', { title: 'Post with UserId', Arr, logedIn});

};





//-----INNER JOIN-------//
// db.get('SELECT users_id FROM Posts INNER JOIN Users ON Posts.users_id = Users.id',(err, rows) =>{
//   console.log(err)
//   console.log(rows);
// });

