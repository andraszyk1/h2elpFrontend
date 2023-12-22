
import { Op, Sequelize } from 'sequelize';
import { User as model } from '../models/index.js';
import { ad } from './activedirectoryConfig.js';


export async function upsert(req, res) {

  ad.findUsers(function (err, users) {
    if (err) {
      console.log('ERROR: ' + JSON.stringify(err));
      return;
    }
    if ((!users) || (users.length == 0)) console.log('No users found.');
    else {

      users.slice().map((adUser) => {
        if (adUser.extensionAttribute4 !== '') {
          model.upsert(
            {
              name: adUser.givenName,
              surname: adUser.sn,
              login: adUser.sAMAccountName,
              principalLogin: adUser.userPrincipalName,
              email: adUser.mail,
              rcp: adUser.extensionAttribute4,
              mpk: adUser.extensionAttribute2,
              przelozony: adUser.extensionAttribute3,
              stanowisko: adUser.description,
              telefon: adUser.mobile,
              dzial: adUser.department,
              telefon: adUser.mobile,
              kraj: adUser.co,
              zaklad: adUser.company,
              kodpocztowy: adUser.postalCode,
              wojewodztwo: adUser.st,
              ulica: adUser.streetAddress,
              utworzone: adUser.whenCreated,
              ostzmianahasla: adUser.pwdLastSet,
            })
        }
      })


    }
  })
  const findAgain = await model.findAll();
  findAgain.forEach(async user => {
    const przelozonyUsera = await model.findOne({
      where: {
        rcp: user.przelozony
      }
    })
    const userToUpdate = await model.findOne({ where: { login: user.dataValues.login } });
    await userToUpdate.update({ przelozonyObject: przelozonyUsera ?? "" })

  })
  await model.findAll({
    attributes: ['name', 'surname', 'login']
  }).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `${modelName} status was updated successfully to ${req.body.status}.`
      });
    });
}



export async function create(req, res) {
  const newModel = { name: req.body.name, surname: req.body.surname, email: req.body.email };
  await model.create(newModel).then(data => {


    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating the ${modelName}.`
      });
    });
}

export async function findAll(req, res, next) {
  await model.findAll({
    attributes: ['name', 'surname', 'login', 'rcp'],
    limit: parseInt(req.query.limit) ?? 1200,
    where:
      Sequelize.and(
 
        Sequelize.or(
          { name: { [Op.substring]: req.query.search } },
          { surname: { [Op.substring]: req.query.search } },
          { login: { [Op.substring]: req.query.search } },
          { rcp: { [Op.substring]: req.query.search } },
        )
      ),

  }

  ).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || `Some error occurred while creating the ${modelName}.`
      });
    });
}

export async function destroy(req, res) {
  const modelId = req.params.id;
  await model.destroy({
    where: {
      id: modelId
    }
  }).then(num => {
    if (num == 1) {
      res.send({
        message: "Tutorial was deleted successfully!"
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




export function findOne(req, res) {
  model.findOne({
    where: {
      login: req.params.login
    }
  }).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

export async function update(res, req) {
  model.update(req.params.id, { name: req.body.name, surname: req.body.surname, email: req.body.email }).then(data => {
    res.send(data);
  })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });


}

