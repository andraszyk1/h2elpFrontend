


import { Category as model } from "../models/index.js";
const modelName=model.name;
export async function create(req, res) {
    await model.create({
        name: req.body.name,
     
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the ${modelName}.`
            });
        });


}

export function findAll(req, res, next) {
    model.findAll().then(data => {
       
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the ${modelName}.`
            });
        });
}

export  async function destroy(req, res) {
    const modelId=req.params.id;
console.log(modelId);

    await model.destroy({
        where: {
          id: modelId
        }
      }).then(num => {
        if (num == 1) {
          res.send({
            message: "Category was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete ${modelName} with id=${modelId}. Maybe ${modelName} was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: `Could not delete ${modelName} with id=` + modelId
        });
      });
}


export async function findOne(req, res) {
    console.log("findOne");
    await model.findAll({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the ${modelName}.`
            });
        });
};

export async function update(res, req) {
    await model.update(req.params.id, {
        name: req.body.name,
       
    }).then(data => {
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the ${modelName}.`
            });
        });
}

