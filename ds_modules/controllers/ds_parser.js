

const parser = require("./../../hots-parser/parser.js");
const vars = require("./../../environment/ds_vars.js");


function IsValidMap(map)
{

    for (var m in vars.Standard_Map_List){
        if(vars.Standard_Map_List[m] == map)
            return vars.DS_RETURN_OK;
    }
        
    return vars.DS_RETURN_UNKNONW_NOT_FOUND;

}

/*  Check if the replay contains the map  */
function ReplayContainsMap(replay_info  , theReplayMap)
{
    if (replay_info instanceof vars.StormData) 
    {
        //console.log("Class object type detected!");

        // store in variables to bbetter study js behabiour
        let Map2 = theReplayMap.valueOf();
        let Map1 = replay_info.replayInfo.match.map;

        // is it the map we are searching for?
        if (Map2 == Map1)
            return true;
    }
    else
    {
        console.debug("Object 'replay_info' is not an instance of StormData");
    }
    return false;
}






/* Character: Name[string] - Build:1213211[string or array?] - BuildWeight(mapDependent) [aray?]*/
/*  Check if character participated in match   (and if is in winning team)  */
function ReplayContainsCharacter(replay_info , theHero, isInWinningTeam, build)
{
    let found =-1;
    let compare_build = -1;

    if (build != null)
        compare_build=1;

    // Add compare build check -> need to generate build

    if (replay_info instanceof vars.StormData) 
    {

        let players = replay_info.replayInfo.players;
        let player_ids = replay_info.replayInfo.match.playerIDs;
        

        // check all players by players_ids
        for (let player in player_ids)
        {
            //let player = players[element];
            let player_id = player_ids[player];
            let player_data = players[player_id];
            if(theHero.valueOf() == player_data["hero"])
            {
                /* Extra check if we are looking for a match where the hero WINS */
                if(isInWinningTeam)
                {
                    if(player_data["win"] == true)
                    {
                        found =  true;    
                    } 
                    else 
                    {
                        found =   false;
                    }  
                }

                /* If does not matter if win or loss */
                else
                {
                    found =  true;
                }
                // character was found, lets break here
                break;  
            }
        }
    }
    else
    {
        console.debug("Object 'replay_info' is not an instance of StormData");
    }

    return found;
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



class Replay
{

    /*  From a file create the header (quick reference information) and the body (extracted and processed info) */
    constructor(file)
    {
        this.header = new ReplayHeader(file);
        this.body = new ReplayBody(file);
    }


}







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


exports.ReplayContainsMap = ReplayContainsMap;
exports.IsValidMap = IsValidMap;
exports.ReplayContainsCharacter = ReplayContainsCharacter;

