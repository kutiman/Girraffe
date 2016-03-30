﻿#pragma strict

private var scoreText : GameObject;
private var livesText : GameObject;

public var instructionsStyle : GUIStyle;
private var instructionsOn : boolean = true;
private var instructionsStage : int = 0;

function Start () {
	
	//scoreText = CreateText(Vector3(0.5, 0.96, 0));
	//livesText = LivesText();
	yield WaitForSeconds(2);
	instructionsStage++;
	yield WaitForSeconds(5);
	instructionsStage++;
	yield WaitForSeconds(3);
	instructionsStage++;
	yield WaitForSeconds(3);
	instructionsStage++;
	instructionsOn = false;
}

function Update () {
	//scoreText.GetComponent(GUIText).text = "Score: " + scrGame.score.ToString();
	//livesText.GetComponent(GUIText).text = "Lives: " + scrGame.lives.ToString();

}

public function CreateText (pos : Vector3) {
	var obj = GameObject.Instantiate(Resources.Load("Prefabs/objGuiText")) as GameObject;
	obj.transform.position = pos;
	obj.transform.parent = gameObject.transform;
	return obj;
}

// Debug
function LivesText () {
	var obj = CreateText(Vector3(0.04, 0.96, 0)) as GameObject;
	obj.GetComponent(GUIText).anchor = TextAnchor.UpperLeft;
	obj.GetComponent(GUIText).alignment = TextAlignment.Left;
	obj.GetComponent(GUIText).fontSize = 14;
	return obj;
}

function ShowInstructions () {
	var line1 : String = "You are a small yellow orb.";
	var line2 : String  = "Collect the snowflakes made by the music.";
	var line3 : String  = "Avoid the red ones.";
	
	if (instructionsStage > 0) {GUI.Label(Rect(0,0,Screen.width,Screen.height/3),line1, instructionsStyle);}
	if (instructionsStage > 1) {GUI.Label(Rect(0,Screen.height/6,Screen.width,Screen.height/3),line2, instructionsStyle);}
	if (instructionsStage > 2) {GUI.Label(Rect(0,Screen.height/3,Screen.width,Screen.height/3),line3, instructionsStyle);}

}

function OnGUI () {
	if (instructionsOn) {
		ShowInstructions();
	}
}






