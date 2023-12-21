import { Ticket ,TicketsOpiekunowie,TicketsAccepts} from "./ticket.model.js";
import { User } from "./user.model .js";
import { Category } from "./category.model.js";
import { Post } from "./post.model.js";
import { File } from "./file.model.js";
import { DataTypes } from "sequelize";

Category.hasMany(Ticket)
Ticket.belongsTo(Category)


Ticket.belongsTo(User,{foreignKey:{name:"tworcaId",type:DataTypes.STRING(44)},as:"tworca"})
User.hasMany(Ticket,{foreignKey:{name:"tworcaId",type:DataTypes.STRING(44)},as:"tworca"})

Ticket.belongsTo(User,{foreignKey:{name:"zglaszajacyId",type:DataTypes.STRING(44)},as:"zglaszajacy"})
User.hasMany(Ticket,{foreignKey:{name:"zglaszajacyId",type:DataTypes.STRING(44)},as:"zglaszajacy"})

Ticket.belongsToMany(User,{through:TicketsOpiekunowie,as:"opiekunowie",foreignKey:"ticketId"})
User.belongsToMany(Ticket,{through:TicketsOpiekunowie,as:"tickets",foreignKey:"opiekunId"})

Ticket.belongsToMany(User,{through:TicketsAccepts,as:"ticketAccepts",foreignKey:"ticketAcceptId",otherKey:"userAcceptId"})
User.belongsToMany(Ticket,{through:TicketsAccepts,as:"userAccepts",foreignKey:"userAcceptId",otherKey:"ticketAcceptId"})
Ticket.hasMany(TicketsAccepts,{foreignKey:"ticketAcceptId"});
TicketsAccepts.belongsTo(Ticket,{foreignKey:"ticketAcceptId"});
Ticket.hasMany(Post)
Post.belongsTo(Ticket)
Post.belongsTo(User)
User.hasMany(Post)
await Category.sync()
await User.sync()
await Ticket.sync()
await TicketsAccepts.sync()
await Post.sync()
await File.sync()
// await Category.sync({alter:true})
// await User.sync({alter:true})
// await Ticket.sync({alter:true})
// await TicketsAccepts.sync({alter:true})

// await Ticket.sync({force:true})
// await Category.sync({force:true})
// await User.sync({force:true})

// const tableUser=[
//     {name:"Wojciech",surname:"Wojciechowski",email:"WojciechWojciechowski@maflow.com",roles:"admin"},
//     {name:"Dariusz",surname:"Rudnik",email:"WojciechWojciechowski@maflow.com",roles:"user"},
//     {name:"Jacek",surname:"Bednarek",email:"jacek.bednareki@maflow.com",roles:"admin"},
//     {name:"Zbysław",surname:"Ciszynski",email:"zbyslaw.ciszynski@maflow.com",roles:"admin"},
//     {name:"Zbigniew",surname:"Przybyla",email:"zbigniewprzybyla@maflow.com",roles:"admin"},
//     {name:"Ryszard",surname:"Kulczyk",email:"ryszardkulczyk@maflow.com",roles:"admin"},
//     {name:"Przemysław",surname:"Kania",email:"przemyslawkania@@maflow.com",roles:"admin"},
// ]
// const usersToAdd=await User.bulkCreate(tableUser)
// console.log("--------------",usersToAdd[0].dataValues.id);
// const categoriesTable=[
//     {name:"Zasoby sieciowe"},{name:"Drukarki"},{name:"Outlook"},
//     {name:"Baza techniczna"},{name:"Brak dostępu do zasobów"},{name:"DMS/Faktura"},
//     {name:"E-mail"},{name:"Instalacja drukarki"},{name:"Instalacja nowego komputera"},
//     {name:"Instalacja oprogramowania"},{name:"Instalacja/przeniesienie telefonu stacjonarnego"},{name:"Internet"},
//     {name:"Nowy pracownik"},{name:"Nadanie uprawnień do druku/skanowania"},{name:"MS Office"},
//     {name:"Problemy z czytnikiem"},{name:"Problemy z siecią komputerową"},{name:"Przydział telefonu komórkowego"},
// ]
// const kategorie=await Category.bulkCreate(categoriesTable,{updateOnDuplicate:['name']});

// const ticketsTable=[
//     {temat:"Nowy temat",tresc:"",status:"",CategoryId:1,tworcaId:104,zglaszajacyId:55,opiekunId:4},
//     {temat:"Nowy temat",tresc:"",status:"",CategoryId:1,tworcaId:105,zglaszajacyId:56,opiekunId:5}
    
// ]
// const tickets=await Ticket.bulkCreate(ticketsTable);

export {User,Category,Ticket,TicketsOpiekunowie,TicketsAccepts,Post,File}
