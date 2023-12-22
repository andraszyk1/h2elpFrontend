import { Sequelize} from "sequelize";

export const db = new Sequelize("help","root","",{
    host:"localhost",
    dialect:"mysql",
    decimalNumbers:true,
    
    // logging:console.log()
});