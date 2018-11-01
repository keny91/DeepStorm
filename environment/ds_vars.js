
/* Files environtments, depending on what files are required, use different exports */
const Files_env = {};
var Game_env ={};

var Hots_parser_updater = ".\\git-update_hostparser.bat";
const attrs = require(".\\..\\hots-parser\\attr.js");
const constants = require(".\\..\\hots-parser\\constants.js");
const parser = require("./../hots-parser/parser.js");
// add parser?


Files_env.Hots_parser_updater = Hots_parser_updater;


const WIN = 1;
const LOSS = 0;

const Standard_Map_List = constants.MapType;

const Brawl_Map_List = {};

/* Search and create  a build from the player data*/
var HeroBuild =  class build {
  constructor(playerId, replay_info)
    {
      if(replay_info instanceof vars.infoObject)
        return null;
      
      this.talentSequence = new talentSequence(replayInfo);
      this.talentTierUnlocked= -1; // checkfunctionFromLVL()
      this.teamLVL = -1;   // 
      
    };

  function CalculateTalentTier()
  {

    
  }
}


/* Create a playerData from the dataObject given the Id */
var playerData = class playerData
{
  constructor(playerId, replay_info)
    {
      if(replay_info instanceof vars.infoObject)
        return null;
      
      this.options ={};
      this.build = new HeroBuild();
      
    };

}


/* Object containing the  replaydata, along with our processed information  */
/* Teams, players,  */
class infoObject{
    
  constructor(file)
  {
    this.options ={};
    this.replayInfo = parser.processReplay(file, options);
    this.winPlayers = {};  // empty for now, fill teams
    this.losePlayers = {};
    
  };
}

/*  Test    */
//const parser_exp = require("./hots-parser/parser.js");

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
exports.infoObject = infoObject;

/* Split this into my own labels */
//exports.game_data = constants.UnitType
exports.game_data = constants;

