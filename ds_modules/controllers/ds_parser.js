

const parser = require("./../../hots-parser/parser.js");
const vars = require("./../../environment/ds_vars.js");

// enums and other constants
const TeamType = {
    'Blue' : 0,
    'Red' : 1
  };
  
vars.Hero_List


/*  Get from HostParser the patch under analysis */
function getCurrentPatch()
{


}
function GetMap(theMap, thereplay)
{
    var maptype;
    // search the map in our availible pool
    vars.Standard_Map_List.forEach(element => {
        if (element == theMap)
        {
            maptype = 1;
            // we found it ... return it.
            return [element,maptype];
        }   
    });

    // is it a brawl
<<<<<<< Updated upstream
    
=======
    vars.Brawl_Map_List
>>>>>>> Stashed changes

    // If we did not find any map
    return null;
}



function ReplayContainsMap(Map , theReplay)
{
    var a, b;
    [a,b] = GetMap(theMap:Map);
    if()
    {

    }
}


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




