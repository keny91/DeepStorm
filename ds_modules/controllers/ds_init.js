
//const Files_env = require("")
const fs = require('fs');

class Instance {
    constructor(){
        this.id = "null_id"
    }

    set name(name) 
    {
        this._name = name.charAt(0).toUpperCase() + name.slice(1);
    }

    get name() 
    {
        return this._name;
    }

    sayHello()
    {
        console.log("Hello, my " + this.name + ".")
    }

    CheckHostReplayParser(){
        console.log("Checking for required libraries.", )
        if (fs.existsSync(".\\git-update_hostparser.bat")) {
            // Do something
            console.log("Detected \"\\hots-parser\\\" folder ...", )
        }
        else
        {
            console.log("Folder \"\\hots-parser\\\" could not be found in the root. Deepstorm will try to gather the files...", )
        
        }
    }
}







// dsLogs.dsLog = dsLog;
// dsLogs.dsWarning = dsWarning;
// dsLogs.dsError = dsError;

// module.exports = dsLogs;

exports.Instance = Instance;
//exports.CheckHostReplayParser = CheckHostReplayParser;