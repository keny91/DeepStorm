


const readline = require("readline");
const ds_msg = require("./../../environment/ds_messages");
const ds_matchFilter = require("./ds_matchFilter");
const ds_dataCollection= require("./ds_dataCollection");
const ds_vars = require("./../../environment/ds_vars");
const TreeTypes = require("./../../environment/ds_treeTypes.json");
const ds_init = require("./ds_init");



// RETURN msg values for tree based operations.
const DSTREE_OPERATION_RETURN_OK = 1;
const DSTREE_OPERATION_RETURN_UNKNONW_ERROR = 201;
const DSTREE_OPERATION_RETURN_ALREADY_EXISTS = 202;
const DSTREE_OPERATION_RETURN_INVALID_INPUT = 203;
const DSTREE_FILE_NOT_FOUND = 204;

const DefaultFilterFile = "dsFilter.json";
const DefaultCollectionFile = "dsCollection.json";
const DefaultTreeDataFile = "dsTreeData.json";



class TreeData
{
    constructor()
    {
        // the number of replay entries parsed for this tree.
        this.nof_parsed_entries;

        // if we are running a study will be picking a certain amount of randomly selected samples from the ones stored in the tree.
        this.random_nof_samples_for_study;

        // checksum - generate id for entries
        this.checkSum = 0;



    }


}




/** A data tree will have 3 references
 *  - Reference to the Tree file (after reading it we have the info for the MatchFilter and the DataCollection, also know the
 *  tree size and the root location, )
 * 
 *  ON SUCCESSFULL TREE CREATION -> Add treeFolder to the dsConfig settings.
 */
class DataTree
{
    constructor(name ,dir , treeType)
    {

        this.rootFolderPath = dir;
        // create files and folders

        // Criteria that will filter out data
        //this.replayFilter = new ds_matchFilter.MatchFilter();
        this.replayFilter = new ds_matchFilter.MatchFilter();

        //this.dataCollection = new ds_dataCollection.DataCollection(); 
        this.dataCollection = new ds_dataCollection.DataCollection();

        //  tree data
        this.TreeData = new TreeData();

        // note depicting the purpose of the tree -> optional
        this.description;

        // note depicting an identifying name for the tree -> optional
        this.treeName = name;



        
        // Try to create treeFolder and files



    }

    addReplayFilter(theFilter)
    {
        // check
        if(this.replayFilter != "undefined")
        {
            console.warn("There is a filter already in place for this tree.")
            return DSTREE_OPERATION_RETURN_ALREADY_EXISTS;
        }
        else if  (theFilter instanceof ds_matchFilter.MatchFilter) 
        {
            return DSTREE_OPERATION_RETURN_INVALID_INPUT;
        }

        // do something

        // save JSON
        ds_files.writeJSONFile(this.rootFolderPath+DefaultCollectionFile,this.dataCollection);

    }



    /** If there is none defined, we will add the entire StormData content.
     * 
     * @param {*} theCollection 
     */
    addDataCollection(theCollection)
    {
        // check 
        if(this.dataCollection != "undefined")
        {
            return DSTREE_OPERATION_RETURN_ALREADY_EXISTS;
        }
        else if  (theCollection instanceof ds_dataCollection.DataCollection) 
        {
            return DSTREE_OPERATION_RETURN_INVALID_INPUT;
        }

        // do something

        // save JSON
        ds_files.writeJSONFile(this.rootFolderPath+DefaultCollectionFile,this.dataCollection);

    }

    initializeFilter(pathToFile = undefined)
    {
        // try initialize from json file
        var path;
        if(pathToFile == undefined)
            path = this.rootFolderPath + "/"+ DefaultCollectionFile; // use default location
        else 
            path = pathToFile;
        this.replayFilter = require(path);

        if(this.replayFilter == undefined || this.replayFilter == null)
            return ds_msg.DS_RETURN_NOT_FOUND;
            
        else return ds_msg.DS_RETURN_OK;

    }

    initializeCollection(pathToFile = undefined)
    {
        var path;
        if(pathToFile == undefined)
            path = this.rootFolderPath + "/"+ DefaultCollectionFile; // use default location
        else 
            path = pathToFile;

        // try initialize from json file
        this.dataCollection = require(path);

        if(this.dataCollection == undefined || this.dataCollection == null)
            return ds_msg.DS_RETURN_NOT_FOUND;
            
        else return ds_msg.DS_RETURN_OK;

    }

    initializeTreeData(pathToFile = undefined)
    {
        var path;
        if(pathToFile == undefined)
            path = this.rootFolderPath + "/"+ DefaultTreeDataFile; // use default location
        else 
            path = pathToFile;

        // try initialize from json file
        
        this.TreeData = require(path);

        if(this.TreeData == undefined || this.TreeData == null)
            return ds_msg.DS_RETURN_NOT_FOUND;
            
        else return ds_msg.DS_RETURN_OK;

    }

    /** Check if a StormData 
     * 
     * @param {StormData instance generated from } theData 
     */
    parseFromStormData(theData)
    {

        //  1-  check that StormData fulfills the filter
        
        //  2-  (if success) get use StormData to create a permanent data entry in the tree 
        //  (following the relevant info according to collection) 


        //  


    }


    /**
     *  By reading a project we will get access to the different file locations 
     * (or TreeData) at least.
     * 
     * FILES MUST HAVE BEEN CREATED BEFORE!
     */
    async initializeFromProject(project)
    {
        if  (project instanceof ds_init.dsProject)
        {
            this.rootFolderPath = project.rootDirectory;
            this.dataTreeTypeproject = project.dataTreeType;

            // Anything else? 

            // since rootFolderPath has a value already
            let checkData = await this.initializeTreeData();  // should mark the path for filter and collection jsons.

            if(checkData != ds_msg.DS_RETURN_OK)
                return DSTREE_FILE_NOT_FOUND;

            let checkCollection = await this.initializeCollection(); 
            if(checkCollection != ds_msg.DS_RETURN_OK)
                return DSTREE_FILE_NOT_FOUND;
    
            let checkCFilter = await this.initializeFilter(); 
            if(checkCFilter != ds_msg.DS_RETURN_OK)
                return DSTREE_FILE_NOT_FOUND;
            
        }


    }



}



/************************************************************************/
/*******************    TREE CREATION BASED ON TYPE     *****************/
/************************************************************************/


/**
 * NEED A BETTER WAY TO DEFINE TREETYPES AND PARAMS 
 */

/**
 *  Depending on which type of tree we will admit a different number of parameters that will end up creating an individual 
 * FILTER, COLLECTION & DATA for a tree.
 * 
 * Should this be split to different modules?
 * 
 */
// CreateTree(treeType, heroes, maps, ...)
CreateTree(treeType, heroes, maps, other)
{
    switch (treeType)
    {
        case TreeTypes.SingleMap_SingleHero_WinOnly:

        break;

        default:

        break;

    }

}






exports.DataTree = DataTree;
exports.askTreeDirectory = askTreeDirectory;

