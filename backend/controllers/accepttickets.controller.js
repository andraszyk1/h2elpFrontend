

import { db } from "../models/db.config.js";
import { TicketsAccepts as model } from "../models/index.js";
const modelName = model.name;
export async function create(req, res) {
    console.log(req.body);
    await model.create({
        status: req.body.status,
        userAcceptId: req.body.userAcceptId,
        ticketAcceptId: req.body.ticketAcceptId,
    }).then(data => {
      if(data.status==="Do Akceptacji")
        res.send({success:true, message:`Prośba o akceptację ticketu nr ${req.body.ticketAcceptId} została wysłana do ${req.body.userAcceptId} `});
    else{
        res.send({success:false, message:`Nie udało się dodać poprawnie prośby o akceptację ticketu nr ${req.body.ticketAcceptId} do ${req.body.userAcceptId} już została wysłana  `});
    }
    }).catch(err => {
        res.send({success:false, message:`Prośba o akceptację ticketu nr ${req.body.ticketAcceptId} do ${req.body.userAcceptId} już została wysłana `});
    })
}

export function findAll(req, res) {
    model.findAll({
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || `Some error occurred while creating the ${modelName}.`
        });
    });

}

export async function destroy(req, res) {
    console.log(req.body);
    await model.destroy({
        where: {
            userAcceptId: req.body.userAcceptId,
            ticketAcceptId: req.body.ticketAcceptId,
        }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `${modelName} was deleted successfully!`
            });
        } else {
            res.send({
                message: `Cannot delete ${modelName} with id=${modelId}. Maybe ${modelName} was not found!`
            });
        }
    })
        .catch(err => {
            res.status(500).send({
                message: `Could not delete ${modelName} with id=" + modelId`
            });
        });

}


export async function findOne(req, res) {
    await model.findOne({
         where: {
            userAcceptId: req.body.userAcceptId,
            ticketAcceptId: req.body.ticketAcceptId,
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


export const update = async (req, res) => {
        await model.update({
            status: req.body.status,
        }, {
            where: {
                userAcceptId: req.body.userAcceptId,
                ticketAcceptId: req.body.ticketAcceptId,
            }
        }).then(data=>{
            if(data===1)
            res.send({ message: "OK" })
        else 
        res.send({ message: "NOK" })
        }).catch (error=> {})
    }