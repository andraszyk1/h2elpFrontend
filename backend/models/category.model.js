import { Sequelize,DataTypes, UUID } from "sequelize";
import { db } from "./db.config.js";



export const Category= db.define("Category",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    name:{
        type:DataTypes.STRING(44),
        allowNull:true,
  
    }
})






 

