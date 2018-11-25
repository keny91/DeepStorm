const fs = require('fs');

function dsLog(message)
{

}


function dsWarning(message)
{

}

function dsError(message)
{

}




/*  Exports  */

dsLogs.dsLog = dsLog;
dsLogs.dsWarning = dsWarning;
dsLogs.dsError = dsError;

module.exports = dsLogs;