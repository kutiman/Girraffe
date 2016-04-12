#pragma strict

public var objText : GameObject;
public var buttonObject : GameObject;
public var levelWon : boolean;

public var loseText : String[] = [
	"You are dead.",
	"Try again?"
];

public var winText : String[] = [
	"The music is over.",
	"Congratulations, you are still alive."
];

function Start() {
	if (levelWon) {GameOverMenu(winText);}
	else {GameOverMenu(loseText);}
}

public function GameOverMenu(txt : String[]) {
	
	var waitTime : float = 2.0;
	var ancY : float = 2.0;
	var pad : float = scrGame.screenHeight / 6;
	

		
	var objList : GameObject[] = new GameObject[txt.Length];
	
	for (var i = 0; i < txt.Length; i++) {
		objList[i] = GameObject.Instantiate(objText) as GameObject;
		objList[i].GetComponent(TextMesh).text = txt[i];
		objList[i].transform.position = Vector3(0, ancY - (i * pad), 0);
		objList[i].transform.parent = gameObject.transform;
		yield WaitForSeconds(waitTime);
	}
	
	var buttons : GameObject[] = new GameObject[2];
	
	buttons[0] = GameObject.Instantiate(buttonObject, Vector3(0, -scrGame.screenWidth * 0.3, 0), Quaternion.identity) as GameObject;
	buttons[0].GetComponent(scrButton).buttonType = "ChooseLevel";
	buttons[0].transform.parent = gameObject.transform;
	
	buttons[1] = GameObject.Instantiate(buttonObject, Vector3(0, -scrGame.screenWidth * 0.5, 0), Quaternion.identity) as GameObject;
	buttons[1].GetComponent(scrButton).buttonType = "Restart";
	buttons[1].transform.parent = gameObject.transform;
}

public function GameOverMenu() {

	var waitTime : float = 2.0;
	var ancY : float = 2.0;
	var pad : float = scrGame.screenHeight / 6;
	
	var endMenuLines : String[] = [
		"You are dead.",
		"Try again?"
	];
		
	var objList : GameObject[] = new GameObject[endMenuLines.Length];
	
	for (var i = 0; i < endMenuLines.Length; i++) {
		objList[i] = GameObject.Instantiate(objText) as GameObject;
		objList[i].GetComponent(TextMesh).text = endMenuLines[i];
		objList[i].transform.position = Vector3(0, ancY - (i * pad), 0);
		objList[i].transform.parent = gameObject.transform;
		yield WaitForSeconds(waitTime);
	}
	
	var buttons : GameObject[] = new GameObject[2];
	
	buttons[0] = GameObject.Instantiate(buttonObject, Vector3(0, -scrGame.screenWidth * 0.3, 0), Quaternion.identity) as GameObject;
	buttons[0].GetComponent(scrButton).buttonType = "ChooseLevel";
	buttons[0].transform.parent = gameObject.transform;
	
	buttons[1] = GameObject.Instantiate(buttonObject, Vector3(0, -scrGame.screenWidth * 0.5, 0), Quaternion.identity) as GameObject;
	buttons[1].GetComponent(scrButton).buttonType = "Restart";
	buttons[1].transform.parent = gameObject.transform;
}

