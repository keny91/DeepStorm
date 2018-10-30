

const parser = require("./../../hots-parser/parser.js");
const vars = require("./../../environment/ds_vars.js");


/*  Check if the replay contains the map  */
function ReplayContainsMap(replay_info  , theReplayMap)
{

    
 let Map2 = theReplayMap.valueOf();
 let Map1 = replay_info.replayInfo.match.map;


 if (Map2 == Map1)
    return true;

return false;
}




/*  Check if character participated in match   (and if is in winning team)  */
function ReplayContainsCharacter(replay_info , theHero, isInWinningTeam)
{
 var ReplayMap;
 var Maptype;

 let players = replayInfo.replayInfo.players;
 let player_ids = replayInfo.replayInfo.match.playerIDs;

 // use identifiers to navigate the objects
 player_ids.forEach(element => {
     let player = players[element];
     console.log(a["hero"]);
     console.log(a["win"]);
 });
 

if (isInWinningTeam)
{
    if(1)
    {

    }
}

return false;
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


class infoObject{
    
    constructor(file)
    {
      var options ={};
      this.replayInfo = parser.processReplay(file, options);
      
    };
}

/*  Test    */
//const parser_exp = require("./hots-parser/parser.js");

class headerObject
{
    constructor(file)
    {
      var options ={};
      this.replayHeader = parser.getHeader(file);
    };

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
exports.infoObject = infoObject;
