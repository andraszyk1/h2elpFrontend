import { DataTypes } from "sequelize";
import { db } from "./db.config.js";



export const Post= db.define("Posts",{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    title:{
        type:DataTypes.STRING(44),
        allowNull:true,
  
    },
    content:{
        type:DataTypes.STRING(44),
        allowNull:true,
  
    },
    status:{
        type:DataTypes.STRING(44),
        allowNull:true,
  
    }
},{freezeTableName:true})






 

