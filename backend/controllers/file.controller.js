
// import multer from 'multer'
// const  storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads')
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now())
//     }
//   })
//   var uploadMulter = multer({ storage: storage })


//    upload.single('myFile'), (req, res, next) => {
//     const file = req.file
//     if (!file) {
//       const error = new Error('Please upload a file')
//       error.httpStatusCode = 400
//       return next(error)
//     }
//       res.send(file)
   
//   })
import { File as model } from "../models/index.js";
const modelName=model.name;
export async function upload(req, res) {

console.log(req.file);
    const {originalname,buffer}=req.file
    await model.create({
        name: originalname,
        data:buffer
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