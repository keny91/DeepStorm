/** 
 * Document contains instances and processes to read/write and interpret team models.
 */

// Reference to load role standard by map

const ds_msg = require("./../../environment/ds_messages");




/* 
Should each hero have a power distribution - 30point waveclear - 20p peeler - 30 selfsustain - ...
or best role for hero model...
*/
var Roles = [
{
    id:1,
    name: "heroCarry",
    stats: new RoleStandard()
    
},
{
    id:2,
    name: "healer",
    stats: new RoleStandard()
}
]


/**** Concepts to take into account when classifiying roles ****
 * 
 *  Kills
 *  CriticalKills -> during objective|late game
 *  CriticalDeaths ->
 *  SoloDeath -> in late game; different from last man standing in a TF (20 secs time range?)
 *  Soak till Midgame ->
 *  Soak late game ->
 *  Siege DMG
 *  Minion DMG
 *  Self-Heal
 *  Heal -> also be labelled as healer or support?
 *  
 * 
*/


/****   Combined team stats -> my measuring the difference between teams, might help determine the winner
 * 
 *  
 * 
 * 
 */


/**     Process description:
 * 
 * 1) Gather data based on the HERO for this map
 *      1.1) Expected role -> based on stadistical studies and 
 *      1.2)
 * 2) Team model vs Team model -> get winChance % (favored)
 * 3) Report expected role(numbers) against actual role (based on final numbers)
 * 
 * 4) EXTRA - Pin point causes of victory (powerplays, win difavored tf, weird deviation on stats)
 * 
 */


class RoleStandard
{
    constructor()
    {
        this.role_name;
        this.role_identifier;
        this.measuredPlayerStats; 
    
    }


}


/**  Based on end-game stats, determine if the role that the player played during the match -> disregard any stats apart from 
 * Max_X_team, Max_X_all, mean_X_pmin, ... 
 * No direct comparisons player vs player 
 */
function DetermineRole_RAW ()
{


}

/**
 * 
 * @param {*} mapSaveAFile  - Load previously calculated standards for the map.
 */
function LoadMapStandards (mapSaveAFile)
{
    // TO BE DONE
    return msg.DS_RETURN_OK;
}


function SaveMapStandards ()
{
    // if physical files exist -> Update

}


function UpdateMapStandards ()
{
    // if physical files exist

}