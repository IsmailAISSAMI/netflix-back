const categoryResolver = require("../apollo/resolvers/category.resolver");
const Category = require("../models/category.model");

exports.createCategory = (req, res) => {
  const category = new Category({
    label: req.body.label,
  });

  category
    .save()
    .then((data) => {
      res.send({
        category: data,
      });
    })
    .catch((err) => res.send(err));
};

exports.getCategory = (req, res) => {
  Category.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Category with id ${req.params.id}was not found !`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.getCategories = (req, res) => {
  Category.find()
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Category with id ${req.params.id} was not found !`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

exports.updateCategory = (req, res) => {
  Category.findByIdAndUpdate(req.category.id, req.body, { new: true })
    .then((data) => {
      res.send({ category: data });
    })
    .catch((err) => res.status(500).json({ err: err }));
};

exports.deleteCategory = (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Category with id ${req.params.id} was not found !`,
        });
      }
      res.send(data);
    })
    .catch((err) => res.send(err));
};

// exports.removeOne = (req, res) => {
//   categoryResolver
//     .findByIdAndRemove(req.params.id)
//     .then((data) => {
//       if (!data) {
//         res.status(404).send({
//           message: `Category with id ${req.params.id} was not found !`,
//         });
//       }
//       res.send(data);
//     })
//     .catch((err) => res.send(err));
// };
