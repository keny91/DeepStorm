/**
 *  This document contains scripts that run multiple processes,
 * sometimes syncronous, sometimes in parallel.
 * 
 */



// const fs = require('fs');
const path = require('path');
const ds_files = require("./ds_files");
const fs  = require("fs");
// const colors = require('colors');
const source_tree = require("./../../environment/ds_sourceTree_constants.js");
const pjson = require("./../../package.json");
const ds_msg = require("./../../environment/ds_messages");
// const simpleGit = require('simple-git')();
// const async = require("async");




const ProjectStatus= 
{
    STATUS_OK : 0,
    STATUS_BAD_PROJECT_NAME: 1,
    STATUS_NON_UNIQUE_ID : 2,
    STATUS_UNKNOWN : 300
}



/* MMR  - currently Hotslogs based
Need to define types with some wording.
*/
const TreeTypes = {
    Default : 100,
    RawHeroDataOnly : 101,
    TeamModel : 102,
    SingleMap : 103,
    SingleLeague : 104,
    DeepHeroAnalysisOnMap : 105
    // ... more added if needed
  }

const DS_VERSION = pjson.version;

const DEFAULT_CONFIG_FILE_PATH = "./dsconfig.json";




async function CreateBaseTreeFolders(rootFolder, treeType)
{

}


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


/**
 *  Project are each of the case studies. Each points to a root folder were the processed data can be found.
 * 
 */
class dsProject{

    // only required to fill the ID
    constructor(theid)
    {
        this.id = theid;
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

    fillProjectData(projectName, rootDirectory, dataTreeType)
    {
        this.projectName = projectName;
        this.rootDirectory = rootDirectory;
        this.dataTreeType = dataTreeType;

    }




    async createProjectTreeFolders(rootDirectory, treeType)
    {

        let msg = await ds_files.createDirectory(rootDirectory);
 
        // create tree structure based on treeType
        // <--- here

        return msg;
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
            this.checkSum;

    }

    ReadFromPath(path)
    {
        if (ds_files.fileExist("./dsconfig.json"))
        {
            console.log('Detected dsConfiguration file, loading presets...');
            var config = require ("./dsconfig.json");
        }  
        else
        {
            console.warn("No \"dsConfig.json\" was found. Using default settings.")
            var config = CreateDefault();
        }
    
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

            if(jsonFile.checkSum != undefined)
                this.checkSum = jsonFile.checkSum;
            else
            {
                console.warn("\"checkSum\" attr not found in JSON.");
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


    /**
     * Verify that the structure does not contain inconsitencies:
     * ex) 2 projects with the same id, "nof_projects" not matching the actual number, ...
     */
    verifyProjectIntegrity()
    {


        // 1_ Seach for duplicate ids
        for (let j = 0; j < this.projects.length; j++)
        {
            for(let i = 0; i < this.projects.length; i++)
            {
                if(j!=i)
                {
                    if(this.projects[i].id ==  this.projects[j].id)
                        return ProjectStatus.STATUS_NON_UNIQUE_ID;
                }
            }
        }

        for (let p in this.projects)
        {
            if (p instanceof dsProject)
            {
                //  2_1 check name
                if(p.projectName ==undefined)
                {
                    console.log("Project with ID = "+ p.id+ ", Does not have a valid name.");
                    return ProjectStatus.STATUS_BAD_PROJECT_NAME;
                    
                }

                // 2.2 check directory (exists -> too slow?)
                if(p.rootDirectory ==undefined)
                {
                    console.log("Project with ID = "+ p.id+ ", Does not have a valid rootDirectory.");
                    return ProjectStatus.STATUS_BAD_PROJECT_NAME;
                }
                
                // each tree type might have a special check to validate the data inside
                // checkValidTree(p.dataTreeType)
                    
            }
            else
            {
                console.log("these are not dsProjects...");
            }
        }
    }

    /** 
     * 
     */
    saveConfigFileAsJson()
    {
        /*Step 1: put all the structures into a similar disposition as we intent to load it */

        /* 1.2 - Projects to array */

        /*Step 2: save as .json*/
        ds_files.writeJSONFile("./dsconfig.json",this);
    }

    isEmpty()
    {
        if(this.projects.length == 0)
        {
            if(this.nof_projects == 0)
                return true;

            else
                return ds_msg.DS_RETURN_UNKNONW_ERROR;
        }
        else
            return false;
    }


    /**
     * 
     * @param {*} projectName 
     * @param {*} rootFolder 
     * @param {*} dataTreeType Can be undefined or null and it will be parsed as a DEFAULT tree directory
     */
    async CreateProject(projectName, rootFolder, dataTreeType)
    {
        var project = new dsProject(this.checkSum);

        // verify non-empry/valid inpus
        if(projectName == undefined || projectName == null || rootFolder == null || rootFolder == undefined)
        {
            console.log("Project with ID = "+ this.id+ ", Does not have a valid name.");
            return ds_msg.DS_RETURN_INVALID_PARAMETER;
        }
        

        if(dataTreeType == undefined || dataTreeType == null)
        {
            console.log("Tree Type not specified, assuming default tree configuration.");
            dataTreeType = TreeTypes.Default;
        }


        
        project.fillProjectData(projectName, rootFolder, dataTreeType);
        let check = await project.createProjectTreeFolders(rootFolder,dataTreeType);


        if (check != ds_msg.DS_RETURN_OK)
        {
            console.error("Error creating "+ rootFolder +" a folder with that name already exists.")
            return check;
        }

        this.projects.push(project);
        this.nof_projects++;
        this.lastOpenedID = project.id;

        // increment checksum for the next project
        this.checkSum++;
        return ds_msg.DS_RETURN_OK;
    }


/**
 * Create an emptu
 */
    CreateDefault()
    {
            this.version = DS_VERSION;
            // dataTreeLocation
            this.checkSum = 0;
            this.nof_projects= 0;
            // 
            this.projects = [];

            // -1 is the index by default
            this.lastOpenedID = -1;
        
    }
}

/**
 * @param {Path to config.json} path 
 * @returns {object} dsConfig object, DS_RETURN_NOT_FOUND, DS_RETURN_UNKNONW_ERROR
 */
async function ReadConfigFromJSON(path)
{
    
    var configFile = new dsConfig();

    // if the file exists
    if (ds_files.fileExist(path))
    {
        //var config = require ("./dsconfig.json");
        let file = await ds_files.readJSONFile(path);
        if(file != ds_msg.DS_RETURN_NOT_FOUND)
        {
            configFile.ReadFromJSON(file);
        }
        // case we could not find the config file -> so we create a default one
        else
        {
            // do always for now
            if(1)
            {
                console.log("dsConfiguration file not found, creating a new from default...");
                configFile.CreateDefault();
            }
            else
                return ds_msg.DS_RETURN_UNKNONW_ERROR;

        }
            
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
exports.TreeTypes = TreeTypes;
//exports.CheckHostReplayParser = CheckHostReplayParser;