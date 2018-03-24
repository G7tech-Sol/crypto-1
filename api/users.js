const User= require("../models/users");
const jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt-nodejs');


exports.profile=function (req,res)
{
  User.findOne({ _id: req.decoded.userId }).select('username email').exec(function(err, user)
  {
    if (err)
    {
      res.json({ success: false, message: err });
    }
    else
    {
      if (!user)
      {
        res.json({ success: false, message: 'User not found' });
      }
      else
      {
        res.json({ success: true, user: user });
      }
    }
  });
}

exports.token=function (req,res,next)
{
  const token = req.headers['authorization'];
  if (!token)
  {
    res.json({ success: false, message: 'Field is empty' });
  }
  else
  {
    jwt.verify(token, process.env.jwtsecret, function(err, decoded)
    {
      if (err)
      {
        res.json({ success: false, message: 'Token invalid: ' + err });
      }
      else
      {
        req.decoded = decoded;
        next();
      }
    });
  }
}

exports.all=function (req,res)
{
  if (!req.params.username)
  {
    res.json({ success: false, message: 'Username was not provided' });
  }
  else
  {
    User.findOne({ username: req.params.username }, (err, user) =>
    {
      if (err)
      {
        res.json({ success: false, message: err });
      }
      else
      {
        if (user)
        {
          res.json({ success: false, message: 'Username is already taken' });
        }
        else
        {
          res.json({ success: true, message: 'Username is available' });
        }
      }
    });
  }
}

exports.getAll=function (req,res)
{
  if (!req.params.email)
  {
    res.json({ success: false, message: 'E-mail was not provided' });
  }
  else
  {
    User.findOne({ email: req.params.email }, (err, user) =>
    {
      if (err)
      {
        res.json({ success: false, message: err });
      }
      else
      {
        if (user)
        {
          res.json({ success: false, message: 'E-mail is already taken' });
        }
        else
        {
          res.json({ success: true, message: 'E-mail is available' });
        }
      }
    });
  }
};

exports.add=function (req,res,next)
{
  if (!req.body.email)
  {
    res.json({ success: false, message: 'You must provide an e-mail' });
  }
  else
  {
    if (!req.body.username)
    {
      res.json({ success: false, message: 'You must provide a username' });
    }
    else
    {
      if (!req.body.password)
      {
        res.json({ success: false, message: 'You must provide a password' });
      }
      else
      {
        let user = new User(
        {
          email: req.body.email.toLowerCase(),
          username: req.body.username.toLowerCase(),
          password: req.body.password
        });
        user.save((err) =>
        {
          if (err)
          {
            if (err.code === 11000)
            {
              res.json({ success: false, message: 'Username or e-mail already exists' });
            }
            else
            {
              if (err.errors)
              {
                if (err.errors.email)
                {
                  res.json({ success: false, message: err.errors.email.message });
                }
                else
                {
                  if (err.errors.username)
                  {
                    res.json({ success: false, message: err.errors.username.message });
                  }
                  else
                  {
                    if (err.errors.password)
                    {
                      res.json({ success: false, message: err.errors.password.message });
                    }
                    else
                    {
                      res.json({ success: false, message: err });
                    }
                  }
                }
              }
              else
              {
                res.json({ success: false, message: 'Could not save user. Error: ', err });
              }
            }
          }
          else
          {
            res.json({ success: true, message: 'Acount registered!' });
          }
        });
      }
    }
  }
};

// exports.edit=function (req,res,next)
// {
//   User.findByIdAndUpdate({_id:req.params.id},req.body).then(function()
//   {
//     User.findOne({_id:req.params.id}).then(function (User)
//     {
//       res.send(User);
//     })
//   })
// };
//
// exports.isDeleted=function (req,res,next)
// {
//   User.findByIdAndRemove({_id:req.params.id}).then(function(User)
//   {
//     res.send(User);
//     console.log({_id:req.params.id});
//   });
// };

exports.authenticate = function (req, res)
{
  if (!req.body.email)
  {
    res.json({ success: false, message: 'No email was provided' }); // Return error
  }
  else
  {
    // Check if password was provided
    if (!req.body.password)
    {
      res.json({ success: false, message: 'No password was provided.' }); // Return error
    }
    else
    {
      // Check if email exists in database
      User.findOne({ email: req.body.email.toLowerCase() }, (err, user) =>
      {
        // Check if error was found
        if (err)
        {
          res.json({ success: false, message: err }); // Return error
        }
        else
        {
          // Check if email was found
          if (!user)
          {
            res.json({ success: false, message: 'email not found.' }); // Return error
          }
          else
          {
            const validPassword = user.comparePassword(req.body.password);
            if (!validPassword)
            {
              res.json({ success: false, message: 'Password invalid' });
            }
            else
            {
              delete user.Password;
              var token = jwt.sign({ userId: user._id  }, process.env.jwtsecret, { expiresIn: 1000000 });
              res.json({ success: true, message: 'Success!', token: token, user: { username: user.username } });
            }
          }
        }
      });
    }
  }
}
