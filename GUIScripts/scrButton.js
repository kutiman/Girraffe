#pragma strict

// button state images 
public var sprites : Sprite[]; 	// images of all states of the button
public var typeOfButtons : String[] = ["Play", "Menu", "Level", "Restart", "ChooseLevel"]; // what type of button is this. a level button will also use a levelNumber.
public var buttonType : String;
public var textObject : GameObject;
public var levelNumber : int; // which level to load. only used by level buttons
private var pressed : boolean = false; // check if the button is presed.

function Awake () {
	if (GetComponent(SpriteRenderer)) {
		gameObject.GetComponent(SpriteRenderer).sprite = sprites[0] as Sprite;
	}	
}

function Start () {
	if (textObject){
		var tempText : String;
		if (buttonType == "Level") {
			tempText = (levelNumber + 1).ToString();
		}
		else if ((buttonType == "ChooseLevel")){
			tempText = "Continue";
		}
		else {
			tempText = buttonType;
		}
		
		var text : GameObject = GameObject.Instantiate(textObject);
		text.transform.parent = gameObject.transform;
		text.transform.localPosition = Vector3(0,0,0);
		text.GetComponent(TextMesh).text = tempText;
	}
}

function OnMouseUpAsButton () {
	switch (buttonType) {
		case "Play" :
			GameObject.FindWithTag("tagFader").GetComponent(scrFader).levelToLoad = "ChooseLevel";
			GameObject.FindWithTag("tagFader").GetComponent(scrFader).sceneEnding = true;
		case "ChooseLevel" :
			GameObject.FindWithTag("GameController").GetComponent(scrGame).ChooseLevel();
			break;
		case "Level" :
			scrGame.level = levelNumber;
			GameObject.FindWithTag("tagFader").GetComponent(scrFader).levelToLoad = "Level";
			GameObject.FindWithTag("tagFader").GetComponent(scrFader).sceneEnding = true;
			break;
		case "Restart" :
			GameObject.FindWithTag("tagFader").GetComponent(scrFader).levelToLoad = "Level";
			GameObject.FindWithTag("tagFader").GetComponent(scrFader).sceneEnding = true;
			break;
	}
}

function OnMouseDown () {
	pressed = true;
}

function OnMouseOver () {
	if (pressed && sprites.Length > 2) {
		gameObject.GetComponent(SpriteRenderer).sprite = sprites[2] as Sprite;
	}
	else {
		gameObject.GetComponent(SpriteRenderer).sprite = sprites[1] as Sprite;
	}
}

function OnMouseUp () {
	pressed = false;
}

function OnMouseExit () {
	gameObject.GetComponent(SpriteRenderer).sprite = sprites[0] as Sprite;
}





