#pragma strict

public var objText : GameObject;
public var icons : Texture[];
public var buttonObject : GameObject;

private var levelStage = 0;

function Start () {
	if (scrGame.levelStage == 0 && !scrGame.tutorialPassed){
		ShowTutorial();
	}
	levelStage = 1;
}

function Update () {
	if (scrGame.levelStage == 2 && levelStage == 1) {
		levelStage = 2;
	}
}


function OnGUI () {	
	if (scrGame.levelStage == 1) {
		var iconHeight : float = Screen.height/15;
		var pad : float = 0.02; //percentage of screen width to use as padding... 
		if (GUI.Button(Rect(Screen.width * (1.0 - pad) - (iconHeight * (icons[0].width / icons[0].height)), Screen.width * pad, iconHeight * (icons[0].width / icons[0].height), iconHeight), icons[0], GUIStyle.none)) {
			GameObject.FindWithTag("GameController").GetComponent(scrGame).ChooseLevel();
		}
	}
}

function RestartPressed () {
	levelStage = 1;
	GameObject.FindWithTag("GameController").GetComponent(scrGame).Restart();
}

function ShowTutorial () {
	var waitTime : float = 2.0;
	var ancY : float = 2;
	var pad : float = scrGame.screenHeight / 6;
	
	var tutorialLines : String[] = [
		"You are a small yellow orb.",
		"Collect the snowflakes made by the music.",
		"Avoid the red ones."];
		
	var objList : GameObject[] = new GameObject[tutorialLines.Length];
		
	yield WaitForSeconds(waitTime);
	
	for (var i = 0; i < tutorialLines.Length; i++) {
		
		objList[i] = GameObject.Instantiate(objText) as GameObject;
		objList[i].GetComponent(TextMesh).text = tutorialLines[i];
		objList[i].transform.position = Vector3(0, ancY - (i * pad), 0);
		objList[i].transform.parent = gameObject.transform;
		yield WaitForSeconds(waitTime);
	}
	
	scrGame.tutorialPassed = true;
	for (var obj : GameObject in objList) {
		Destroy(obj.gameObject);
	}
}

