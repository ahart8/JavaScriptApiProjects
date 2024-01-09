/*
This is an example tool for deleting prospects one at a time. It has very few optomizations and runs much worse than it could.
The goals was to get something out and ready to be used as fast as possible. This can be adapted for many other means.
*/


/*
Library for communicating with API.
There are many other options, and for more complicated projects I use xhr2, but this works GREAT for quick get things done
https://axios-http.com/docs/intro
*/
const axios = require('axios'); 



const dbid = 'lcs-itg12'; //Company code to make this more reusable.

/*
I am just grabbing the token from the test client dbid.api.rentmanager.com
You would write auth and stuff normaly, but for quick API needs it saves me a few minutes of annoyance.
*/
const token = 'cb39UhOOeoI5Cm26iQSezS_nYI-z7BJ5eLH_gtRnFVm2D6_dttxmZ0NM4da65UdJ_ll5SF9Couqk4lHYfOsCAxh9LHtZzmcpKsS1LET3JAU='; 

const prospectIds = [1,2,3,4,5]; //Replace with an array of prospectIds. Once again we could pull data from RM, but this saves us time

/*

This is the actual main function that runs through each id and attempts to delete it.
Its declared with the async tag because it is using async/await. https://javascript.info/async-await
Promises and all of that is a very complicated topic and using async/await solves many of the issues faster than writing more optimized code.

*/
async function main(){

    //If you want to add any code to execute before the loop it goes here

    for (n in prospectIds){

        /*
        Makes the url for the current prospect. I would normally not even hardcode the endpoint, but that can be an optimization for later
        */

        let url = `https://${dbid}.api.rentmanager.com/Prospects?ids=${prospectIds[n]}`; 
    
        //Settings to tell axios what to do when communicating with the RM API. Many more options exist, we are not touching them

        let axiosOptions = {
            method:'DELETE',
            url:url,
            headers:{
                'Content-type':'application/json',
                'X-RM12Api-ApiToken':token
            }
        };
    
        //With JS we use try catch to try errors. If the try block fails then the catch triggers.
        //Normally we would do more with error handling.
        //For now we try to delete and if it doesn't we log out which did not. Then go on.
    
        try{
    
            let res = await axios(axiosOptions); //We try and dont do anything special if it works
    
        }catch{
    
            console.log(`${prospectIds[n]} failed to be deleted`); //Just log to the console that something failed. We could wrie to a file instead but this is faster
    
        };
    
        await tock(300); //Delay for .3 seconds before doing it all again
    
    
    };

    console.log('Finished');

    return

}

//Just stole this from another project to introduce artificial delay so we don't run afould of API limits
//Dont worry too much about the code, its complicated for a reason
async function tock(ms = 1000){
    return new Promise(function(resolve, reject){
    setTimeout(function(){
        resolve("tick");
    },ms);
    });
};


//Uncomment below when ready to actually run. This is a just incase I mistype and run before I want to

//main();