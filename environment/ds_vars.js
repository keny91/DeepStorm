
/* Files environtments, depending on what files are required, use different exports */
const Files_env = {};
var Game_env ={};

var Hots_parser_updater = ".\\git-update_hostparser.bat";
const attrs = require(".\\..\\hots-parser\\attr.js");
const constants = require(".\\..\\hots-parser\\constants.js");
const parser = require("./../hots-parser/parser.js");


/*  CONST TO NOT BE TOUCHED  */
const TALENT_MIN_TIER = 1;
const TALENT_MAX_TIER = 7;


/*  FUNCTION RETURN MSGS  - MOVE THESE TO ANOTHER DOC*/
const DS_RETURN_OK = 1;
const DS_RETURN_UNKNONW_ERROR = 101;
const DS_RETURN_UNKNONW_NOT_FOUND = 102;


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


function LoopsToSeconds(loops)
{
  return parser.loopsToSeconds(loops);
}


/* */
class Talent {
  constructor()
  {
    this.TalentTier = 0;
    this.TalentName = undefined;
    this.TierChoice = 0;
    this.isActive = 0;

  }

  SetActiveTier(talentName, tierChoice, tier)
  {
    this.TalentTier = tier;
    this.TalentName = talentName;
    this.TierChoice = tierChoice;
    this.isActive = 1;
  }

  isSelected()
  {
    return this.isActive;
  }
}


/* Search and create  a build from the player data:
A tier can only be selected if we are pass that talent tier
*/
class HeroBuild {
  constructor(statData)
    {
      
      
      this.talentTier_1 = new Talent();
      this.talentTier_2 = new Talent();
      this.talentTier_3 = new Talent();
      this.talentTier_4 = new Talent();
      this.talentTier_5 = new Talent();
      this.talentTier_6 = new Talent();
      this.talentTier_7 = new Talent();
      //this.talentTierUnlocked= -1; // checkfunctionFromLVL() <- based on lvl will be messed by Chromie
     // this.teamLVL = statData.stats.;   // 
      this.talentSequence = this.getTalentSequence(statData);
      // PASS TALENTS FROM TEXT TO NUMBERS
    };
  

    /*  This function fill up the talents collecting the tier choice and name. It also creates the build sequence, easy comparable 
    Missing try catch 
    */
  getTalentSequence(statData)
  {
    var tierSequence = "";

    for(let i = TALENT_MIN_TIER; i <= TALENT_MAX_TIER; i++)
    {

      try{
        let temp_tier_str = "Tier"+i+"Talent";
        let stats_tier_ref = "talentTier_"+i;
        let talent_tier_name = "Tier "+i+ " Choice";
        let ref = this;
        ref[stats_tier_ref].SetActiveTier(statData.talents[talent_tier_name], statData.gameStats[temp_tier_str], i)
        // this[stats_tier_ref].TalentTier = statData.gameStats[temp_tier_str];
        // this[stats_tier_ref].TalentName = statData.talents[talent_tier_name];
        tierSequence = tierSequence.concat(ref[stats_tier_ref].TierChoice)

      }

      catch (err)
      {
        console.error("Error during talent parsing: "+err);
        return -1;
      }
      
    }
    // this.stats.talentTier_1 = statData["Tier1Talent"];
    // this.stats.talentTier_2 = statData["Tier2Talent"];
    // this.stats.talentTier_3 = statData["Tier3Talent"];
    // this.stats.talentTier_4 = statData["Tier4Talent"];
    // this.stats.talentTier_5 = statData["Tier5Talent"];
    // this.stats.talentTier_6 = statData["Tier6Talent"];
    // this.stats.talentTier_7 = statData["Tier7Talent"];
    return tierSequence;
  }

}


class XP_Breakdown
{
  constructor(replay_info)
  {

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
      this.stats =playerdata["gameStats"];

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




class GameData 
{
  constructor(replaydata)
  {
    this.firstFortbyWinningTeam = -1;
    this.firstKeepbyWinningTeam = -1;
    this.firstObjectivebyWinningTeam = -1;
    this.firstPickbyWinningTeam = -1;
    this.matchLenghtLoops = -1;
    this.matchStartLoops = -1;
    this.map = "";
    this.mode = -1;
    this.winnerTeamID;
  }

  setGameData (replaydata)
  {
    this.firstFortbyWinningTeam = replaydata.match.firstFortWin;
    this.firstKeepbyWinningTeam = replaydata.match.firstKeepWin;
    this.firstObjectivebyWinningTeam = replaydata.match.firstObjectiveWin;
    this.firstPickbyWinningTeam = replaydata.match.firstPickWin;
    this.matchLenghtLoops = replaydata.match.loopLength;
    this.matchStartLoops = replaydata.match.loopGameStart;
    this.map = replaydata.match.map;
    this.mode = replaydata.match.mode;
    
  }
}


class Team 
{
  constructor(isWinner)
  {
    // declare empty players array
    //this.Players = new playerData();
    this.Players = []; // array declaration
    this.nof_players_processed = 0; 
    this.win = isWinner;
    this.teamLVL =-1;
    this.teamTakeDowns = 0;
    this.teamDeaths = 0;

    /* Add accumulated stats reference */

    /* Team model -> base on endgame stats, each player will be labelled by their contribution to the team*/
    // - number should be contrasted with those players of similar RANK/SKILL on this MAP
    // - number should also be measured by an estimated MAX possible stat reached. (MAYBE NOT) 


    /*  Team labels ->  labels match those ingame. EX) 2 tank + bruiser + range_dmg + healer  */
    // - Based on character -> set role by searching up a database


    /* Team stadistics containing relation to player, or somekind of accumulated value */

  }


  /* Internal function to add a playerData to a specific team */
  Addplayer(player)
  {
    if (player instanceof playerData) 
    {
      // verify that we are putting a win/lose player in the right team
      if(player.win ==! this.win) 
        return null;
      
      
      this.Players.push(player); // push not valid for objects

      this.nof_players_processed ++;
      

    }
    else
    {
      return null;
    }
  }

  setTeamTakeDowns (value)
  {
    if (value < 0)
      console.error("Invalid value input for teamTakeDowns: "+value);
    /* ERRROR HERE */
    else 
      this.teamTakeDowns = value;

  }

  setTeamTakeDeaths (value)
  {
    if (value < 0)
    console.error("Invalid value input for teamTakeDeaths: "+value);
    /* ERRROR HERE */
    else 
      this.teamDeaths = value;

  }
}




/* Object containing the  replaydata, along with our processed information  */
/* Teams, players,  */
class StormData{
    
  constructor(file)
  {
    var options ={};
    /* Read info directly using the hots-parser API */
    this.replayInfo = parser.processReplay(file, options);

    // empty for now, fill teams
    this.winTeam = new Team(true); // win team
    this.loseTeam = new Team(false); // win team
    





    this.gameData = new GameData();

    


    this.patchBuild = this.replayInfo.match.version;

    this.ProcessAllPlayersData();
    this.ProcessReplayData();


  };


  ProcessReplayData()
  {
    this.winnerTeamID = this.replayInfo.match.winner;

    //this.replayInfo.match
        // put this somewhere, not in the constructor
    if(this.winnerTeamID == 0)
    {
      this.winTeam.setTeamTakeDeaths(this.replayInfo.match.team0Takedowns);
      this.winTeam.setTeamTakeDowns(this.replayInfo.match.team1Takedowns);
      this.loseTeam.setTeamTakeDeaths(this.replayInfo.match.team1Takedowns);
      this.loseTeam.setTeamTakeDowns(this.replayInfo.match.team0Takedowns);
    }
    else
    {
      this.winTeam.setTeamTakeDeaths(this.replayInfo.match.team1Takedowns);
      this.winTeam.setTeamTakeDowns(this.replayInfo.match.team0Takedowns);
      this.loseTeam.setTeamTakeDeaths(this.replayInfo.match.team0Takedowns);
      this.loseTeam.setTeamTakeDowns(this.replayInfo.match.team1Takedowns);
    }

    // read all other info regarding game -> isnt this ProcessReplayData();
    this.gameData.setGameData(this.replayInfo); 
  }

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
          this.winTeam.Addplayer(playerdata);
            //this.winPlayers.push(player_id);  
        } 
        else
        {
          this.loseTeam.Addplayer(playerdata);
             //this.losePlayers.push(player_id);  
        }

          
      /* More */

      }

      return 1;
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


/*  CONST TO NOT BE TOUCHED  */
module.exports={
  TALENT_MIN_TIER : 1,
  TALENT_MAX_TIER : 7,
  
  
  /*  FUNCTION RETURN MSGS  - MOVE THESE TO ANOTHER DOC*/
  DS_RETURN_OK : DS_RETURN_OK,
  DS_RETURN_UNKNONW_ERROR : DS_RETURN_UNKNONW_ERROR,
  DS_RETURN_UNKNONW_NOT_FOUND : DS_RETURN_UNKNONW_NOT_FOUND,

  Files_env : Files_env,
  Standard_Map_List : Standard_Map_List,
  Hero_List : attrs.heroAttribute,
  StormData : StormData,
  playerData : playerData,
  game_data : constants
  }


// exports.Files_env = Files_env;
// exports.Standard_Map_List = Standard_Map_List;
// exports.Hero_List = attrs.heroAttribute;
// exports.StormData = StormData;
// exports.playerData = playerData;
// /* Split this into my own labels */
// //exports.game_data = constants.UnitType
// exports.game_data = constants;

