const vars = require("./../../environment/ds_vars.js");
//const parser = require("./../../hots-parser/parser.js");
const ds_parser = require("./ds_parser");

class MatchFilter
{
    #map;
    constructor()
    {
        this._map;
        // this.charactersWin;
        // this.charactersLose;
        // this.winTeamModel;
        // this.loseTeamModel;
        // this.maxMatchDuration;
        // this.minMatchDuration;
        // this.minPatch;
        // this.maxPatch;
    }

    /* Set the map in the filter, there might be issues with Warhead Junktion    */
    set map(value)
    {
        // check if is a valid map input
        if(ds_parser.IsValidMap(value) == vars.DS_RETURN_OK)
        {
            this._map = value;
        }
        else
            this._map = undefined;
    }

    get map()
    {
        if(this._map == undefined)
            return undefined
        else
            return this._map;
    }
}


exports.MatchFilter = MatchFilter;