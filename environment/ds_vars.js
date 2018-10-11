
/* Files environtments, depending on what files are required, use different exports */
const Files_env = {};
var Game_env ={};

var Hots_parser_updater = ".\\git-update_hostparser.bat";
const attrs = require(".\\..\\hots-parser\\attr.js");
const constants = require(".\\..\\hots-parser\\constants.js");


Files_env.Hots_parser_updater = Hots_parser_updater;



const Standard_Map_List = {"Cursed Hollow":"Cursed Hollow",
            "Garden Terror":"Garden Terror", 
            "Sky Temple": "Sky Temple",
            "Tomb of the Spider":"Tomb of the Spider",
            "Cursed Mines": "Cursed Mines",
            "Towers of Doom": "Towers of Doom",
            "Braxis Holdaout": "Braxis Holdaout",
            "Warhead Junction": "Warhead Junction",
            "Hanamura Temple": "Hanamura Temple",
            "Volskaya Foundry": "Volskaya Foundry",
            "Infernal Shrines": "Infernal Shrines",
            "Battlefields of Eternity": "Battlefields of Eternity",
            "Alterac Pass": "Alterac Pass"       
          };

const Brawl_Map_List = {};


                                                                                                                                                                              
// enums and other constants
const TeamType = {
    'Blue' : 0,
    'Red' : 1
  };
  



//module.exports = Files_env;
exports.Files_env = Files_env;
exports.Standard_Map_List = Standard_Map_List;
exports.Hero_List = attrs.heroAttribute;

/* Split this into my own labels */
//exports.game_data = constants.UnitType
exports.game_data = constants;

