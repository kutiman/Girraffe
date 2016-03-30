#pragma strict

// button state images 
public var spriteArray = new Array();
var rectColor = Color.white;
var minimalStyle = GUIStyle.none;
private var pressed : boolean = false;

// buttons
var modHeight = 0.0;
var flyingButtons = false;
/////////////////////////////////////

var cam : GameObject;


function Start () {
	//spriteArray = GetSpriteList("Sprites/sprButtons"); // animated button version

	
	cam = GameObject.FindWithTag("MainCamera") as GameObject;
}

function PlayPressed () {
	//GameObject.FindWithTag("GameController").GetComponent(scrGame).CreateLevel(scrGame.level);

	cam.GetComponent(scrMainCamera).lightMode = 1;
	yield WaitForSeconds(1);
	Application.LoadLevel("Level");
}

function QuitPressed () {
	//GameObject.FindWithTag("GameController").GetComponent(scrGame).CreateLevel(scrGame.level);

	cam.GetComponent(scrMainCamera).lightMode = 1;
	yield WaitForSeconds(1);
	Application.Quit();
}

function OnMouseDown () {
	pressed = true;
}
/*
function OnMouseOver () {
	if (pressed) {
		gameObject.GetComponent(SpriteRenderer).sprite = spriteArray[2];
	}
	else {
		gameObject.GetComponent(SpriteRenderer).sprite = spriteArray[1];
	}
}
*/

function OnMouseUp () {
	pressed = false;
}

function OnMouseExit () {
//	gameObject.GetComponent(SpriteRenderer).sprite = spriteArray[0];
}

function GetSpriteList (name : String) {
	var sprArray = new Array();
	sprArray = Resources.LoadAll(name);
	var spriteArray : Array = new Array();
	for (var i = 1; i < sprArray.length; i++) {
		spriteArray[i-1] = sprArray[i];
	}
	return spriteArray;
}

function Update () {
	if (flyingButtons) {
		modHeight += 1 * Time.deltaTime;
		Debug.Log(modHeight);
	}
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
