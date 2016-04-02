#pragma strict

// buttons
var minimalStyle = GUIStyle.none;
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
	cam.GetComponent(scrMainCamera).lightMode = 1;
	yield WaitForSeconds(1);
	Application.LoadLevel("ChooseLevel");
}

function QuitPressed () {
	cam.GetComponent(scrMainCamera).lightMode = 1;
	yield WaitForSeconds(1);
	Application.Quit();
}

function OnGUI () {
	var buttonSize : Vector2 = Vector2(Screen.width/5, Screen.width/15);
	
	if (GUI.Button (Rect (Screen.width/2 - buttonSize.x/2, Screen.height*(0.65 + modHeight) - buttonSize.y/2 , buttonSize.x, buttonSize.y), "Start", minimalStyle)) {
		PlayPressed();
		flyingButtons = true;
	}
	/*
	if (GUI.Button (Rect (Screen.width/2 - buttonSize.x/2, Screen.height*(0.85 + modHeight) - buttonSize.y/2 , buttonSize.x, buttonSize.y), "Quit", minimalStyle)) {
		QuitPressed();
		flyingButtons = true;
	}
	*/
}
