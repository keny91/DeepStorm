/**
 * Document containing generic data for DS common processes.
 * This includes game data.
 */

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


/* MMR  - currently Hotslogs based*/
const LeagueMMR
{
  BronceLeague:500;
  SilverLeague:1000;
  GoldLeague:1500;
  PlatinumLeague:2000;
  DiamondLeages:2500;
  MasterLeague:4000;
}



Files_env.Hots_parser_updater = Hots_parser_updater;

const BUILD_ANY =  999; // unlikely/impossible build

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


/**
 * Talents have a reference to the tier, name and numerated choice.
 * ...Maybe we will add more data to these...
 */
class Talent {
  constructor()
  {
    this.TalentTier = 0;
    this.TalentName = undefined;
    this.TierChoice = 0;
    this.isActive = 0;

  }

  /** Set the talent in a tier 
   * 
   * @param {*} talentName Name of the talent, like ingame.
   * @param {*} tierChoice Numerated choice in the tier.
   * @param {*} tier Tier that the talent  belongs to.
   */
  SetActiveTier(talentName, tierChoice, tier)
  {
    this.TalentTier = tier;
    this.TalentName = talentName;
    this.TierChoice = tierChoice;
    this.isActive = 1;
  }

  /**
   * return if the talent has been picked.
   */
  Active()
  {
    return this.isActive;
  }
}


/** Search and create  a build from the player data:
 *  A tier can only be selected if we are pass that talent tier
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
      this.talentSequence = this.getTalentSequence(statData);
      // PASS TALENTS FROM TEXT TO NUMBERS
    };
  


  /** This function fill up the talents collecting the tier choice and name. It also creates the build sequence, easy comparable 
   * 
   * @param {*} statData Player data struct
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

    return tierSequence;
  }

}

/**
 * Unimplemented ...
 */
class XP_Breakdown
{
  constructor(replay_info)
  {

  }

}





/**
 * playerData from the dataObject given the Id
 */
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



/**     */
/** Given a player_id from this match, try to load and process information into the structure
 * 
 * @param {*} replay_info Strormdata instance
 * @param {*} player_index_ingame player unique identifier
 */
function ReadPlayerData (replay_info, player_index_ingame)
{
    if (replay_info instanceof StormData) 
    {
      /// Unfinished
      return new playerData(replay_info, player_index_ingame);

    }
    return {NULL};
}



/**
 * Create a gameData instance from the parsed (hots-parser) data from a replay.
 */
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

  /** Set the data based on a 'hots-parser' replay data
   * 
   * @param {*} replaydata the 'hots-parser' replay data.
   */
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

/**
 * Team class contains information regarding all (5) players and combined stats.
 */
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


  /** Internal function to add a playerData to a specific team
   * 
   * @param {*} player playerData object instance, it will be allocated in the winning 
   * or losing team accordingly. 
   */
  Addplayer(player)
  {
    if (player instanceof playerData) 
    {
      // verify that we are putting a win/lose player in the right team
      if(player.win != this.win) 
        return null;
      
      
      this.Players.push(player); // push not valid for objects

      this.nof_players_processed ++;
    }
    else
    {
      return null;
    }
  }

  /** Set the amount of enemy takedowns a team achieved.
   * 
   * @param {*} value Number of takedons 
   */
  setTeamTakeDowns (value)
  {
    if (value < 0)
      console.error("Invalid value input for teamTakeDowns: "+value);
    /* ERRROR HERE */
    else 
      this.teamTakeDowns = value;

  }

  /** Set the amount of player deaths as team.
   * 
   * @param {*} value Number of deaths 
   */
  setTeamTakeDeaths (value)
  {
    if (value < 0)
    console.error("Invalid value input for teamTakeDeaths: "+value);
    /* ERRRR HERE */
    else 
      this.teamDeaths = value;

  }
}





/**
 * Object containing the  replaydata, along with our processed information: Teams, players,
 */
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


  /**
   *  Process that should happen during the constructor
   */
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


/**
 * Currently not used/implemented
 */
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

  DS_WIN : WIN,
  DS_LOSS : LOSS,
  DS_BUILD_ANY : BUILD_ANY,

  LoopsToSeconds : LoopsToSeconds,

  LeagueMMR : LeagueMMR,
  Files_env : Files_env,
  Standard_Map_List : Standard_Map_List,
  Hero_List : attrs.heroAttribute,
  StormData : StormData,
  playerData : playerData,
  game_data : constants
  }



