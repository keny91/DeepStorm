/* Entry point for DeepStorm  */

const fs = require('fs');
const ls = require('os');
const init = require("./ds_modules/controllers/ds_init");

//const replay_sample = require("./samples/CH_gamemode_leagueT_leagueB_000000.StormReplay");
const replay_path = "./samples/CH_gamemode_leagueT_leagueB_000000.StormReplay";

const Parser = require('hots-parser');

init.DisplayBuildVersion();

/*  Test    */
//const Parser = require("./hots-parser/parser.js");

async function initProcess ()
{
    /* This part is supposed to be executed and waited for */
    try {
        
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

// linear -> wait till done
//initProcess ();


/* parse a replay*/
var replayInfo = Parser.processReplay(replay_path, options ={});

console.log("END");
//Parser.getHeader(file);

}



// Execution
main();