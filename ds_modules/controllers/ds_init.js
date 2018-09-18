
//const Files_env = require("")
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const source_tree = require("./../../environment/ds_sourceTree_constants.js")
const pjson = require("./../../package.json");


function DisplayBuildVersion()
{
    if (pjson) 
    {     
        console.log("Current Build version: "+ pjson.version);
        found = 1;
    }
    else
    {       
        let pathname =  path.join(__dirname, source_tree.hostparser_folder);
        console.log("\tFolder \""+pathname.red+"\" could not be found.");
    }
    
}


/*  CheckRequiredFiles is an initialization function that will  */
function CheckRequiredFiles()
{
    var all_good = 0;
    console.log("Checking for required libraries. \n" );
    
    // if fails the check
    if (!CheckHostReplayParser())
    {

    }
    else
    {

    }
     
    const found_GitUpdaterScript = CheckGitUpdaterScript() ;

    if (all_good)
        console.log("Success".green +" checking for required libraries. \n" );
}




function CheckHostReplayParser () 
{
    var found = 0;
    if (fs.existsSync(source_tree.git_updater_script_file)) 
    {     
        console.log("\tDetected \"" +source_tree.git_updater_script_file.green +"\" file ... ");
        found = 1;
    }
    else
    {       
        let pathname =  path.join(__dirname, source_tree.git_updater_script_file);
        console.log("\t\"".red+pathname.red+" could not be found. Deepstorm will try to gather the files..." );
    }
    return found;
}



function CheckGitUpdaterScript () 
{
    var found = 0;
    if (fs.existsSync(source_tree.hostparser_folder)) 
    {     
        console.log("\tDetected \""+ source_tree.hostparser_folder.green + "\" folder ... "  );
        found = 1;
    }
    else
    {       
        let pathname =  path.join(__dirname, source_tree.hostparser_folder);
        console.log("\tFolder \""+pathname.red+"\" could not be found.");
    }
    return found;
}


// dsLogs.dsLog = dsLog;
// dsLogs.dsWarning = dsWarning;
// dsLogs.dsError = dsError;

// module.exports = dsLogs;

exports.CheckRequiredFiles = CheckRequiredFiles;
exports.DisplayBuildVersion = DisplayBuildVersion;
//exports.CheckHostReplayParser = CheckHostReplayParser;