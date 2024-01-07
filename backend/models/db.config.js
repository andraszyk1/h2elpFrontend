import { Sequelize} from "sequelize";

export const db = new Sequelize("test","root","",{
    host:"localhost",
    dialect:"mysql",
    decimalNumbers:true,
    
    // logging:console.log()
});