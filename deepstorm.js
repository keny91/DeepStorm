/* Entry point for DeepStorm  */

const fs = require('fs');
const ls = require('os');
const init = require("./ds_modules/controllers/ds_init");
const dsParser = require("./ds_modules/controllers/ds_parser");
const vars = require("./environment/ds_vars.js");
const curl = new (require( 'curl-request' ))();
const request = require('request');
const fetch = require('node-fetch');

//const infoObject = require("./environment/ds_vars");

//const replay_sample = require("./samples/CH_gamemode_leagueT_leagueB_000000.StormReplay");
const replay_path = "./samples/CH_gamemode_leagueT_leagueB_000000.StormReplay";
const parser = require('hots-parser');


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


async function MakeHotsapiRequest()
{

    const getData = async url => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
        } catch (error) {
            console.log(error);
        }
    };
    
    return new Promise(function(fulfill, reject){
        const url = 'https://hotsapi.net/api/v1/talents/KaelthasFlamestrikeConvection';


    })
    //
    
    // var headers = {
    //     'accept': 'application/json'
    // };
    
    // var options = {
    //     url: 'https://hotsapi.net/api/v1/talents/KaelthasFlamestrikeConvection',
    //     headers: headers
    // };
    
    // var cap_body;
    
    // request(options ,function(error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     console.log(body);
    //     cap_body = body;
    //   }
    //   else
    //   console.log("skipped");
    // });

    const url = 'https://hotsapi.net/api/v1/talents/KaelthasFlamestrikeConvection';
    const getData = async url => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    };
    getData(url);
    ////
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
    var replayInfo = new vars.infoObject(replay_path);
    
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





    var a = dsParser.GetAllPlayersData(replayInfo);

   

}
   

console.log("END");
//Parser.getHeader(file);

}


// function getToken(callback){
//     //const result = await MakeHotsapiRequest();;
//     MakeHotsapiRequest();
//     callback();
//     //return result;
// }


// getToken(function(){
//     main();
// });

// Execution
MakeHotsapiRequest().then(main);
//getSomeAsyncData().then(main());
 //main();
// getToken(main());

