const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const configs = require("../configs");

exports.signup = (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    subscribeDate: req.body.subscribeDate,
    isStandard: req.body.isStandard,
    isPremium: req.body.isPremium,
    isAdmin: req.body.isAdmin,
  });

  user
    .save()
    .then((data) => {
      let userToken = jwt.sign(
        {
          id: data._id,
          isAdmin: data.isAdmin,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        auth: true,
        token: userToken,
        isAdmin: data.isAdmin,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "[X] Some error occurred while creating a new user!",
      });
    });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      let passwordValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordValid) {
        return res.status(401).send({
          message: "Password is not valid !",
          auth: false,
          token: null,
        });
      }
      let userToken = jwt.sign(
        {
          id: user._id,
          isAdmin: user.isAdmin,
        },
        configs.jwt.secret,
        {
          expiresIn: 86400,
        }
      );
      res.status(200).send({
        auth: true,
        token: userToken,
        isAdmin: user.isAdmin,
      });
    })
    .catch((err) => res.status(404).send(err));
};

exports.createUser = (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
    subscribeDate: req.body.subscribeDate,
    isStandard: req.body.isStandard,
    isPremium: req.body.isPremium,
    isAdmin: req.body.isAdmin,
  });

  user
    .save()
    .then((data) => {
      let userToken = jwt.sign(
        {
          id: data._id,
        },
        "supersecret",
        { expiresIn: 86400 }
      );

      res.send({
        token: userToken,
        auth: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: 500,
        message:
          err.message || "[X] Some error occurred while adding an admin!",
      });
    });
};

exports.getUser = (req, res) => {
  console.log(req.user);
  User.findById(req.user.id)
    .then((user) => {
      console.log(user);
      res.send(user);
    })
    .catch((err) => res.status(404).send(err));
};

exports.getUsers = (req, res) => {
  User.find()
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User with id ${req.params.id} not found`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.verifyToken = (req, res) => {
  if (req.user) {
    res.status(200).json({ verify: true });
  }
};

exports.updateUser = (req, res) => {
  User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  })
    .then((data) => {
      res.send({ user: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};


exports.deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User with id ${req.params.id} not found!`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};
