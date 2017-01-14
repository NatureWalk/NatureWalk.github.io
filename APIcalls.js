var fitbitAccessToken;
var userName;
var userID;
var stepCount;

authorize();
getUserInfo();
getNewSteps();
console.log(userID);

function reload(){
	getNewSteps();
}

function displaySteps(){
	document.getElementById("steps").innerHTML = "You have logged " + stepCount + " steps";
}

function displayWelcome(){
	document.getElementById("user").innerHTML = "Welcome to Nature Walk, " + userName;
}

function logout(){
    window.location.replace('https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=2287VH&redirect_uri=http%3A%2F%2FNatureWalk.github.io&prompt=login&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight');
}


function authorize(){
if (!window.location.hash) {
console.log("redirecting");
    	window.location.replace('https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=2287VH&redirect_uri=http%3A%2F%2FNatureWalk.github.io&scope=activity%20nutrition%20heartrate%20location%20nutrition%20profile%20settings%20sleep%20social%20weight');
	} else {
    	var fragmentQueryParameters = {};
    	window.location.hash.slice(1).replace(
        	new RegExp("([^?=&]+)(=([^&]*))?", "g"),
        	function($0, $1, $2, $3) { fragmentQueryParameters[$1] = $3; }
    	);
    fitbitAccessToken = fragmentQueryParameters.access_token;
	}
}
	
	

 function getUserInfo(){ 
  $.ajax({
  type: 'GET',
  url: 'https://api.fitbit.com/1/user/-/profile.json',
  headers: {
        'Authorization':'Bearer ' +  fitbitAccessToken,
        'Content-Type':'application/json'
  },
  async: false,
  
  beforeSend: function (xhr) {
    if (xhr && xhr.overrideMimeType) {
      xhr.overrideMimeType('application/json;charset=utf-8');
    }
  },
  dataType: 'json',
  success: function (data) {
  			var arr = JSON.stringify(data);
      		var text = arr;
      		var obj = JSON.parse(text);
      		userName = obj.user.displayName;
      		userID = obj.user.encodedId;
      		displayWelcome();
  }
});
}

 function getNewSteps(){ 
  $.ajax({
  type: 'GET',
  url: 'https://api.fitbit.com/1/user/-/activities.json',
  headers: {
        'Authorization':'Bearer ' +  fitbitAccessToken,
        'Content-Type':'application/json'
  },
  async: false,
  
  beforeSend: function (xhr) {
    if (xhr && xhr.overrideMimeType) {
      xhr.overrideMimeType('application/json;charset=utf-8');
    }
  },
  dataType: 'json',
  success: function (data) {
  //console.log("success" + data);
  			var arr = JSON.stringify(data);
      		var text = arr;
      		var obj = JSON.parse(text);
      		//console.log(arr);
      		stepCount = obj.lifetime.total.steps;
      		displaySteps();
  }
});
}