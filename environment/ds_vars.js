
/* Files environtments, depending on what files are required, use different exports */
const Files_env = {};

var Hots_parser_updater = ".\\git-update_hostparser.bat";

Files_env.Hots_parser_updater = Hots_parser_updater;


// enums and other constants
const TeamType = {
    'Blue' : 0,
    'Red' : 1
  };
  


module.exports = Files_env;