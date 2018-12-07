/**
 * This document contains scripts to turn instances from 'hots-parser'
 * to our objects and structs.
 */

const parser = require("./../../hots-parser/parser.js");
const vars = require("./../../environment/ds_vars.js");
const ds_msg = require("./../../environment/ds_messages");





function LoopsToSeconds(loops)
{
  return parser.loopsToSeconds(loops);
}

function LoopsToMinutes(loops)
{
  let secs = parser.loopsToSeconds(loops);
  return Math.round((secs/60)* 100) / 100;
}

function SecondsToLoops(seconds)
{
  return seconds*16;
}

function MinutesToLoops(minutes)
{
  let secs = minutes*60;
  return SecondsToLoops(secs);
}





/** 
 * Is the map among the ones in the standard map list? 
 * @param {*} map the map id to be questioned,
 */
function IsValidMap(map)
{

    for (var m in vars.Standard_Map_List){
        if(vars.Standard_Map_List[m] == map)
            return ds_msg.DS_RETURN_OK;
    }
        
    return vars.DS_RETURN_UNKNONW_NOT_FOUND;

}

/**
 * Is the hero among the hero pool?
 * @param {*} hero the hero id in question.
 */
function IsValidHero(hero)
{

    for (var m in vars.Hero_List){
        if(vars.Hero_List[m] == hero)
            return ds_msg.DS_RETURN_OK;
    }
        
    return ds_msg.DS_RETURN_NOT_FOUND;

}

/**    Find out if the value is determined as a default.
 * 
 * @param {*} value the value to be examined
 */
function AnyValueParameter(value)
{
    if(value = vars.DS_ANY || value == null || value == undefined)
        return true;
    else 
        return false;
}


/*  Check if the replay contains the map  */
function ReplayContainsMap(stormdata  , theReplayMap)
{
    if (stormdata instanceof vars.StormData) 
    {
        //console.log("Class object type detected!");

        // store in variables to bbetter study js behabiour
        let Map2 = theReplayMap.valueOf();
        let Map1 = stormdata.replayInfo.match.map;

        // is it the map we are searching for?
        if (Map2 == Map1)
            return true;
    }
    else
    {
        console.debug("Object 'stormdata' is not an instance of StormData");
    }
    return false;
}


/** Find if a match duration is inside the specified range in loops.
 * 
 * @param {*} stormdata  StormData object instance.
 * @param {*} min_duration  minimum match duration.
 * @param {*} max_duration  max match duration.
 * @field  leave either of the ranges 'null', 'undefined' or 'DS_ANY' to not set a value for that threshold. 
 */
function ReplayMatchDurationIsInRange(stormdata, min_duration,max_duration)
{
    let valid = true;
    let check_min = false;
    let check_max = false;

    if (stormdata instanceof vars.StormData) 
    {
        let durationInLoops = stormdata.getMatchLenght();
        check_min = AnyValueParameter(min_duration);
        check_max = AnyValueParameter(max_duration);

        if(check_min && min_duration > durationInLoops)
        {
            return false;
        }

        if(check_max && max_duration < durationInLoops)
        {
            return false;
        }

    }
    else
    {
        console.debug("Object 'stormdata' is not an instance of StormData");
    }
    return valid;
}




/* Character: Name[string] - Build:1213211[string or array?] - BuildWeight(mapDependent) [aray?]*/

/** Check if character participated in match and under certain rules.
 * 
 * @param {*} stormdata StormData object that should be initialized already,
 * @param {*} theHero HeroId to be found in the match.  
 * @param {*} isInWinningTeam Is the hero in the winning/lossing/any side? - DS_WIN, DS_LOSS, DS_ANY
 * @param {*} build Are we searching for a particular build? - optional
 */
function ReplayContainsCharacter(stormdata , theHero, isInWinningTeam, build)
{
    let found =  false;
    let valid = false;
    let compare_build = false;

    // are we trying to find a build?
    if (build != null && build !=undefined && build != vars.DS_BUILD_ANY )
        compare_build=true;


    /** Add compare build check -> need to generate build
     * 
     * 
     * 
     * 
     */


    if (stormdata instanceof vars.StormData) 
    {

        let players = stormdata.replayInfo.players;
        let player_ids = stormdata.replayInfo.match.playerIDs;

        // check all players by players_ids
        for (let player in player_ids)
        {
            //let player = players[element];
            let player_id = player_ids[player];
            let player_data = players[player_id];
            if(theHero.valueOf() == player_data["hero"])
            {
                switch(isInWinningTeam)
                {
                    case vars.DS_WIN:
                        found =  true;
                        if(player_data["win"] == true)
                        {
                            valid = true;    
                        } 
                        
                    break;

                    case vars.DS_LOSS:
                        found =  true;
                        if(player_data["win"] == false)
                        {
                            valid = true;   
                        } 
                    break;

                    case vars.DS_ANY:
                        found = true;
                        valid =  true;
                    break;
                }

            }

            // if we found the hero
            if(found)
                break;
        }
    }
    else
    {
        console.debug("Object 'stormdata' is not an instance of StormData");
    }
    return valid;
}





/*  Check if character belongs to winning players   */ 


// "replay_id":"0",
// "patch":"XX.XX.XXXX",
// "map":"map_name",
// "game_mode":"game_mode_name",
// "mmr_mean":"0",
// "mmr_min":"0",
// "mmr_max":"0",
// "player_disconect":"0",             # nof players disconected
// "max_acc_disconection_time":"0",    # max_accumulated disconection time for the player 
// "duration":"duration",








// ignore for now
class ReplayHeader
{
    getMMR(file)
    {
        /*  Process ... looking at each player´s rank in Hostlogs (moreless significant) */


        return {
            mmr_mean: val_a,
            mmr_max: val_b,
            mmr_min: val_c
            };
    }

    // requires a file to initialize properties
    constructor(file){
        var MMR = {};
        var match = parser.getHeader(file);
        this.replay_id = match.id;      // unique match id?
        this.header = match.version;    // patch version
        this.map = match.map;
        this.game_mode = match.mode;    // QM, UD, HL, TL, BOTS, BRAWL
        this.game_type  = match.type;   // 
        this.date = match.date;
        this.rawdate = match.rawDate;
        this.tags = match.tags;
        this.region = match.region;             // not implemented
        this.game_lenght = match.game_lenght;   // not implemented

        // Estimate MMR present in the match - not present in parser.header
        MMR = getMMR(file);
        this.MMR_mean = MMR.mmr_mean;
        this.MMR_max =  MMR.mmr_max;
        this.MMR_min = MMR.mmr_min;
    }


}


exports.LoopsToSeconds = LoopsToSeconds;
exports.LoopsToMinutes = LoopsToMinutes;
exports.MinutesToLoops = MinutesToLoops;
exports.SecondsToLoops = SecondsToLoops;
exports.ReplayContainsMap = ReplayContainsMap;
exports.IsValidMap = IsValidMap;
exports.IsValidHero = IsValidHero;
exports.ReplayContainsCharacter = ReplayContainsCharacter;
exports.ReplayMatchDurationIsInRange = ReplayMatchDurationIsInRange;
exports.processReplay = parser.processReplay;
