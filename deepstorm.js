/* Entry point for DeepStorm  */


/** To do:
 * 
 * - Math.js -> calculate desviatio on, mean, meadian, k-means, clusters,
 * - Visual...js -> display visual clutter (alternatively get results based on ID, or the biggest desviation, or
 *  or number of cases that pass a deviation th,...) 
 * - Adquire/get winrates: talents, map, hero cross-correlation
 * - Generate model for hero: talents, map (team independent and enemy independent)
 * 
 * - Character models with DB_SCAN or k-means clusters (define the number of clusters or not)
 *  (How many dimensions: Heal, dmg, self-heal, stun-time, silence... (as cc), soak, mercs)
 * 
 * 
 * - Generate team model: from RAW role models after belonging . 
 * 
 */



/*
{
"version":"0.0.1",
"nof_projects":2,
"last_opened":0,
"projects":[ 
    {
        "id":0,
        "rootFolder": "absolute_local_path",
        "projectName":"test1",
        "dataTreeType": 100
    },
    {
        "id":1,
        "rootFolder": "absolute_local_path2",
        "projectName":"test2",
        "dataTreeType": 101
    } ]
}
*/



//const ls = require('os');
const init = require("./ds_modules/controllers/ds_init");
const ds_Parser = require("./ds_modules/controllers/ds_parser");  // can take out of here
const ds_matchFilter = require("./ds_modules/controllers/ds_matchFilter");   
const vars = require("./environment/ds_vars.js");
const ds_dataTree = require("./ds_modules/controllers/ds_dataTree");
const ds_files = require("./ds_modules/controllers/ds_files");
const ds_init = require("./ds_modules/controllers/ds_init");
const ds_msg = require("./environment/ds_messages");
var csv = require("fast-csv");
const fetch = require('node-fetch');

const CONFIG_FILE_DEFAULT_PATH = "./dsconfig.json";




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


/** TEST PROCESS:
 * 
 *      CREATE INIT TO LOAD DIFFERENT TREES
 * 
 *      TREE_SOURCE_LOAD
 *      1) TRY read storm_config.json
 *           1-1 (SUCCESS) TRY load Tree_file.json (information of the tree -> root of the tree is indicated by dsconfig)
 *              1-1-1 (SUCCESS) Load the Tree_file.json as DataTree instance
 *              1-1-2 (NOT-FOUND/ERROR) Report error
 *           1-2 (NOT_FOUND) ASK to create tree at DEFAULT location or a path -> create at path
 *              ->save config as json. 
 * 
 *      2) CREATE A NEW TREE PROJECT
 *           2-1 (NAME & ROOT & TREETYPE) -> Create the folders and files at the specified root, FOLDER vary depending on TREETYPE
 *           2-2 (SUCCESS) Update dsconfig.json
 *           2-3 
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

/*  Execute in order */

/* Start here    */
init.DisplayBuildVersion();

var modified_config = 0;



var a = await MakeHotsapiRequest();
console.log(a);
// linear -> wait till done




//
if (replay_path)
{
    let check;
    var global_replay_path = ds_files.convertToGlobalPath(replay_path);
    var replayInfo = new vars.StormData(global_replay_path);
    
   // const ans = await ds_dataTree.askQuestion("Are you sure you want to deploy to PRODUCTION? ");



    //let jsonwrite = ds_files.writeJSONFile(path, student);
    //console.log(jsonwrite);

    var global_congig_path = ds_files.convertToGlobalPath(CONFIG_FILE_DEFAULT_PATH);

    // Try read from json file in the root file, if not found create a default config
    var dsconfigfile = await ds_init.ReadConfigFromJSON(global_congig_path);

    if (dsconfigfile == ds_msg.DS_RETURN_UNKNONW_ERROR )
    {
        console.error("Exception found, exiting")
        return;
    }

    // check to verify that settings were properly logged.
    console.log(dsconfigfile);


    // Test project creation
    // await dsconfigfile.CreateProject("Test", "./projectTrees/test",ds_init.TreeTypes.Default );
    // await dsconfigfile.CreateProject("Test2", "./projectTrees/test2",ds_init.TreeTypes.Default );



    console.log(replayInfo.gameData.matchLenghtLoops);
    console.log(ds_Parser.LoopsToSeconds(replayInfo.gameData.matchLenghtLoops));
    console.log(ds_Parser.LoopsToMinutes(replayInfo.gameData.matchLenghtLoops));

    var filter = new ds_matchFilter.MatchFilter();

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

    dsconfigfile.saveConfigFileAsJson();

}
   

console.log("END");
}


main();
// getToken(main());

