import express from 'express';
import cors from 'cors';
//import { db } from './models/db.config.js';
//import { router as ticketsRouter } from './routes/tickets.router.js';
//import { router as usersRouter } from './routes/users.router..js';
//import { router as categoryRouter } from './routes/category.router.js';
//import { router as loginRouter } from './routes/login.router.js';
//import { router as acceptticketsRouter } from './routes/accepttickets.router.js';
//import { router as fileRouter } from './routes/file.router.js';

const app = express();
const port =  3000;
app.get("/", (req, res) => {
  res.json({ message: "Welcome to helpdesk application." });
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/uploads/', express.static('public/images/'))


//app.use("/users",usersRouter );
//app.use("/tickets",ticketsRouter );
//app.use("/accepttickets",acceptticketsRouter );
//app.use("/categories",categoryRouter );
//app.use("/",loginRouter );
//app.use("/file",fileRouter );

app.listen(port);
//await db.sync()
// await db.sync()
 // .then(() => {
  //  console.log("Synced db.");
  //})
  //.catch((err) => {
   // console.log("Failed to sync db: " + err.message);
  //});
