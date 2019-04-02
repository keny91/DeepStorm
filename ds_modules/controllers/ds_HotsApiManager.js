/**
 * This document contains scripts to comunicate with external
 * databases such as HotsApi.
 */


/** TO DO 
 * 
 * - Create a file that will keep track of patch dates:
 *    * patch 2.XX.YY - start_date - end_date (patches are a time frame ref)
 *    * patch ...
 * 
 * - Last processed ID (does not guaraante that the data is from the last patch)
 * - 
 * 
 * - Request, get_NewUploadedReplays(lastKnownId)
 * 
 * 
 * REPLAY_IDs only indicate the order of upload (they will be linked to the GAME/REPLAY_UPLOAD_DATE)+
 * GAME_DATE and GAME_PATH should also be related
 * 
 * 
 * Parallel work:
 *  Request_100_replays 
 *    -> filter relevant patch
 *        - if valid ->process (parallel)
 *        - if done, repeat
 *    -> all replays processed?
 *        - repeat (100 more)
 * 
 * 
 * 
 *    -> process them in parallel
 * 
*/


// "players": [
//     {
//       "hero": "Valla",
//       "hero_level": 9,
//       "team": 1,
//       "winner": false,
//       "blizz_id": 118489,
//       "party": 0,
//       "silenced": false,
//       "battletag": "fireseed#2609",
//       "talents": {
//         "1": "DemonHunterCombatStyleHotPursuit",
//         "4": "DemonHunterCreedoftheHunter",
//         "7": "DemonHunterDeathDealer",
//         "10": "DemonHunterHeroicAbilityRainofVengeance",
//         "13": "DemonHunterCombatStyleTemperedByDiscipline",
//         "16": "DemonHunterManticore",
//         "20": "DemonHunterFarflightQuiver"
//       },
//       "score": {
//         "level": 20,
//         "kills": 6,
//         "assists": 3,
//         "takedowns": 9,
//         "deaths": 7,
//         "highest_kill_streak": 6,
//         "hero_damage": 34677,
//         "siege_damage": 75598,
//         "structure_damage": 24027,
//         "minion_damage": 42132,
//         "creep_damage": 8800,
//         "summon_damage": 9439,
//         "time_cc_enemy_heroes": 5,
//         "healing": null,
//         "self_healing": 0,
//         "damage_taken": null,
//         "experience_contribution": 9144,
//         "town_kills": 0,
//         "time_spent_dead": 308,
//         "merc_camp_captures": 0,
//         "watch_tower_captures": 0,
//         "meta_experience": 75026
//       }
//     },


const RequestTypes_HotsApi = {
    Talent : "https://hotsapi.net/api/v1/talents/",
    SOMETHING : "https://hotsapi.net/api/v1/talents/",
    SOMETHING2 : 102,
    SOMETHING3 : 103,
    SOMETHING4 : 104
    // ... more added if needed
  }



 
/* Request test */
async function MakeHotsapiRequestTalent(Data)
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


/* Request test */
async function getReplaysByIndex(min_index, nof_replays)
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
    replays = getData(url);
    ////
/*  Recount that the number of replays is the requested number and maybe less */

// for (let replay in j)
// {
//     let replay_sample = j[replay];
//     let last_replay
//     //console.log(replay_sample.id);
// }
  let last_replay = j.length;

    return [nof_replays, replays];
} 


async function ProcessReplaysByIndex(min_index, nof_replays, filter)
{
  var replays;
  var nof_ret_replays;

// get replays from HotsApi
  [nof_ret_replays, replays] = getReplaysByIndex(min_index, nof_replays);

// do this in parallel?

//    - transform into stormData?

//    - Verify that the filter is fulfilled.



}



exports.MakeHotsapiRequest = parser.MakeHotsapiRequest;
exports.ProcessReplaysByIndex = parser.ProcessReplaysByIndex;