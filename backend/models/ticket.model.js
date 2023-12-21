import { Sequelize,DataTypes } from "sequelize";
import { User } from "./user.model .js";
import { db } from "./db.config.js";


export const Ticket= db.define("Ticket",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
       
    },
    temat:{
        type:DataTypes.STRING(144),
        allowNull:true,
    },
    tresc:{
        type:DataTypes.STRING(144),
        allowNull:true,
    },

    status:{
        type:DataTypes.STRING,
        defaultValue:"Nowe"
     
    },
    fileName:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:"Nowy plik"
     
  },
  fileData:{
      type:DataTypes.BLOB('long'
      ),
      allowNull:true,

  }
})

export const TicketsOpiekunowie = db.define('TicketsOpiekunowie', {
    opiekunId: {
      type: DataTypes.STRING(44),
      references: {
        model: User, // 'Movies' would also work
        key: 'login'
      }
    },
    ticketId: {
      type: DataTypes.INTEGER,
      references: {
        model: Ticket, // 'Actors' would also work
        key: 'id'
      }
    }
  },{freezeTableName:true});
export const TicketsAccepts = db.define('TicketsAccepts', {
 userAcceptId: {
      type: DataTypes.STRING(44),
      unique:false,
      references: {
        model: User, // 'Movies' would also work
        key: 'login'
      }
    },
    ticketAcceptId: {
      type: DataTypes.INTEGER,
      unique:false,
      references: {
        model: Ticket, // 'Actors' would also work
        key: 'id'
      }
    },
    status:{
      type:DataTypes.ENUM("Zaakceptowane","Odrzucone","Do Akceptacji"),
      defaultValue:"Do Akceptacji",
      allowNull:false
    },

    
  },{freezeTableName:true});


