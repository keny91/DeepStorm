/* Entry point for DeepStorm  */

const fs = require('fs');
const ls = require('os');
const init = require("./ds_modules/controllers/ds_init");
const dsParser = require("./ds_modules/controllers/ds_parser");
const vars = require("./environment/ds_vars.js");
//const infoObject = require("./environment/ds_vars");

//const replay_sample = require("./samples/CH_gamemode_leagueT_leagueB_000000.StormReplay");
const replay_path = "./samples/CH_gamemode_leagueT_leagueB_000000.StormReplay";
const parser = require('hots-parser');





async function initProcess ()
{
    if(!parser_exp)
    /* This part is supposed to be executed and waited for */
        try {
            // no longer here
        }
        catch(err)
        {
            var check = await init.CheckRequiredFiles();
        }
    /*  Wait to all process to end until this point  */
}


function main()
{
/*  Execute in order */
init.DisplayBuildVersion();



// linear -> wait till done
//initProcess ();


/* parse a replay*/
//var replayInfo = parser_exp.processReplay(replay_path, options ={});

//
if (replay_path)
{
    let check;
    var replayInfo = new dsParser.infoObject(replay_path);
    // let players = replayInfo.replayInfo.players;
    // let player_ids = replayInfo.replayInfo.match.playerIDs;

    // player_ids.forEach(element => {
    //     let a = players[element];
    //     console.log(a["hero"]);
    //     console.log(a["win"]);
    // });
    

    //var replayHeader = new headerObject(replay_path);

    //var test = replayInfo.replayInfo.players);
    
    check = dsParser.ReplayContainsMap(replayInfo, vars.Standard_Map_List.CursedHollow);
    
    if(check)
    {
        console.log("Map detected!");
    }

    check = dsParser.ReplayContainsCharacter(replayInfo, vars.Hero_List.LiLi, true);
    
    if(check)
    {
        console.log("Character detected!");
    }

}
   

console.log("END");
//Parser.getHeader(file);

}



// Execution
main();

