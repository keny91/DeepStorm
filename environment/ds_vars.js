
/* Files environtments, depending on what files are required, use different exports */
const Files_env = {};
var Game_env ={};

var Hots_parser_updater = ".\\git-update_hostparser.bat";

Files_env.Hots_parser_updater = Hots_parser_updater;



const Maps = {"Cursed Hollow":"Cursed Hollow",
               "Garden Terror":"Garden Terror", 
               "Sky Temple": "Sky Temple"};

 Game_env.Maps = Maps;                                                                                                                                                                                  
// enums and other constants
const TeamType = {
    'Blue' : 0,
    'Red' : 1
  };
  



//module.exports = Files_env;
exports.Files_env = Files_env;
//module.exports = Maps;
