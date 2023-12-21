// import { Users as model} from '../models/user.model .js';
import ActiveDirectory from 'activedirectory2';
// import ActiveDirectoryStrategy from 'passport-activedirectory'
var config = { 
    url: 'ldap://192.168.64.3',
  //  baseDN: 'DC=maflow,DC=group',
   baseDN: 'OU=Poland,DC=maflow,DC=group',
   username: 'admlandraszyk@maflow.group',
   password: '33Maflow',
   attributes :{
    user: [
      'userPrincipalName', 'sAMAccountName', 'mail',
      'whenCreated', 'pwdLastSet', 'userAccountControl',
      'employeeID', 'sn', 'givenName','extensionAttribute2','extensionAttribute3','extensionAttribute4',
      'description','mobile','department','co','company','postalCode','st','streetAddress'
    ],
    group: [
      'dn', 'cn', 'description', 'distinguishedName', 'objectCategory'
    ]
  }
   
  };
export const ad=new ActiveDirectory(config);