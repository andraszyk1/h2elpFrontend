
// import { Users as model} from '../models/user.model .js';
import {ad} from './activedirectoryConfig.js'


export async function login(req, res) {
        if (res.status(200)) {
          console.log(req.body);
          let cName=req.body.username;
          let dName=req.body.username+"@maflow.group";
          ad.authenticate(dName, req.body.password, function(err, auth) {
            if (err) {
              console.log('ERROR: '+JSON.stringify(err));
              return;
            }
          
            if (auth) {
              console.log('Authenticated!');
              ad.findUser(cName, function(err, adUser) {
                if (err) {
                  console.log('ERROR: ' +JSON.stringify(err));
                  return;
                }
              
                if (! adUser) {
                  console.log('User: ' + cName + ' not found.')
                  res.send({isAuthenticated:false,user:{},message:"usernotfound"})
                  }
                  else { 
                  console.log(JSON.stringify(adUser));
                  res.send({isAuthenticated:true,user:{
                    name:adUser.givenName,
                    surname:adUser.sn,
                    login:adUser.sAMAccountName,
                    principalLogin:adUser.userPrincipalName,
                    email:adUser.mail,
                    rcp:adUser.extensionAttribute4,
                    mpk:adUser.extensionAttribute2,
                    przelozony:adUser.extensionAttribute2,
                    stanowisko:adUser.description,
                    telefon:adUser.mobile,
                    dzial:adUser.department,
                    telefon:adUser.mobile,
                    kraj:adUser.co,
                    zaklad:adUser.company,
                    kodpocztowy:adUser.postalCode,
                    wojewodztwo:adUser.st,
                    ulica:adUser.streetAddress,
                    utworzone:adUser.whenCreated,
                    ostzmianahasla:adUser.pwdLastSet}
                  
                  })
                }
           
            }) 
            }
            else {
              console.log('Authentication failed!');
            }
          });
      
        }
 
      else {
        res.send({status:"Authentication failed"})
        console.log('Authentication failed!');
      }
    };
  

export async function logout(req, res) {
  console.log(req.body);
  if (res.status(200)) {

    res.send({isAuthenticated:false,user:{}})
  } else if (res.status(500)) {
    {
      message: err.message || "Some error occurred while log out."
    }
  }
}
