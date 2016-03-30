#pragma strict

static var screenWidth : float = 4.8;
static var screenHeight : float = 3.2;

static var score : int = 0;
static var lives : int = 0;
static var coins : int = 0;
static var level : int = 0;
static var colors : Color[] = new Color[8];

static public var player : GameObject;
static var background : GameObject;
static var cam : GameObject;
static var levelManager : GameObject;

public var guiManager : GameObject;
public var soundManager : GameObject;

function Start () {
	colors = AllColors();
	if (guiManager) {
		yield WaitForSeconds(4);
		player = GameObject.Instantiate(Resources.Load("Prefabs/SoundPrefabs/objOrb")) as GameObject;
		yield WaitForSeconds(9);
		CreateLevel(0);
	}
	else {
		CreateLevel(0);
	}
	
}

function Update () {

	CalculateScore();
	
	if (Input.GetKey(KeyCode.Q)) {
		Application.Quit();
	}
	
}

function CreateWeapon (name : String, speed : float) {
	var rand : float = Random.value;
	if (speed > rand) {
		var obj = GameObject.Instantiate(Resources.Load("Prefabs/" + name)) as GameObject;
	}
}

function ResetLevelParam () {
	lives = 3;
}

function CalculateScore () {

}

function CheckMaxGenSpeed (speed : float, maxSpeed : float) {
	if (speed > maxSpeed) {
		speed = maxSpeed;
	}
	return speed;
}

static function CreateCoin (amount : int) {
	for (var i = 0; i < amount; i++) {
		GameObject.Instantiate(Resources.Load("Prefabs/" + "objCoin"));
	}
}

function CreateLevel (level : int) {

	player = GameObject.Instantiate(Resources.Load("Prefabs/SoundPrefabs/objOrb")) as GameObject;
	if (soundManager) {
		soundManager.GetComponent(AudioSource).Play();
	}
}

function GetScreenSize () {
	screenWidth = Screen.width / 200;
	screenHeight = Screen.height / 200;
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
	switch (hex) {
		case "0": return 0;
		case "1": return 1;
		case "2": return 2;
		case "3": return 3;
		case "4": return 4;
		case "5": return 5;
		case "6": return 6;
		case "7": return 7;
		case "8": return 8;
		case "9": return 9;
		case "A": return 10;
		case "B": return 11;
		case "C": return 12;
		case "D": return 13;
		case "E": return 14;
		case "F": return 15;
	}
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



