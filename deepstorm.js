/* Entry point for DeepStorm  */

const fs = require('fs');
const ls = require('os');
const init = require("./ds_modules/controllers/ds_init");
const Parser = require('./hots-parser/parser.js');

/*  VAR FILES */
//var json_replay_inforef = require("./environment/replay_inforef.json");

const replay_sample_path = "./samples/";
const replay_sample_1 = "CH_gamemode_leagueT_leagueB_000000.StormReplay";



/* This on a different VAR file */ 
const replay_format_postfix=".StormReplay";

replay_sample_path.concat(replay_sample_1);


/*  INIT     */
//console.log(replay_sample_path );

console.log("Testeando... %s", );

/*  Test    */
var inst = new init.Instance();
inst.name = "luis";
inst.sayHello();
inst.CheckHostReplayParser();


hots_replay_file = replay_sample_path;
/* parse a replay*/
// if( (fs.existsSync(hots_replay_file))
//     Parser.processReplay(hots_replay_file);



