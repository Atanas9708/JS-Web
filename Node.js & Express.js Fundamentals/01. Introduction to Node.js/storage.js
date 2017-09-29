const fs = require('fs');

let storage = {};

function validateKey(key) {
    if (typeof key !== 'string'){
        throw new Error("Key must be a string!"); 
    }
}

function checkIfKeyExists(key) {
    return storage.hasOwnProperty(key);
}

let put = (key, value) => {
    validateKey(key); 
    if (checkIfKeyExists(key)){
        throw new Error("Key already exists!");
    }

    storage[key] = value;
}

let get = (key) => {
    validateKey(key);
    if(!checkIfKeyExists(key)){
        console.log("Key not found!");
    }

    return storage[key];
}

let getAll = () => {
    if (Object.values(storage).length === 0){
        return "There are no items in the storage.";
    }
    return storage;
}

let update = (key, value) => {
    validateKey(key);
    if(!checkIfKeyExists(key)){
        console.log("Key not found!");
    }

    storage[key] = value;
}

let remove = (key) => {
    validateKey(key);
    if(!checkIfKeyExists(key)){
        console.log("Key not found!");
    }

    delete storage[key];
}

let clear = () => {
    storage = {};
}

let save = () => {
   return new Promise ((resolve, reject) => {
       let storageAsStr = JSON.stringify(storage);

       fs.writeFile('./storage.json', storageAsStr, err => {
           if (err){
               reject(err);
               return;
           }

           resolve();
       })
   })
}

let load = () => {
    return new Promise ((resolve, reject) => {

        fs.readFile('./storage.json', 'utf8', (err, data) => {
            if (err){
                reject(err);
                return;
            }

            storage = JSON.parse(data);
            resolve();
        })
    })
}

module.exports = {
    get: get,
    put: put,
    getAll: getAll,
    update: update,
    delete: remove,
    clear: clear,
    save: save,
    load: load
}