#pragma strict

private var scoreText : GameObject;
private var livesText : GameObject;

public var instructionsStyle : GUIStyle;
public var buttonStyle : GUIStyle;
public var instStage : int = 0;
private var levelStage = 0;

function Start () {
	if (scrGame.levelStage == 0){
		StartingInstructions();
	}
	levelStage = 1;
	instStage = 0;
}

function StartingInstructions () {
	yield WaitForSeconds(2);
	instStage++;
	yield WaitForSeconds(5);
	instStage++;
	yield WaitForSeconds(3);
	instStage++;
	yield WaitForSeconds(3);
}

function GameOverTimeline () {
	instStage = 0;
	yield WaitForSeconds(2);
	instStage++;
	yield WaitForSeconds(2);
	instStage++;
	yield WaitForSeconds(2);
	instStage++;
	yield WaitForSeconds(2);
	instStage++;
}

function Update () {
	if (scrGame.levelStage == 2 && levelStage == 1) {
		levelStage = 2;
		GameOverTimeline();
	}

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

function OnGUI () {
	// tutorial
	if (scrGame.levelStage == 0) {
		var line1 : String = "You are a small yellow orb.";
		var line2 : String  = "Collect the snowflakes made by the music.";
		var line3 : String  = "Avoid the red ones.";
		
		if (instStage > 0) {GUI.Label(Rect(0,0,Screen.width,Screen.height/3),line1, instructionsStyle);}
		if (instStage > 1) {GUI.Label(Rect(0,Screen.height/6,Screen.width,Screen.height/3),line2, instructionsStyle);}
		if (instStage > 2) {GUI.Label(Rect(0,Screen.height/3,Screen.width,Screen.height/3),line3, instructionsStyle);}
	}
	
	else if (scrGame.levelStage == 2) {
		
		var buttonSize : Vector2 = Vector2(Screen.width/5, Screen.width/15);
		
		var line4 : String = "This is the end, yellow friend.";
		var line5 : String  = "You have collected " + scrGame.flakesCount[0].ToString() + " white flakes.";
		var line6 : String  = "There are no more...";
		var line7 : String = "Restart";
		var line8 : String = "Menu";
		
		if (instStage >= 0) {GUI.Label(Rect(0,0,Screen.width,Screen.height/3),line4, instructionsStyle);}
		if (instStage >= 1) {GUI.Label(Rect(0,Screen.height/8,Screen.width,Screen.height/3),line5, instructionsStyle);}
		if (instStage >= 2) {GUI.Label(Rect(0,Screen.height/4,Screen.width,Screen.height/3),line6, instructionsStyle);}
		if (instStage >= 3) {
			if (GUI.Button(Rect(Screen.width/2 - buttonSize.x/2, Screen.height * 0.65 - buttonSize.y/2, buttonSize.x, buttonSize.y),line7, buttonStyle)){
				RestartPressed();
			}
			if (GUI.Button(Rect(Screen.width/2 - buttonSize.x/2, Screen.height * 0.85 - buttonSize.y/2, buttonSize.x, buttonSize.y),line8, buttonStyle)){
				GameObject.FindWithTag("GameController").GetComponent(scrGame).Menu();
			}
		}
	}
}

function RestartPressed () {
	levelStage = 1;
	GameObject.FindWithTag("GameController").GetComponent(scrGame).Restart();
}






