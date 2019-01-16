/**
 *  This document contains scripts that run multiple processes,
 * sometimes syncronous, sometimes in parallel.
 * 
 */



// const fs = require('fs');
const path = require('path');
const ds_files = require("./ds_files");
// const colors = require('colors');
const source_tree = require("./../../environment/ds_sourceTree_constants.js");
const pjson = require("./../../package.json");
const ds_msg = require("./../../environment/ds_messages");
// const simpleGit = require('simple-git')();
// const async = require("async");



/* MMR  - currently Hotslogs based
Need to define types with some wording.
*/
const TreeTypes = {
    Default : 100,
    RawHeroDataOnly : 101,
    TeamModel : 102,
    SingleMap : 103,
    SingleLeague : 104
    // ... more added if needed
  }

const DS_VERSION = pjson.version;

const DEFAULT_CONFIG_FILE_PATH = "./dsconfig.json";



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


/*
{
"version":"0.0.1",
"nof_projects":30,
"last_opened":0,
"projects":[ 
    {
        "id":0,
        "rootDirectory": "absolute_local_path",
        "projectName":"test1",
        "dataTreeType": 100,
    },
    {
        "id":1,
        "rootDirectory": "absolute_local_path2",
        "projectName":"test2",
        "dataTreeType": 101,
    } ]
}
*/


class dsProject{
    constructor()
    {
        this.id;
        this.rootDirectory;
        this.projectName;
        this.dataTreeType;
    }

    load(file)
    {
        this.id = file.id;
        this.rootDirectory = file.rootDirectory;
        this.projectName = file.projectName;
        this.dataTreeType = file.dataTreeType;
    }


}


/** Read the config file for a study set.
 * If successfull we will load all the projects available in the file into this structure.
 * Follow up with the callback to ask to load the latests project.
 * 
 */
class dsConfig
{
    constructor()
    {
        
    
            // DeepStorm release version
            this.version;
            this.projects = [];
            this.lastOpenedID;

    }

    /**
     * This function has to be internally changed
     * @param {*} jsonFile 
     */
    ReadFromJSON(jsonFile)
    {
        // is the file empty
        if(jsonFile != null || jsonFile!=undefined)
        {
            // version
            if(jsonFile.version != undefined)
                this.version = jsonFile.version;
            else
            {
                console.warn("\"Version\" attr not found in JSON.");
            }

            if(jsonFile.nof_projects != undefined)
                this.nof_projects = jsonFile.nof_projects;
            else
            {
                console.warn("\"nof_projects\" attr not found in JSON.");
            }
            
            if(jsonFile.lastOpenedID != undefined)
                this.lastOpenedID = jsonFile.lastOpenedID;
            else
            {
                console.warn("\"lastOpenedID\" attr not found in JSON.");
            }

            if(jsonFile.projects != undefined)
                this.projects = jsonFile.projects;
            else
            {
                console.warn("\"projects\" attr not found in JSON.");
            }
        }

        else
        {
            console.error("jsonFile is empty?!");
        }
        
    }

    getProjects()
    {
        // if(this.undefined )
        // {
        //     console.warn()
        // }
        // return 
    }

    /**
     * Get the last project that was loaded by deepStorm
     */
    getLastLoadedProject()
    {
        for(let i;i<this.nof_projects;i++)
        {
            //found it
            if(this.projects[i].id == this.lastOpenedID)
            {
                var projectObj = new dsProject();
                projectObj.load(this.projects[i]);
                return projectObj;
            }
        }

        return ds_msg.DS_RETURN_NOT_FOUND;
    }

    /**
     * Get a project stored in the config file with a certain ID.
     * @param {Number} the_id Numeric identificator for the project.
     */
    getProjectWithID(the_id)
    {
        for(let i;i<this.nof_projects;i++)
        {
            if(this.projects[i].id == the_id)
            {
                var projectObj = new dsProject();
                projectObj.load(this.projects[i]);
                return projectObj;
            }
        }
        return ds_msg.DS_RETURN_NOT_FOUND;
    }

    saveConfigFile()
    {

    }


    CreateDefault()
    {
            this.version = DS_VERSION;
            // dataTreeLocation

            // 
            this.projects = [];

            // 
            this.lastOpenedID;
        
    }
}

/**
 * @param {Path to config.json} path 
 * @returns {object} dsConfig object, DS_RETURN_NOT_FOUND, DS_RETURN_UNKNONW_ERROR
 */
async function ReadConfigFromJSON(path)
{
    var configFile = new dsConfig();
    let file = await ds_files.readJSONFile(path);
    //
    if(file != ds_msg.DS_RETURN_NOT_FOUND)
    {
      // Popup_YESorNO(string_info, callback);
        configFile.ReadFromJSON(file);
    }

    
    // // case we could not find the config file -> so we create one
    else
    {
        checkDirectory("./logs/", function(error) {  
            if(error) {
              console.log("Loading config not found, creating a new default file...");
              configFile.CreateDefault();

            } else 
            {
                return ds_msg.DS_RETURN_UNKNONW_ERROR;
              //Carry on, all good, directory exists / created.
            }
          });

        
    }
    // success scenario
    return configFile;

}



function callback_test1(input)
{
    if(input)
    {
        console.log(":D");
    }

    else
    {
        console.log("D:");
    }

    // do x

    return ;
}

/********************* */

// function Popup_YESorNO(string_info, callback)
// {
//     var input;
//     popupS.confirm({
//         content:     '<b>'+string_info+'</b>',
//         labelOk:     'Yes',
//         labelCancel: 'No',
//         onSubmit: function() {
//             //accepted
//             callback(1);

//             //console.log(':)');
//         },
//         onClose: function() {
//             callback(0);
//            // console.log(':(');
//         }
//     });
// }

 



// async function CloneParserRepo()
// {
//     await simpleGit.clone(source_tree.hostparser_git_repo_https,"./hots-parser/",[], async function(err)
//         {
//             if (err) throw err;
//             else
//             {
//                 console.log("\tCreated HotsParser git repository at the root." +" \n" );
//                 return 1;
//             }

//             return 0;
//         });
// }

// function GitSucces()
// {
//     console.log("\tSuccess Cloning HotsParser git repo".green +" \n" );
// }

// /*  CheckRequiredFiles is an initialization function that will  */
// async function CheckRequiredFiles()
// {
//     var all_good = 0;
//     console.log("Checking for required libraries. \n" );
    
//     /* Load all check functions in an array so they can be checked at different pace */
//     var methods_sample = [CheckHostReplayParser, CheckGitUpdaterScript]; 

//     methods_sample.forEach(function (element) {
//         var check = element(); // run function 
//         // if check fails the function should have already displayed the error message
//         if (!check)
//             return false;

//     });

//     // out of the check loop...
//     console.log("\tSuccess".green +" checking for required libraries. \n" );
//     return true;
// }




// function CheckGitUpdaterScript () 
// {
//     var found = 0;
//     if (fs.existsSync(source_tree.git_updater_script_file)) 
//     {     
//         console.log("\tDetected \"" +source_tree.git_updater_script_file.green +"\" file ... ");
//         found = 1;
//     }
//     else
//     {       
//         let pathname =  path.join(__dirname, source_tree.git_updater_script_file);
//         console.log("\t\"".red+pathname.red+" could not be found. Deepstorm will try to gather the files..." );
//     }
//     return found;
// }



// function CheckHostReplayParser () 
// {
//     var found = 0;
//     if (fs.existsSync(source_tree.hostparser_folder)) 
//     {     
//         console.log("\tDetected \""+ source_tree.hostparser_folder.green + "\" folder ... "  );
//         found = 1;
//     }
//     else
//     {       
//         let pathname =  path.join(__dirname, "./../../",source_tree.hostparser_folder);
//         console.log("\tFolder \""+pathname.red+"\" could not be found.");
//         console.log("\tAttemting to clone repository ..." +" \n" );
       
//         var ready = CloneParserRepo();
//     }
//     return found;
// }





/** EXPORTS */

// dsLogs.dsLog = dsLog;
// dsLogs.dsWarning = dsWarning;
// dsLogs.dsError = dsError;

// module.exports = dsLogs;

// exports.CheckRequiredFiles = CheckRequiredFiles;
exports.DisplayBuildVersion = DisplayBuildVersion;
exports.dsConfig = dsConfig;
exports.dsProject = dsProject;
exports.ReadConfigFromJSON = ReadConfigFromJSON;
//exports.CheckHostReplayParser = CheckHostReplayParser;