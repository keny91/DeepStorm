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