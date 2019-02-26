


const readline = require("readline");
const ds_msg = require("./../../environment/ds_messages");
const ds_matchFilter = require("./ds_matchFilter");
const ds_dataCollection= require("./ds_dataCollection");
const ds_vars = require("./../../environment/ds_vars");



// RETURN msg values for tree based operations.
const DSTREE_OPERATION_RETURN_OK = 1;
const DSTREE_OPERATION_RETURN_UNKNONW_ERROR = 201;
const DSTREE_OPERATION_RETURN_ALREADY_EXISTS = 202;
const DSTREE_OPERATION_RETURN_INVALID_INPUT = 203;



/** 
 *  Deprecated??
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










/** A data tree will have 3 references
 *  - Reference to the Tree file (after reading it we have the info for the MatchFilter and the DataCollection, also know the
 *  tree size and the root location, )
 * 
 *  ON SUCCESSFULL TREE CREATION -> Add treeFolder to the dsConfig settings.
 */
class DataTree
{
    constructor(dir)
    {

        this.rootFolderPath = dir;
        // create files and folders

        // Criteria that will filter out data
        //this.replayFilter = new ds_matchFilter.MatchFilter();
        this.replayFilter;
        //this.dataCollection = new ds_dataCollection.DataCollection(); 
        this.dataCollection;

        // note depicting the purpose of the tree -> optional
        this.description;

        // the number of replay entries parsed for this tree.
        this.nof_parsed_entries;

        // if we are running a study will be picking a certain amount of randomly selected samples from the ones stored in the tree.
        this.random_nof_samples_for_study;

        // checksum - generate id for entries
        this.checkSum = 0;


    }

    addReplayFilter(theFilter)
    {
        // check
        if(this.replayFilter != "undefined")
        {
            return DSTREE_OPERATION_RETURN_ALREADY_EXISTS;
        }
        else if  (theFilter instanceof ds_matchFilter.MatchFilter) 
        {
            return DSTREE_OPERATION_RETURN_INVALID_INPUT;
        }

        // do something

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



}

exports.DataTree = DataTree;
exports.askTreeDirectory = askTreeDirectory;

