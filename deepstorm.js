/* Entry point for DeepStorm  */

const fs = require('fs');
const ls = require('os');
const init = require("./ds_modules/controllers/ds_init");
//const infoObject = require("./environment/ds_vars");

//const replay_sample = require("./samples/CH_gamemode_leagueT_leagueB_000000.StormReplay");
const replay_path = "./samples/CH_gamemode_leagueT_leagueB_000000.StormReplay";
const parser = require('hots-parser');



class infoObject{

    constructor(file)
    {
      var options ={};
      this.replayInfo = parser.processReplay(file, options);
    };
  
  }

/*  Test    */
//const parser_exp = require("./hots-parser/parser.js");

<<<<<<< Updated upstream
class headerObject
{
    constructor(file)
    {
      var options ={};
      this.replayHeader = parser.getHeader(file);
    };

}
=======
>>>>>>> Stashed changes


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
   // var replayInfo = new infoObject(replay_path);
    var replayHeader = new headerObject(replay_path);
}
   

console.log("END");
//Parser.getHeader(file);

}



// Execution
main();

