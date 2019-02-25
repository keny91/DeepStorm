


const readline = require("readline");
const ds_msg = require("./../../environment/ds_messages");
const ds_matchFilter = require("./ds_matchFilter");
const ds_vars = require("./../../environment/ds_vars");





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



/**
 * These are data structures in which we specify the data we will be collecting from each replay.
 */
class DataCollection
{
    constructor()
    {
        // Data stored that belong to each team
        this.TeamWinData; // ds_vars.team;
        this.TeamLoseData;
    }
}








class DataTree
{
    constructor(dir)
    {
        // Criteria that will filter out data
        //this.replayFilter = new ds_matchFilter.MatchFilter();
        this.replayFilter;
        //this.dataCollection = new 
        this.dataCollection;


    }

    setReplayValues()
    {

    }

}

exports.DataTree = DataTree;
exports.askTreeDirectory = askTreeDirectory;

