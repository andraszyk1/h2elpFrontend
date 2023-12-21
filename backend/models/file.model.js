import { Sequelize,DataTypes, UUID } from "sequelize";
import { db } from "./db.config.js";



export const File= db.define("File",{
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        defaultValue:"Nowy plik"
       
    },
    data:{
        type:DataTypes.BLOB('medium'),
        allowNull:false,
  
    }
})