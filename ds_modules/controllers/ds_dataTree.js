


const root_File_name = "ds_study_list.json"; // json?
const readline = require("readline");


/** 
 * 
 * 
 */
function askTreeDirectory() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
});

    return new Promise(resolve => rl.question("Specify", ans => {
        rl.close();
        resolve(ans);
    }))
}

function CreateTreeAtDirectory(dir)
{

}

class DataTree
{
    constructor(dir)
    {
        /*  if directory exists */
        //loadDataTree(dir);

        //var aaa  = askTreeDirectory("Will this be the dir? ");
        /* else create tree at location */

    }

}

exports.DataTree = DataTree;
exports.askTreeDirectory = askTreeDirectory;

