
//const Files_env = require("")
const fs = require('fs');
const path = require('path');
const colors = require('colors');
const source_tree = require("./../../environment/ds_sourceTree_constants.js")
const pjson = require("./../../package.json");
const simpleGit = require('simple-git')();
const async = require("async");


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
    console.log("Success Cloning HotsParser git repo".green +" \n" );
}

/*  CheckRequiredFiles is an initialization function that will  */
async function CheckRequiredFiles()
{
    var all_good = 0;
    console.log("Checking for required libraries. \n" );
    
    // if fails the check -> git clone
    if (!CheckHostReplayParser())
    {
        console.log("\tAttemting to clone repository ..." +" \n" );
       
        var ready = await CloneParserRepo();
        

    //     ('git://github.com/strugee/node-git-clone-or-pull.git', path.join(process.cwd(), 'node-git-clone-or-pull'), function(err) {
    // if (err) throw err;
 
    // // Use repo
    // });
    // }
    // else
    // {
    //     console.log("\tLocated HotsParser git repo" +" \n" );
    // }
    }
     
    var found_GitUpdaterScript = CheckGitUpdaterScript() ;

    if (all_good)
        console.log("Success".green +" checking for required libraries. \n" );
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