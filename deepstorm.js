/* Entry point for DeepStorm  */

const fs = require('fs');
const ls = require('os');
const init = require("./ds_modules/controllers/ds_init")
const Parser = require('./hots-parser/parser.js')

console.log("Testeando... %s", )

/*  Test    */
var inst = new init.Instance();
inst.name = "luis";
inst.sayHello();
inst.CheckHostReplayParser();


/* parse a replay*/
Parser.processReplay(hots_replay_file, options ={});



