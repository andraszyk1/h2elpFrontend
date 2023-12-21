import { Sequelize} from "sequelize";

export const db = new Sequelize("helpdesk2","root","",{
    host:"localhost",
    dialect:"mysql",
    decimalNumbers:true,
    
    // logging:console.log()
});