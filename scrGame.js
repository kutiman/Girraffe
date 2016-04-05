#pragma strict


static var screenWidth : float = 4.8;
static var screenHeight : float = 3.2;
static var tutorialPassed : boolean = false;

static var level : int = 0;
static var colors : Color[] = new Color[8];
public var songsList : AudioClip[];
static var flakesCount : int[] = new int[4];

static public var player : GameObject;
public var soundManager : GameObject;
public var cam : GameObject;
public var gameOverMenu : GameObject;
static var levelStage : int = 1;

var gamePaused = false;

function Start () {
	if (Application.loadedLevelName == "Level") {
		flakesCount = [0,0,0,0];
		colors = AllColors();
		if (levelStage == 0) {
			yield WaitForSeconds(4);
			player = GameObject.Instantiate(Resources.Load("Prefabs/SoundPrefabs/objOrb")) as GameObject;
			yield WaitForSeconds(9);
			CreateLevel(level);
		}
		else {
			player = GameObject.Instantiate(Resources.Load("Prefabs/SoundPrefabs/objOrb")) as GameObject;
			CreateLevel(level);
		}
	}
}

function Update () {
	if (Application.loadedLevelName == "Level") {
		if (levelStage == 1 && !soundManager.GetComponent(AudioSource).isPlaying && !gamePaused) {
			GameObject.Instantiate(gameOverMenu, Vector3.zero, Quaternion.identity);
			levelStage = 2;
		}
	}
	
	if (Input.GetKey(KeyCode.Q)) {
		Application.Quit();
	}
}

public function CreateLevel (level : int) {
	if (Application.loadedLevelName == "Level") {
		// level parameters which will help check if the music is over (time started, length of audio clip)
		if (!player) {player = GameObject.Instantiate(Resources.Load("Prefabs/SoundPrefabs/objOrb")) as GameObject;}
		if (soundManager) {
			Debug.Log(songsList.Length);
			soundManager.GetComponent(AudioSource).clip = songsList[level];
			soundManager.GetComponent(AudioSource).Play();
		}
		levelStage = 1;
	}
}

public function Restart() {
	if (Application.loadedLevelName == "Level") {
		Destroy(player);
		flakesCount = [0,0,0,0];
		CreateLevel(level);
		player = GameObject.Instantiate(Resources.Load("Prefabs/SoundPrefabs/objOrb")) as GameObject;
	}
}

public function ChooseLevel() {

	GameObject.FindWithTag("tagFader").GetComponent(scrFader).levelToLoad = "ChooseLevel";
	GameObject.FindWithTag("tagFader").GetComponent(scrFader).sceneEnding = true;
	
	levelStage = 1;
	Destroy(player);
	flakesCount = [0,0,0,0];
}

function AllColors () {
	var list : String[] = new String[8];
	var colorList : Color[] = new Color[list.length];
	list = 
	[
		"0B080F", // black
		"FFFFFF", // white
		"FD0100", // red
		"FEE300", // yellow
		"00B9FC", // blue
		"F33389", // purple
		"8EDC0C", // green
		"F69010" // orange
	];
	
	for (var i = 0; i < list.length; i++) {
		colorList[i] = HexToRGB(list[i]);
	}
	return colorList;
}

function HexToInt (hexChar : char) {
	var hex : String = "" + hexChar;
	var tempInt : int;
	switch (hex) { 
		case "0": tempInt = 0; break;
		case "1": tempInt = 1; break;
		case "2": tempInt = 2; break;
		case "3": tempInt = 3; break;
		case "4": tempInt = 4; break;
		case "5": tempInt = 5; break;
		case "6": tempInt = 6; break;
		case "7": tempInt = 7; break;
		case "8": tempInt = 8; break;
		case "9": tempInt = 9; break;
		case "A": tempInt = 10; break;
		case "B": tempInt = 11; break;
		case "C": tempInt = 12; break;
		case "D": tempInt = 13; break;
		case "E": tempInt = 14; break;
		case "F": tempInt = 15; break;
		default: tempInt = 0; break;
	}
	return tempInt;
};

function HexToRGB (color : String) {
	var red = (HexToInt(color[1]) + HexToInt(color[0]) * 16.000) / 255;
	var green = (HexToInt(color[3]) + HexToInt(color[2]) * 16.000) / 255;
	var blue = (HexToInt(color[5]) + HexToInt(color[4]) * 16.000) / 255;
	var finalColor = new Color();
	finalColor.r = red;
	finalColor.g = green;
	finalColor.b = blue;
	finalColor.a = 1;
	return finalColor;
};

function OnApplicationFocus(focusStatus: boolean) {
	gamePaused = !focusStatus;
}


