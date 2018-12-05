/* Entry point for DeepStorm  */

const fs = require('fs');
const ls = require('os');
const init = require("./ds_modules/controllers/ds_init");
const ds_Parser = require("./ds_modules/controllers/ds_parser");  // can take out of here
const ds_matchFilter = require("./ds_modules/controllers/ds_matchFilter");   
const vars = require("./environment/ds_vars.js");
const ds_dataTree = require("./ds_modules/controllers/ds_dataTree");
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


/** Read a json file
 * 
 * @param {string} file path to file
 */
function readJSONFile(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf-8', (err, data) => { 
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    });
  }


/** Read a json file
 * 
 * @param {string} file path to file
 */
function writeJSONFile() {
    const path = "./dsconfig.json";
    let student = {  
        name: 'Mike',
        age: 23, 
        gender: 'Male',
        department: 'English',
        car: 'Honda' 
    };

    return new Promise((resolve, reject) => {
        let data =  JSON.stringify(student, null, 2);
            fs.writeFile(path, data, (err) => {  
                if (err) reject(err);
                resolve(1);
                // console.log('Data written to file');
        });
    });
  }

/* TEST 1 */
function WriteJSON()
{
    let student = {  
        name: 'Mike',
        age: 23, 
        gender: 'Male',
        department: 'English',
        car: 'Honda' 
    };

    const path = "./dsconfig.json";
    let data =  JSON.stringify(student, null, 2);


    const writedata = async path => {
        try
        {
            const response =  fs.writeFile(path, data, (err) => {  
                if (err) throw err;
                console.log('Data written to file');
                return 1;
            });
            return response;
        }
        catch (error) {
            console.log(error);
          }
    };

    j = writedata(path);
    console.log('This is after the write call');  
    return j;
}

/* TEST 2 */
async function FindConfigFile()
{
    const path = "./dsconfig.json";
    fs.readFile(path, (err, data) => {  
        if (err) throw err;
        let content = JSON.parse(data);
        console.log(content);
    });
}


async function main()
{
/*  Execute in order */
init.DisplayBuildVersion();



var a = await MakeHotsapiRequest();
console.log(a);
// linear -> wait till done


/** TEST PROCESS:
 * 
 *      CREATE INIT TO LOAD DIFFERENT TREES
 * 
 *      TREE_SOURCE_LOAD
 *      1) TRY read storm_config.json
 *           1-1 (SUCCESS) TRY load Tree_file.json (information of the tree)
 *              1-1-1 (SUCCESS) Load the Tree_file.json as DataTree instance
 *              1-1-2 (NOT-FOUND/ERROR) Report error
 *           1-2 (NOT_FOUND) ASK to create tree at DEFAULT location or a path -> create at path
 *              ->save config as json. 
 * 
 *      FILTERING REPLAYS
 * 
 *      1) Create Filter
 *      2) Get Replay queries to HOTSAPI -> maybe we can get complex params like certain characters or builds
 *      3) Verify that replay contains filter´s rules -> APPROVE OR REJECT
 *      4) APPROVED replays will be re-parsed and the data will be locally stored for our analyzing purpuses
 *          ===> BUILD A DATA TREE FILE SYSTEM
 *          ===> Save
 * 
 */


//
if (replay_path)
{
    let check;
    var replayInfo = new vars.StormData(replay_path);
    
   // const ans = await ds_dataTree.askQuestion("Are you sure you want to deploy to PRODUCTION? ");


    //console.log("WE FOUND IT");
    // else
    // console.log("WE DID NOT FIND IT");

    const path = "./dsconfig.json";

    let jsonwrite = writeJSONFile();
    console.log(jsonwrite);
    let json = await readJSONFile(path);
    console.log(json);
    //var n = await WriteJSON();

    // var e = await FindConfigFile();

    var dataTree = await new ds_dataTree.DataTree("aaaa");


    console.log(replayInfo.gameData.matchLenghtLoops);
    console.log(ds_Parser.LoopsToSeconds(replayInfo.gameData.matchLenghtLoops));
    console.log(ds_Parser.LoopsToMinutes(replayInfo.gameData.matchLenghtLoops));

    var filter = new ds_matchFilter.MatchFilter();
    //var filter_e = new filter();
    filter.map = vars.Standard_Map_List.CursedHollow;
    filter.addHero( vars.Hero_List.Butc, vars.DS_LOSS,);
    //filter.setMatchDurationRange_loops(300,30000);

    filter.setMatchDurationRange_mins(10,21); // from 10 to 18 mins
    // console.log(filter.winHeroes);
    // console.log(filter.Heroes);


    //check = ds_Parser.ReplayContainsMap(replayInfo, vars.Standard_Map_List.CursedHollow);
    
    ds_matchFilter.StormDataFulfillsFilter(replayInfo,filter);

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

