import {ad} from './activedirectoryConfig.js'
ad.findUsers(function(err, users) {
  if (err) {
    console.log('ERROR: ' +JSON.stringify(err));
    return;
  }

  if ((! users) || (users.length == 0)) console.log('No users found.');
  else {
    console.log('findUsers: '+JSON.stringify(users));
    return users=JSON.stringify(users);
  }
})

