/**
 * Document contains processes and structures to manipulate, read, write and 
 * interprete winrates.
 */

const vars = require("../../environment/ds_vars.js");
const ds_Parser = require("./ds_parser");
const ds_msg = require("./../../environment/ds_messages");


/**
 * @class Create a match filter object.
 */
class MatchFilter
{
    
    constructor()
    {
        this._map;
        this._Heroes = [];


        this._winHeroes = [];
        this._loseHeroes = [];
        // Saved when storing a win/lose hero
        this._winHeroesBuilds =[];
        this._loseHeroesBuilds =[];

        // team models
        this._winTeamModel;
        this._loseTeamModel;

        // game duration
        this._maxMatchDuration_loops = vars.DS_BUILD_ANY;
        this._minMatchDuration_loops = vars.DS_BUILD_ANY;



        
        this._winHeroesTeamModel = vars.DS_BUILD_ANY;
        this._loseHeroesTeamModel = vars.DS_BUILD_ANY;

        this._maxPlayerMMR =  vars.DS_ANY;
        this._minPlayerMMR =  vars.DS_ANY;
        this._maxAvrPlayerMMR =  vars.DS_ANY;
        this._minAvrPlayerMMR =  vars.DS_ANY;

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
        if(ds_Parser.IsValidMap(value) == ds_msg.DS_RETURN_OK)
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
            this._minMatchDuration_loops = vars.DS_BUILD_ANY;

        if(max_duration != null)
            this._maxMatchDuration_loops = max_duration;
        else 
            this._maxMatchDuration_loops = vars.DS_BUILD_ANY;
    }

    /** Set the filter range based on minutes as the measure unit.
     * 
     * @param {*} min_duration minimum duration in mins
     * @param {*} max_duration maximum duration in mins
     */
    setMatchDurationRange_mins(min_duration, max_duration)
    {
        if(min_duration>=max_duration)
        {
            console.warn("Invalid values for match duration matches.");
        }

        if(min_duration != null)
            this._minMatchDuration_loops = ds_Parser.MinutesToLoops(min_duration);
        else 
            this._minMatchDuration_loops = vars.DS_BUILD_ANY;

        if(max_duration != null)
            this._maxMatchDuration_loops = ds_Parser.MinutesToLoops(max_duration);
        else 
            this._maxMatchDuration_loops = vars.DS_BUILD_ANY;

        if (max_duration > 120)
            console.warn("Extreme length of match duration has been set in filter: "+ this);
    }

    /** Add a hero to the filtering, the hero will have to appear on the match under the 
     * appropiate circunstances
     * 
     * @param {*} heroNameId the Hero id to be inserted as a filter param
     * @param {*} team Win/Lose/Any 
     * @param {*} build a certain build for the hero, if any
     */
    addHero(heroNameId, team, build)
    {

        switch(team)
        {
            case vars.DS_WIN:
                if(this._winHeroes.length < 5)
                {
                    if(build == undefined || build == null)
                        this._winHeroesBuilds.push(vars.DS_BUILD_ANY);
                    else
                        this._winHeroesBuilds.push(build);
                    this._winHeroes.push(heroNameId);
                }     
                else
                    console.warn("Heroes limit reached in team Win.");
            break;

            case vars.DS_LOSS:
                if(this._loseHeroes.length < 5){
                    if(build == undefined || build == null)
                        this._loseHeroesBuilds.push(vars.DS_BUILD_ANY);
                    else
                        this._loseHeroesBuilds.push(build);
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

    get loseHeroesBuils()
    {
        return this._loseHeroesBuilds;
    }

    get winHeroesBuils()
    {
        return this._winHeroesBuilds;
    }

    get min_duration()
    {
        return this._minMatchDuration_loops;
    }

    get max_duration()
    {
        return this._maxMatchDuration_loops;
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

/** Compare a StormData replay instance with a filter. Returt 'true' if the 
 * replay fullfill ALL the filter´s criteria.
 * 
 * @param {Object} stormdata - aaaa
 * @param {MatchFilter} filter 
 */
function StormDataFulfillsFilter(stormdata, filter)
{
    if (!(stormdata instanceof vars.StormData) || !(filter instanceof MatchFilter))
    {
        console.error("Invalid data objects as inputs of \"StormDataFulfillsFilter\"");
        return DS_RETURN_UNKNONW_ERROR;
    }

    let check_success = 0;

    // 1 - Contains filter map?
    check_success = ds_Parser.ReplayContainsMap(stormdata, filter.map);
    if(!check_success)
    {
        console.log("Map not found, rejecting replay...");
        return false;
    }

    // 2 - check WIN Heroes
    for (let heroid in filter.winHeroes)
    {
        
        let hero = filter.winHeroes[heroid];
        let hero_build = vars.DS_BUILD_ANY;
        // are we looking for a particular build
        if(filter.winHeroesBuils[heroid] != vars.DS_BUILD_ANY)
        {
            hero_build = filter.winHeroesBuils[hero];
        }
        check_success =  ds_Parser.ReplayContainsCharacter(stormdata , hero, vars.DS_WIN, hero_build);
        if(!check_success)
        {
            console.log("Character "+ hero +" not found in Winning team, rejecting replay...");
            return false;
        }
    };
    
    // 3 - check LOSE Heroes
    for (let heroid in filter.loseHeroes)
    {
        let hero = filter.loseHeroes[heroid];
        let hero_build = vars.DS_BUILD_ANY;
        // are we looking for a particular build
        if(filter.loseHeroesBuils[hero] != vars.DS_BUILD_ANY)
        {
            hero_build = filter.loseHeroesBuils[hero];
        }
        check_success =  ds_Parser.ReplayContainsCharacter(stormdata , hero, vars.DS_LOSS, hero_build);            
        if(!check_success)
        {
            console.log("Character "+ hero +" not found in Losing team, rejecting replay...");                
            return false;
        }
    };

    // check ANY Heroes
    // for (let heroid in filter.loseHeroes)
    //    {
    //     let hero = filter.loseHeroes[heroid];
    //     let hero_build = vars.DS_BUILD_ANY;
    //     // are we looking for a particular build
    //     if(filter.loseHeroesBuils[hero] != vars.DS_BUILD_ANY)
    //     {
    //         hero_build = filter.HeroesBuils[hero];
    //     }
    //         check_success =  ds_Parser.ReplayContainsCharacter(stormdata , hero, vars.DS_LOSS, hero_build);            
    //         if(!check_success)
    //         {
    //             console.log("Character "+ hero +" not found in Losing team, rejecting replay...");                
    //             return false;
    //         }
    //     };

    // 4 - Match is in the time range set
    check_success = ds_Parser.ReplayMatchDurationIsInRange(stormdata, filter.min_duration, filter.max_duration);
    if(!check_success)
    {
        // show this in seconds/ms?
        console.log("Match duration outside time contrain ["+filter.min_duration+" ,"+filter.max_duration+", rejecting replay...");                
        return false;
    }

    // 5 - LEAGUE/MMR RANGE
    //filter.


    console.log("Replay fulfills criteria");

}


exports.MatchFilter = MatchFilter;
exports.StormDataFulfillsFilter = StormDataFulfillsFilter;