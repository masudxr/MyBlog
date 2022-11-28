import {db} from './database.js';

export function showAllcommentsData() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * from comments', (err, Comment) =>{
      if (err) reject(err);
      resolve(Comment);
      // res.render('blogs', { title: 'Create comments', Comment, logedIn});
    });
  });
};


export function insertCommentsData(req,res){
  let logedIn = req.session.userid;

    console.log('full post: ', req.body);
    db.run(`INSERT INTO comments (post_id, users_id, comments_body, date) VALUES ($post_id, $users_id, $comments_body, $date)`, {
      $post_id: req.body.post_id, 
      $users_id: logedIn,
      $comments_body: req.body.body, 
      $date: new Date(),
  
    }, (err)=>{
      console.log(err);
      res.redirect ('/home');
    });
};


