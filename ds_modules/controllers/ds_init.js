/**
 *  This document contains scripts that run multiple processes,
 * sometimes syncronous, sometimes in parallel.
 * 
 */



const fs = require('fs');
const path = require('path');
const colors = require('colors');
const source_tree = require("./../../environment/ds_sourceTree_constants.js")
const pjson = require("./../../package.json");
const simpleGit = require('simple-git')();
const async = require("async");



const configFileName = "dsconfig.json";

function DisplayBuildVersion()
{
    if (pjson) 
    {     

        console.log("\n\nCurrent Build version: "+ pjson.version);
        found = 1;
    }
    else
    {       
        let pathname =  path.join(__dirname, source_tree.hostparser_folder);
        console.log("\tFolder \""+pathname.red+"\" could not be found.");
    }
    
}


async function CloneParserRepo()
{
    await simpleGit.clone(source_tree.hostparser_git_repo_https,"./hots-parser/",[], async function(err)
        {
            if (err) throw err;
            else
            {
                console.log("\tCreated HotsParser git repository at the root." +" \n" );
                return 1;
            }

            return 0;
        });
}

function GitSucces()
{
    console.log("\tSuccess Cloning HotsParser git repo".green +" \n" );
}

/*  CheckRequiredFiles is an initialization function that will  */
async function CheckRequiredFiles()
{
    var all_good = 0;
    console.log("Checking for required libraries. \n" );
    
    /* Load all check functions in an array so they can be checked at different pace */
    var methods_sample = [CheckHostReplayParser, CheckGitUpdaterScript]; 

    methods_sample.forEach(function (element) {
        var check = element(); // run function 
        // if check fails the function should have already displayed the error message
        if (!check)
            return false;

    });

    // out of the check loop...
    console.log("\tSuccess".green +" checking for required libraries. \n" );
    return true;
}




function CheckGitUpdaterScript () 
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



function CheckHostReplayParser () 
{
    var found = 0;
    if (fs.existsSync(source_tree.hostparser_folder)) 
    {     
        console.log("\tDetected \""+ source_tree.hostparser_folder.green + "\" folder ... "  );
        found = 1;
    }
    else
    {       
        let pathname =  path.join(__dirname, "./../../",source_tree.hostparser_folder);
        console.log("\tFolder \""+pathname.red+"\" could not be found.");
        console.log("\tAttemting to clone repository ..." +" \n" );
       
        var ready = CloneParserRepo();
    }
    return found;
}



class dsConfigFile
{
    constructor()
    {
        // self
        this.fileName;
        this.filePath;

        // DeepStorm release version
        this.DS_version;

        // dataTreeLocation
        this.dataTreeDirectory;

        // tree type -> maybe we will have different trees
        this.dataTreeType;

    }


}




// dsLogs.dsLog = dsLog;
// dsLogs.dsWarning = dsWarning;
// dsLogs.dsError = dsError;

// module.exports = dsLogs;

exports.CheckRequiredFiles = CheckRequiredFiles;
exports.DisplayBuildVersion = DisplayBuildVersion;
//exports.CheckHostReplayParser = CheckHostReplayParser;