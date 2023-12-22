

import { Op, Sequelize } from "sequelize";
import { db } from "../models/db.config.js";
import { Ticket as model, Category, User, TicketsOpiekunowie, TicketsAccepts, Post } from "../models/index.js";
import { createTicketMail } from "./nodemailer.js";
const modelName = model.name;

import multer from 'multer'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + file.originalname
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
})


export async function create(req, res) {

    upload.single('file')(req, res, async function (err) {
        if (err) {
            return res.status(400).send({ message: err.message });
        }


        try {

            let newTicket = await model.create({
                temat: req.body.temat,
                kategoria: req.body.kategoria,
                autor: req.body.autor,
                firma: req.body.firma,
                tresc: req.body.tresc,
                opiekunowie: req.body.opiekunowie,
                CategoryId: req.body.CategoryId,
                tworcaId: req.body.tworcaId,
                zglaszajacyId: req.body.zglaszajacyId,
                fileName: req?.file?.filename ?? '',
                fileData: req?.file?.path ?? ''

            });
            JSON.parse(req.body.opiekunowie).map(async opiekun => {
                const findOpiekunId = await User.findByPk(opiekun)
                await newTicket.addOpiekunowie(findOpiekunId, { as: "opiekunowie", foreignKey: "opiekunId", through: TicketsOpiekunowie })
            })

            await model.findOne(
                {
                    include: [
                        { model: User, as: "tworca" },
                        { model: Category }
                    ],
                    where: {
                        id: newTicket.dataValues.id
                    }
                }).then(data => {
                    // createTicketMail(data.id, `${data.tworca.name} ${data.tworca.surname} ${data.tworca.email} ${data.tworca.zaklad}`,
                    //     data.createdAt, data.Category.name, data.status, data.temat, data.tresc)
                    res.send(data);

                }).catch(err => {
                    console.log(err);
                })

        } catch (err) {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the ${modelName}.`
            });
        }


    })
};



export function findAll(req, res) {
    console.log(req.query);
    model.findAll({
        limit: Number(req.query?.limit),
        where: {
            [Op.or]: [{
                temat: { [Op.substring]: req.query.search },
                status: { [Op.substring]: req.query.status },
            }]
        }
        ,
        include: [
            {
                model: User, as: "tworca",

            },
            {
                model: Category,
                where: {
                    name: { [Op.substring]: req.query.category }
                }
            },
        ],
        order: db.literal("`updatedAt` DESC")
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
                message: `Could not delete ${modelName} with id=" + modelId`
            });
        });

}


export async function findOne(req, res) {
    await model.findOne({
        include: [
            { model: User, as: "tworca" },
            { model: User, as: "zglaszajacy" },
            { model: User, as: "opiekunowie", foreignKey: "opiekunId", through: TicketsOpiekunowie },
            { model: Category },
            { model: User, through: TicketsAccepts, as: "ticketAccepts", foreignKey: "userAcceptId" },
        ], where: {
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
export async function findTicketByTworcaId(req, res) {
    let limitFromFront = 5
    await model.findAndCountAll({
        limit: limitFromFront,
        offset: (req.params.page - 1) * limitFromFront,
        where: {
            tworcaId: req.params.id
        },
        order: db.literal("createdAt DESC")
    }).then(_data => {
        const totalPages = Math.ceil(_data?.count / limitFromFront)
        const { rows, count } = _data
        const data = { rows, count, totalPages }
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
    try {

        const result = await db.transaction(async (t) => {

            const ticket = await model.findByPk(req.params.id)
            const opiekunowieOld = await ticket.getOpiekunowie();
            const removeOpiekunowie = await ticket.removeOpiekunowie(opiekunowieOld);
            const awaitupdataOpiekunowie = await req.body.opiekunowie.forEach(async (opiekun) => {
                const findOpiekunId = await User.findByPk(opiekun)
                await ticket.addOpiekunowie(findOpiekunId, { as: "opiekunowie", foreignKey: "opiekunId", through: TicketsOpiekunowie })
            });

            await model.update({
                temat: req.body.temat || ticket.temat,
                tresc: req.body.tresc || ticket.tresc,
                status: req.body.status || ticket.status,
                CategoryId: req.body.CategoryId || ticket.CategoryId,
                tworcaId: req.body.tworcaId || ticket.tworcaId,
                zglaszajacyId: req.body.zglaszajacyId || ticket.zglaszajacyId,
            }, { where: { id: req.params.id } })

        });

        // If the execution reaches this line, the transaction has been committed successfully
        // `result` is whatever was returned from the transaction callback (the `user`, in this case)
        res.send({ message: "OK" })

    } catch (error) {
        res.send({ message: "NOK" })
        // If the execution reaches this line, an error occurred.
        // The transaction has already been rolled back automatically by Sequelize!

    }


}





export const findCountTicketsWithStatus = async (req, res) => {
    await model.findAndCountAll({
        where: {
            status: req.params.status
        }
    }).then(_data => {
        res.send(_data);
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || `Some error occurred while findCountTicketsWithStatus the ${modelName}.`
        });
    });

}
export const updateStatus = async (req, res) => {
    console.log(req.body);
    console.log(req.body.id)
    await model.update({ status: req.body.status }, {
        fields: ['status'],
        where: {
            id:{[Op.in] : req.body.id}
        }
    }).then(num => {
        if (num == 1) {
            res.send({
                message: `${modelName} status was updated successfully to ${req.body.status}.`
            });
        } else {
            res.send({
                message: `Cannot update ${modelName} with id=${req.body.id}. Maybe ${modelName} was not found or req.body is empty!`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || `Some error occurred while creating the ${modelName}.`
        });
    });

}

export function findTicketPosts(req, res, next) {
    const limitFromFront = 4
    Post.findAndCountAll({
        where: { TicketId: req.params.id },
        limit: limitFromFront,
        offset: (req.params.page - 1) * limitFromFront,
        include: [{ model: User, attributes: ['name', 'surname', 'email'] }],
        order: db.literal("createdAt DESC")
    }).then(_data => {
        const totalPages = Math.ceil(_data?.count / limitFromFront)
        const { rows, count } = _data
        const data = { rows, count, totalPages }
        res.send(data);
    })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || `Some error occurred while creating the ${modelName}.`
            });
        });
}

export function createTicketPost(req, res, next) {
    Post.create({
        content: req.body.content,
        UserLogin: req.body.login, status: "Nowe"
        , TicketId: req.params.id
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

