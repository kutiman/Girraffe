#pragma strict

// buttons
var minimalStyle = GUIStyle.none;
var labelStyle : GUIStyle;
var modHeight = 0.0;
var flyingButtons = false;

var cam : GameObject;

function Start () {

	cam = GameObject.FindWithTag("MainCamera") as GameObject;
}

function Update () {
	if (flyingButtons) {
		modHeight += 1 * Time.deltaTime;
	}
}

function PlayPressed () {
	
}

function QuitPressed () {
	Application.Quit();
}

function OnGUI () {
	var buttonSize : Vector2 = Vector2(Screen.width/5, Screen.width/15);
	
	if (GUI.Button (Rect (Screen.width/2 - buttonSize.x/2, Screen.height*(0.5 + modHeight) - buttonSize.y/2 , buttonSize.x, buttonSize.y), "Start", minimalStyle)) {
		
		// sending alert to fader to move a scene
		GameObject.FindWithTag("tagFader").GetComponent(scrFader).levelToLoad = "ChooseLevel";
		GameObject.FindWithTag("tagFader").GetComponent(scrFader).sceneEnding = true;
		
		flyingButtons = true;
	}
	
	var introLabel : String = (
		"A small experiment with sound. \n" + 
		"The objects are created by the velocity of each frequency band. \n" +
		"Try to catch them. Move with the arrow keys.");
	GUI.Label(Rect(Screen.width * 0.1, Screen.height * 0.66, Screen.width * 0.8, Screen.height * 0.2), introLabel, labelStyle);
	
	/*
	if (GUI.Button (Rect (Screen.width/2 - buttonSize.x/2, Screen.height*(0.85 + modHeight) - buttonSize.y/2 , buttonSize.x, buttonSize.y), "Quit", minimalStyle)) {
		QuitPressed();
		flyingButtons = true;
	}
	*/
}
