/* Entry point for DeepStorm  */

const fs = require('fs');
const ls = require('os');
const init = require("./ds_modules/controllers/ds_init");
const dsParser = require("./ds_modules/controllers/ds_parser");
const dsWinRT = require("./ds_modules/controllers/ds_WinRT");
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
//initProcess ();


/* parse a replay*/
//var replayInfo = parser_exp.processReplay(replay_path, options ={});

//
if (replay_path)
{
    let check;
    var replayInfo = new vars.StormData(replay_path);
    
    var filter = new dsWinRT.MatchFilter();
    //var filter_e = new filter();
    filter.map = vars.Standard_Map_List.CursedHollow;
    console.log(filter._map);
    console.log(filter.map);

   // console.log(filter2.map);
    var filter2 = new dsWinRT.MatchFilter();
    filter2.map = vars.Standard_Map_List.BattlefieldOfEternity;
    console.log(filter2.map);
    filter2._map = "AAAA";
    console.log(filter2.map);
    console.log(filter2._map);

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





    // var a =  await dsParser.GetAllPlayersData(replayInfo);

   

}
   

console.log("END");
}


main();
// getToken(main());

