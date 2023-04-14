const { createUser,updateUser,getAllUsers,deleteUser,getSingle,bluckusers} = require('../model/createUser')

// exports.createUserController = (req, res) => {
//     createUserService(req.token, req.body)
//       .then((result) => {
//         res.status(200).json(result);
//       })
//       .catch((err) => {
//         res.status(200).json(err);
//       });
//   };

exports.bluckuser = (req,res) =>{
bluckusers(req,res).then(bluck =>{
    return res.status(200).json(bluck)
  }).catch(err => {
    console.log('errorrrrrrr', err.message);
    return res.status(500).json(err)
  })
}

exports.createUserController = (req, res) => {
  createUser(req, res).then(user => {
    console.log('success===>');
    return res.status(200).json({
      message: "successfully",
      user
    })
  }).catch(err => {
    console.log('errorrrrrrr', err.message);
    return res.status(500).json({
      success: false,
      message: "error in create user"
    })
  })
}

exports.updateUserController = (req,res) =>{
  updateUser(req,res).then(user =>{
      return res.status(200).json(user)
    })
    .catch(err =>{
      return res.status(500).json(err)
    })
}

exports.getSingle = (req,res) =>{

  getSingle(req,res).then(user =>{
    return res.status(200).json(user)
  })
  .catch(err =>{
    return res.status(500).json(err)
  })
}

exports.getAllUserController = (req,res) =>{
  getAllUsers(req,res).then(user =>{
    return res.status(200).json(user)
  })
  .catch(err =>{
    return res.status(500).json(err)
  })
}

exports.userDeleteController = (req,res) =>{
  deleteUser(req,res).then(user=>{
    return res.status(200).json(user)
  }).catch(err=>{
    return res.status(500).json(err)
  })
}