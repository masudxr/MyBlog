import {db} from './database.js';

export function getAllUsers() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * from Users', (err, users) => {
      if (err) reject(err);
      resolve(users);
    });
  });
}

export function showAllUsersdata(req, res) {
  let logedIn = req.session.userid;

    db.all('SELECT * from Users', (err, rows) =>{
      res.render('createUsers', { title: 'Create Users', rows, logedIn});
    });
}


export function showAllUsersDataForPost(req, res) {
  let logedIn = req.session.userid;
let Txt = 'Advance Thanks For Creating a Post In Our Site !';

  let Arr=[];
  db.all('SELECT * from Users', (err, rows) =>{
    res.render('createBlogs', { title: 'Create New blogs', rows, logedIn, Txt});
  });
}



export function insertUsersData(req,res){

    console.log('Users full post: ', req.body);
  
    db.run(`INSERT INTO Users (id, name, email, password) VALUES ($id, $name, $email, $password)`, {
      $id: req.body.id, 
      $name: req.body.name, 
      $email: req.body.email, 
      $password: req.body.password,
  
    }, (err)=>{
      console.log('Users Error', err);
      res.redirect ('/create/users');
    });
};


// logout Function
export function LogOut(req, res, next) {
  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/signin')
    });
  });
};





