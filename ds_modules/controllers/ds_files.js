
const fs = require('fs');

/** Read a json file
 * 
 * @param {string} file path to file
 */
function readJSONFile(file) 
{
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => { 
            if (err) reject(err);
            resolve(JSON.parse(data));
        });
    });
}


/** Write a json file
 * 
 * @param {string} path path to file
 */
function writeJSONFile(path, object) 
{
    

    return new Promise((resolve, reject) => {
        let data =  JSON.stringify(object, null, 2);
            fs.writeFile(path, data, (err) => {  
                if (err) reject(err);
                resolve(1);
                // console.log('Data written to file');
        });
    });
}


exports.readJSONFile = readJSONFile;
exports.writeJSONFile = writeJSONFile;