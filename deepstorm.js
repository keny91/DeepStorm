/* Entry point for DeepStorm  */

const fs = require('fs');
const ls = require('os');
const init = require("./ds_modules/controllers/ds_init");
const ds_Parser = require("./ds_modules/controllers/ds_parser");  // can take out of here
const dsWinRT = require("./ds_modules/controllers/ds_matchFilter");   
const vars = require("./environment/ds_vars.js");
var csv = require("fast-csv");
const fetch = require('node-fetch');


//const StormData = require("./environment/ds_vars");

//const replay_sample = require("./samples/CH_gamemode_leagueT_leagueB_000000.StormReplay");
const replay_path = "./samples/CH_gamemode_leagueT_leagueB_000000.StormReplay";

// this is an alternative way to invoke hots-parser
//const parser = require('hots-parser');


function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
}


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


/* Test */
async function ReadHotslogs_30daysfile()
{
    var stream = fs.createReadStream("ReplayCharacters.csv");
    var csvStream = csv()
        .on("data", function(data){
            console.log(data);
        })
        .on("end", function(){
            console.log("done");
        });
    
    await stream.pipe(csvStream);
}


/* Request test */
async function MakeHotsapiRequest()
{

    const url = 'https://hotsapi.net/api/v1/talents/KaelthasFlamestrikeConvection';
    const getData = async url => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        //console.log(json);
        return json;
      } catch (error) {
        console.log(error);
      }
    };
    j = getData(url);
    ////
    return j;
} 


async function main()
{
/*  Execute in order */
init.DisplayBuildVersion();



var a = await MakeHotsapiRequest();
console.log(a);
// linear -> wait till done


/** TEST PROCESS:
 *      1) Create Filter
 *      2) Get Replay queries to HOTSAPI -> maybe we can get complex params like certain characters or builds
 *      3) Verify that replay contains filter´s rules -> APPROVE OR REJECT
 *      4) APPROVED replays will be re-parsed and the data will be locally stored for our analyzing purpuses
 *          ===> BUILD A DATA TREE FILE SYSTEM
 * 
 */





//
if (replay_path)
{
    let check;
    var replayInfo = new vars.StormData(replay_path);
    
    console.log(replayInfo.gameData.matchLenghtLoops);
    console.log(ds_Parser.LoopsToSeconds(replayInfo.gameData.matchLenghtLoops));
    console.log(ds_Parser.LoopsToMinutes(replayInfo.gameData.matchLenghtLoops));

    var filter = new dsWinRT.MatchFilter();
    //var filter_e = new filter();
    filter.map = vars.Standard_Map_List.CursedHollow;
    filter.addHero( vars.Hero_List.Butc, vars.DS_LOSS,);
    //filter.setMatchDurationRange_loops(300,30000);

    filter.setMatchDurationRange_mins(10,21); // from 10 to 18 mins
    // console.log(filter.winHeroes);
    // console.log(filter.Heroes);


    //check = ds_Parser.ReplayContainsMap(replayInfo, vars.Standard_Map_List.CursedHollow);
    
    dsWinRT.StormDataFulfillsFilter(replayInfo,filter);

    // check = ds_Parser.ReplayContainsCharacter(replayInfo, vars.Hero_List.LiLi, true);
    // if(check)
    // {
    //     console.log("Character detected!");
    // }





    // var a =  await ds_Parser.GetAllPlayersData(replayInfo);

   

}
   

console.log("END");
}


main();
// getToken(main());

