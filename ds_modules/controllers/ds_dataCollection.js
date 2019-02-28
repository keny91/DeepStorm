

/**
 * These are data structures in which we specify the data we will be collecting from each replay.
 * We just have to define what data are we taking from a StormData instance.
 * 
 */
class DataCollection
{
    constructor()
    {
        // Data stored that belong to each team -> store everything by default?
        this.TeamWinData; // ds_vars.team;
        this.TeamLoseData;

        // Match Relevant Data -> store everything by default?
        this.MatchData;
    }

    /** Maybe is unnecessary
     */
    initFromJson(jsonFile)
    {
        // all the this
    }


    /**
     * 
     * @param {*} param 
     * @param {*} value value or min_value
     */
    defineCollection(param, value)
    {

    }

}


exports.DataCollection = DataCollection;