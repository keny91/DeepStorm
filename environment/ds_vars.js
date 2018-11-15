
/* Files environtments, depending on what files are required, use different exports */
const Files_env = {};
var Game_env ={};

var Hots_parser_updater = ".\\git-update_hostparser.bat";
const attrs = require(".\\..\\hots-parser\\attr.js");
const constants = require(".\\..\\hots-parser\\constants.js");
const parser = require("./../hots-parser/parser.js");



Files_env.Hots_parser_updater = Hots_parser_updater;


const WIN = 1;
const LOSS = 0;

const Standard_Map_List = constants.MapType;

const Brawl_Map_List = {};



function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}


/* Search and create  a build from the player data*/
class HeroBuild {
  constructor(playerdata)
    {
      
      this.talentSequence = this.getTalentSequence(playerdata);
      //this.talentTierUnlocked= -1; // checkfunctionFromLVL() <- based on lvl will be messed by Chromie
      this.teamLVL = -1;   // 
      // PASS TALENTS FROM TEXT TO NUMBERS
    };
  
  getTalentSequence(playerdata)
  {

    let a =playerdata["hero"];
    let b =playerdata["build"];
    let talents = playerdata["talents"];
    talents
    return this.lastTalentTier;
  }

}







/* Create a playerData from the dataObject given the Id */
class playerData
{
  constructor(replay_info, playerId )
    {
    
      let players_list = replay_info.replayInfo.players;
      let playerdata =  players_list[playerId];  // localized the data for that player

      // Now put data to use
      // PASS TALENTS FROM TEXT TO NUMBERS
      this.playerName = playerdata["name"];
      this.win = playerdata["win"];

      this.build = new HeroBuild(playerdata);
      
    };

}



/*  Given a player_id from this match, try to load and process information into the structure   */
function ReadPlayerData (replay_info, player_index_ingame)
{
    if (replay_info instanceof StormData) 
    {
    /// Unfinished

        return new playerData(replay_info, player_index_ingame);

    }
    return {NULL};
}



/* Object containing the  replaydata, along with our processed information  */
/* Teams, players,  */
class StormData{
    
  constructor(file)
  {
    var options ={};
    this.replayInfo = parser.processReplay(file, options);


    this.winPlayers = [];  // empty for now, fill teams
    this.losePlayers = [];

    this.ProcessAllPlayersData();
    
  };

  /* After this function runs, we will have all the data we need in our structure. We won´t need HotsParser anymore */
  ProcessAllPlayersData()
  {
      let players_list = this.replayInfo.players;
      let player_ids = this.replayInfo.match.playerIDs;

      // Check all players taking part in the match
      for (let player in player_ids)
      {

        let player_id = player_ids[player];
        //let player_data = players_list[player_id];

        let playerdata = ReadPlayerData (this, player_id);

        // Add playerIndex to winning or losing team list
        if(playerdata["win"] == true)
        {
            this.winPlayers.push(player_id);  
        } 
        else
        {
             this.losePlayers.push(player_id);  
        }

          
      /* More */

      }

      return players;
  }
}



class headerObject
{
    constructor(file)
    {
      var options ={};
      this.replayHeader = parser.getHeader(file);
    };

}

//module.exports = Files_env;
exports.Files_env = Files_env;
exports.Standard_Map_List = Standard_Map_List;
exports.Hero_List = attrs.heroAttribute;
exports.StormData = StormData;
exports.playerData = playerData;
/* Split this into my own labels */
//exports.game_data = constants.UnitType
exports.game_data = constants;

