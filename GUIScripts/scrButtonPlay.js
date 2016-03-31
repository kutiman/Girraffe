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
	Application.LoadLevel("Level");
}

function QuitPressed () {
	cam.GetComponent(scrMainCamera).lightMode = 1;
	yield WaitForSeconds(1);
	Application.Quit();
}

function OnGUI () {
	var btnW = 200.0;
	var btnH = 70.0;
	
	
	if (GUI.Button (Rect (Screen.width/2 - btnW/2, Screen.height*(0.65 + modHeight) - btnH/2 , btnW, btnH), "Start", minimalStyle)) {
		PlayPressed();
		flyingButtons = true;
	}
	if (GUI.Button (Rect (Screen.width/2 - btnW/2, Screen.height*(0.80 + modHeight) - btnH/2, btnW, btnH), "Quit", minimalStyle)) {
		QuitPressed();
		flyingButtons = true;
	}
}
