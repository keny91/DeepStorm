/* Entry point for DeepStorm  */

const fs = require('fs');
const ls = require('os');
const init = require("./ds_modules/controllers/ds_init");

//const replay_sample = require("./samples/CH_gamemode_leagueT_leagueB_000000.StormReplay");
const replay_path = "./samples/CH_gamemode_leagueT_leagueB_000000.StormReplay";


init.DisplayBuildVersion();

/*  Test    */

try {
    const Parser = require('./hots-parser/parser.js');
}
catch(err)
{
    init.CheckRequiredFiles();
}



/* parse a replay*/
//var replayInfo = Parser.processReplay(replay_path, options ={});

console.log("END");
//Parser.getHeader(file);
