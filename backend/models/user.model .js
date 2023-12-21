import { Sequelize,DataTypes } from "sequelize";
import { db } from "./db.config.js";


export const User= db.define("Users",{

    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4
    },
    name :{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    surname:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    roles:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    email:{
        type:DataTypes.STRING(44),
        allowNull:true,
      
    }
 ,
    login:{
        type:DataTypes.STRING(44),
        allowNull:true,
        unique:true,
        primaryKey:true,
    },
    principalLogin:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
  
    rcp:{
        type:DataTypes.STRING(10),
        allowNull:true,
    },
    mpk:{
        type:DataTypes.STRING(10),
        allowNull:true,
    },
    przelozony:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    przelozonyObject:{
        type:DataTypes.STRING,
        allowNull:true,
    },
    stanowisko:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    telefon:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    dzial:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    telefon:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    kraj:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    zaklad:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    kodpocztowy:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    wojewodztwo:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    ulica:{
        type:DataTypes.STRING(44),
        allowNull:true,
    },
    utworzone:{
        type:DataTypes.DATE,
        allowNull:true,
    },
    ostzmianahasla:{
        type:DataTypes.DATE,
        allowNull:true,
    },
})




