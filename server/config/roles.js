const AccessControl = require('accesscontrol');

let grantsObject = {
    admin : {
        test : {
            'create:any':['*'],
            'read:any':['*'],
            'update:any':['*'],
            'delete:any':['*'],
        }
    },
    user : {

    }
}

const roles = new AccessControl(grantsObject);

module.exports = { roles }