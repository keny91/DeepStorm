/**
 * Document contains processes and structures to manipulate, read, write and 
 * interprete winrates.
 */

const vars = require("./../../environment/ds_vars.js");
const dsParser = require("./ds_parser");

class MatchFilter
{
    
    constructor()
    {
        this._map;
        this._Heroes = [];
        this._winHeroes = [];
        this._loseHeroes = [];

        this._winTeamModel;
        this._loseTeamModel;
        this._maxMatchDuration_loops = null;
        this._minMatchDuration_loops = null;

        this._winHeroesBuils =[];
        this._loseHeroesBuils =[];

        this._containsDisconections;

        // this._maxMatchDuration_ms;
        // this._minMatchDuration_ms
        // this.minPatch;
        // this.maxPatch;
    }


    /* Set the map in the filter, there might be issues with Warhead Junktion    */
    set map(value)
    {
        // check if is a valid map input
        if(dsparser.IsValidMap(value) == vars.DS_RETURN_OK)
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

    // we will convert to loops before setting up the params
    // setMatchDurationRange_MS(min_duration, max_duration)
    // {

    //     this._maxMatchDuration
    // }

    setMatchDurationRange_loops(min_duration, max_duration)
    {
        if(min_duration>=max_duration)
        {
            console.warn("Invalid values for match duration matches.");
        }

        if(min_duration != null)
            this._minMatchDuration_loops = min_duration;
        else 
            this._minMatchDuration_loops = null;

        if(max_duration != null)
            this._maxMatchDuration_loops = max_duration;
        else 
            this._maxMatchDuration_loops = null;

    }


    addHero(heroNameId, team, build)
    {

        switch(team)
        {
            case vars.DS_WIN:
                if(this._winHeroes.length < 5)
                {
                    if(build == undefined || build == null)
                        this._winHeroesBuils.push(vars.DS_BUILD_ANY);
                    else
                        this._winHeroesBuils.push(build);
                    this._winHeroes.push(heroNameId);
                }     
                else
                    console.warn("Heroes limit reached in team Win.");
            break;

            case vars.DS_LOSS:
                if(this._loseHeroes.length < 5){
                    if(build == undefined || build == null)
                        this._loseHeroesBuils.push(vars.DS_BUILD_ANY);
                    else
                        this._loseHeroesBuils.push(build);
                    this._loseHeroes.push(heroNameId);
                }
                else
                    console.warn("Heroes limit reached in team Loss.");
            break;

            case null:
                if(this._Heroes.length < 10)
                    this._Heroes.push(heroNameId);
                else
                    console.warn("Heroes limit reached in match.");
            break;
        }

    }

    /**
     * params 
     */
    get Heroes()
    {
        return this._Heroes;
    }
    get winHeroes()
    {
        return this._winHeroes;
    }
    get loseHeroes()
    {
        return this._loseHeroes;
    }


    /**
     * 
     * params: 
     */
    FilterToHostApiQuery()
    {

        return this.FilterToHostApiQuery;
    }

}


function StormDataFulfillsFilter(stormdata, filter)
{
    if (!(stormdata instanceof vars.StormData) || !(filter instanceof MatchFilter))
    {
        console.error("Invalid data objects as inputs of \"StormDataFulfillsFilter\"");
        return DS_RETURN_UNKNONW_ERROR;
    }

    let check_success = 0;

    check_success = dsParser.ReplayContainsMap(replayInfo, filter.map);

    if(check_success)
        console.log("Map found")


}


exports.MatchFilter = MatchFilter;
exports.StormDataFulfillsFilter = StormDataFulfillsFilter;