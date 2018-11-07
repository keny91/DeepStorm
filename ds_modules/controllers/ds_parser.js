

const parser = require("./../../hots-parser/parser.js");
const vars = require("./../../environment/ds_vars.js");


/*  Check if the replay contains the map  */
function ReplayContainsMap(replay_info  , theReplayMap)
{
    if (replay_info instanceof vars.infoObject) 
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
        console.debug("Object 'replay_info' is not an instance of infoObject");
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

    if (replay_info instanceof vars.infoObject) 
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
        console.debug("Object 'replay_info' is not an instance of infoObject");
    }

    return found;
}





/*  Given a player_id from this match, try to load and process information into the structure   */
function ReadPlayerData (replay_info, player_index_ingame)
{
    if (replay_info instanceof vars.infoObject) 
    {
/// SEGUIR AQUIIIIII

        var new_player_class = new vars.playerData(replay_info, player_index_ingame);

    }
    return {};
}





function GetAllPlayersData(replay_info)
{
    var players = {};
    let players_list = replay_info.replayInfo.players;
    let player_ids = replay_info.replayInfo.match.playerIDs;

    // Check all players taking part in the match
    for (let player in player_ids)
    {
        let player_id = player_ids[player];
        let player_data = players_list[player_id];

        // Add playerIndex to winning or losing team list
        if(player_data["win"] == true)
        {
            replay_info.winPlayers.push(player_id);  
        } 
        else
        {
            replay_info.losePlayers.push(player_id);  
        }

        ReadPlayerData (replay_info, player_id)


        //if(PlayerWins())
    }

    return players;
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
exports.ReplayContainsCharacter = ReplayContainsCharacter;
exports.GetAllPlayersData = GetAllPlayersData;
