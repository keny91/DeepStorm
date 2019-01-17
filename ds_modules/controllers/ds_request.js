/**
 * This document contains scripts to comunicate with external
 * databases such as HotsApi.
 */




const RequestTypes_HotsApi = {
    Talent : "https://hotsapi.net/api/v1/talents/",
    SOMETHING : "https://hotsapi.net/api/v1/talents/",
    SOMETHING2 : 102,
    SOMETHING3 : 103,
    SOMETHING4 : 104
    // ... more added if needed
  }



 
/* Request test */
async function MakeHotsapiRequestTalent(Data)
{
    const url = 'https://hotsapi.net/api/v1/talents/KaelthasFlamestrikeConvection';
    const getData = async url => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        //console.log(json);
        return json;
      } catch (error) {
        console.log(error);
      }
    };
    j = getData(url);
    ////
    return j;
} 


/* Request test */
async function MakeHotsapiRequest(requestType, Data)
{
    const url = 'https://hotsapi.net/api/v1/talents/KaelthasFlamestrikeConvection';
    const getData = async url => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        //console.log(json);
        return json;
      } catch (error) {
        console.log(error);
      }
    };
    j = getData(url);
    ////
    return j;
} 

exports.MakeHotsapiRequest = parser.MakeHotsapiRequest;