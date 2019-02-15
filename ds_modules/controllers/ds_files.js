/** Document containing functions to parse data in memory to 
 * permanent files and viceversa. 
 */


const fs = require('fs');
const jsonfile = require('jsonfile');
const ds_msg = require("./../../environment/ds_messages");
var resolve = require('path').resolve;

/** Support function to convert relative to global path.
 * 
 * @param {string} path 
 */
function convertToGlobalPath(path)
{
    return resolve(path);
}

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
        console.warn(error);
        return ds_msg.DS_RETURN_NOT_FOUND;
    });

} 


/** Unsure if this function is worked as intended
 * 
 * @param {} filepath 
 */
async function fileExist(filepath)
{
    var out = 0;
    var out = await fs.stat(filepath, function(err, stat) {
        if(err == null) {
            out = 1;
            return out;

        } else if(err.code === 'ENOENT') {
            // file does not exist
        } else {
            console.log('Some other error: ', err.code);
        }
    });

    return out;

      
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
        return(ds_msg.DS_RETURN_OK);
    })
    .catch(error => {
        console.error(error);
        return ds_msg.DS_RETURN_UNKNONW_ERROR;
    })

} 


//function will check if a directory exists, and create it if it doesn't
async function createDirectory(rootDirectory) {  

    function statPath(path) {
        try {
          return fs.statSync(path);
        } catch (ex) {}
        return false;
      };
      
    async function CheckAndMake(dir)
    {   
        var exist = statPath(dir);
        var msg;
        // check if such a folder exists
        if(exist && exist.isDirectory()) {
            
            console.log(dir+ " already exists.");
            msg = ds_msg.DS_RETURN_FILE_EXIST_ALREADY;
        }
        else
        {
            try {
                let a = await fs.mkdirSync(dir)
                msg =  ds_msg.DS_RETURN_OK;
                //
                } catch (err) {
                console.error(err)
                }
            
        }
        return msg;

    }  

    // convert to global path
    var globaldir = convertToGlobalPath(rootDirectory);

    // Wait for folder to be created
    let msg = await CheckAndMake(globaldir);

    return msg;
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
exports.convertToGlobalPath = convertToGlobalPath;
exports.fileExist = fileExist;


