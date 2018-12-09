/** Document containing functions to parse data in memory to 
 * permanent files and viceversa. 
 */


const fs = require('fs');
const jsonfile = require('jsonfile');
const ds_msg = require("./../../environment/ds_messages");


/** Read a json file
 * 
 * @param {string} file path to file
 */



/** Read a json file
 * 
 * @param {string} file path to file
 * @returns DS_RETURN_NOT_FOUND or the loaded object
 */
function tryReadJSON(file)
{
    return jsonfile.readFile(file)
    .then(obj => {
        return (obj)
    })
    .catch(error => {
        console.error(error);
        return ds_msg.DS_RETURN_NOT_FOUND;
    });

} 

/** Write a json file
 * 
 * @param {string} path path to file
 * @param {object} object object to be saved as JSON
 */
function tryWriteJSON(file, object)
{
    return jsonfile.writeFile(file, object)
    .then(res => {
        //  if debug_enabled
        // console.dir(object);
        // console.log('Write complete');
        return(ds_msg.DS_RETURN_OK);
    })
    .catch(error => {
        console.error(error);
        return ds_msg.DS_RETURN_UNKNONW_ERROR;
    })

} 


//function will check if a directory exists, and create it if it doesn't
function createDirectory(directory, callback) {  
    fs.stat(directory, function(err, stats) {
      //Check if error defined and the error code is "not exists"
      if (err && err.errno === 34) {
        //Create the directory, call the callback.
        fs.mkdir(directory, callback);
      } else {
        //just in case there was a different error:
        callback(err)
      }
    });
  }

// function writeJSONFile(path, object) 
// {
//     return new Promise((resolve, reject) => {
//         let data =  JSON.stringify(object, null, 2);
//             fs.writeFile(path, data, (err) => {  
//                 if (err) reject(err);
//                 resolve(ds_msg.DS_RETURN_OK);
//                 // console.log('Data written to file');
//         });
//     });
// }


// function readJSONFile(file) 
// {
//     return new Promise((resolve, reject) => {
//         fs.readFile(file, 'utf-8', (err, data) => { 
//             if (err) resolve(0);
//             resolve(JSON.parse(data));
//         });
//     });
// }


exports.readJSONFile = tryReadJSON ;
exports.writeJSONFile = tryWriteJSON;
exports.createDirectory = createDirectory;


