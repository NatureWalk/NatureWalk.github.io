//player info
var player = {
	playerLevel: 1,
	playerXP: 0,
	lvlrewards : [true, false, false ,false, false, false, false ,false, false, false, false]
};

var achievements = [
	"Mile High Club", "Animal Pack", "Upgrade Galore", "Novice Explorer",
	"Intermediate Explorer", "Expert Explorer" , "Unlucky Year"
];

var achievText = [
	"Gain 10000 tracks",
	"Spawn 5 of the animal in the same party",
	"Upgrade the base level of a animal 10 times",
	"Get to area 10",
	"Get to area 30",
	"Get to area 70",
	"Lose 10 animals in one session"
];

var rewardText = [
	"+2500 Tracks",
	"+2000 Tracks",
	"+5000 Tracks",
	"+2500 Tracks",
	"+10000 Tracks",
	"+30000 Tracks",
	"+5000 Tracks"
];
//achievement list, prereq is when the pre-req for achievement is done, completed is when the achievement is done implementing
var prereq = [0,0,0,0,0,0,0];
prereq['milehigh'] = false;
prereq['animalpack'] = false;
prereq['upgradegalore'] = false;
prereq['novice'] = false;
prereq['intermediate'] = false;
prereq['expert'] = false;
prereq['unlucky'] = false;

var completed = [0,0,0,0,0,0,0];
completed['milehigh'] = false;
completed['animalpack'] = false;
completed['upgradegalore'] = false;
completed['novice'] = false;
completed['intermediate'] = false;
completed['expert'] = false;
completed['unlucky'] = false;

//tracks the prereqs of the achievments
function achievTracker(){

	var animalcount = [controller.getAnimalCount('frog'), controller.getAnimalCount('bunny'), controller.getAnimalCount('deer'),
	controller.getAnimalCount('bird')];
	
	var animallevel = [controller.getAnimalBaseLevel('frog'), controller.getAnimalBaseLevel('bunny'),controller.getAnimalBaseLevel('deer'),
	controller.getAnimalBaseLevel('bird')];
	
	
	//mile high : when player reaches over 10000 tracks
	//if(dataObj.animalTracks >= 10000) achievements.milehigh[0] = true;
	if(dataObj.animalTracks >= 10000) prereq['milehigh'] = true;
	
	//animalpack: when player makes a 5 party of the same animal
	for(var i = 0 ; i < animalcount.length; i++){
		if(animalcount[i] >= 5) prereq['animalpack'] = true;
	}
	
	//upgradegalore: when player upgrades the same animal's base level 10 times
	for(var j = 0; j < animallevel.length; j++){
		if(animallevel[j] >= 10) prereq['upgradegalore'] = true;
	}
	
	//novice explorer: when player reaches area 10
	if(controller.area_level >= 10) prereq['novice'] = true;
	
	//intermediate explorer: when player reaches area 30
	if(controller.area_level >= 30) prereq['intermediate'] = true;
	
	//expert explorer: when player reaches area 70
	if(controller.area_level >= 70) prereq['expert'] = true;
	
	//unlucky year: player loses a total of 10 or more animals
	if(dataObj.animalsDied >= 10) prereq['unlucky'] = true;
}

//Tracks player Level and player level rewards
/* function playerTracker(){
	player.playerLevel = ((player.playerXP / 100) + 1);
	
	if (player.playerLevel >= 2 && player.lvlrewards[2] == false){
		dataObj.animalTracks += 2500;
		player.lvlrewards[2] = true;
		console.log("Player reached lvl 2! Gained 2500 bonus tracks!");
	}
	
	if(player.playerLevel >= 3 && player.lvlrewards[3] == false){
		dataObj.animalTracks += 5500;
		player.lvlrewards[3] = true;
		console.log("Player reached lvl 3! Gained 3000 bonus tracks!");
	}
	
} */

// implements achievements and updates console for player and acheivement progression
function updateLog(){
	achievTracker();
	//playerTracker();
	//console.log("area is : " + dataObj.animalsDied);
		if(prereq['milehigh'] == true &&  completed['milehigh'] == false){
			completed['milehigh'] = true;
			completed[0] = 1;
			dataObj.animalTracks += 2500;
			console.log("MileHigh achievement Success! Gained 100 xp!");
			console.log("Player total XP is now : " + player.playerXP);
			//console.log("Player Level is now : " + player.playerLevel);
		}
		
		if(prereq['animalpack'] == true &&  completed['animalpack'] == false){
			completed['animalpack'] = true;
			completed[1] = 1;
			dataObj.animalTracks += 2000;
			console.log("AnimalPack achievement Success! Gained 100 xp!");
			console.log("Player total XP is now : " + player.playerXP);
			//console.log("Player Level is now : " + player.playerLevel);
		}
		
		if( prereq['upgradegalore'] == true && completed['upgradegalore'] == false){
			completed['upgradegalore'] = true;
			dataObj.animalTracks += 5000;
			completed[2] = 1;
			console.log("Upgrade Galore achievement Success! Gained 100 xp!");
			console.log("Player total XP is now : " + player.playerXP);
			//console.log("Player Level is now : " + player.playerLevel);
		}
		if( prereq['novice'] == true && completed['novice'] == false){
			completed['novice'] = true;
			completed[3] = 1;
			dataObj.animalTracks += 2500;
			console.log("Novice Explorer achievement Success! Gained 100 xp!");
			console.log("Player total XP is now : " + player.playerXP);
			//console.log("Player Level is now : " + player.playerLevel);
		}
		
		if( prereq['intermediate'] == true && completed['intermediate'] == false){
			completed['intermediate'] = true;
			completed[4] = 1;
			dataObj.animalTracks += 10000;
			console.log("Intermediate Explorer achievement Success! Gained 100 xp!");
			console.log("Player total XP is now : " + player.playerXP);
			//console.log("Player Level is now : " + player.playerLevel);
		}
		
		if( prereq['expert'] == true && completed['expert'] == false){
			completed['expert'] = true;
			completed[5] = 1;
			dataObj.animalTracks += 30000;
			console.log("Expert Explorer achievement Success! Gained 100 xp!");
			console.log("Player total XP is now : " + player.playerXP);
			//console.log("Player Level is now : " + player.playerLevel);
		}
		
		if( prereq['unlucky'] == true && completed['unlucky'] == false){
			completed['unlucky'] = true;
			completed[6] = 1;
			dataObj.animalTracks += 5000;
			console.log("Unlucky Year achievement Success! Gained 100 xp!");
			console.log("Player total XP is now : " + player.playerXP);
			//console.log("Player Level is now : " + player.playerLevel);
		}

}