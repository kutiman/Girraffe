#pragma strict

// button state images 
public var spriteArray = new Array();

private var pressed : boolean = false;
/////////////////////////////////////

var cam : GameObject;


function Start () {
	spriteArray = GetSpriteList("Sprites/sprButtons");
	
	cam = GameObject.FindWithTag("MainCamera") as GameObject;
}

function OnMouseUpAsButton () {
	cam.GetComponent(scrMainCamera).lightMode = 1;
	yield WaitForSeconds(1);
	Application.Quit();
}

function OnMouseDown () {
	pressed = true;
}

function OnMouseOver () {
	if (pressed) {
		gameObject.GetComponent(SpriteRenderer).sprite = spriteArray[2];
	}
	else {
		gameObject.GetComponent(SpriteRenderer).sprite = spriteArray[1];
	}
}

function OnMouseUp () {
	pressed = false;
}

function OnMouseExit () {
	gameObject.GetComponent(SpriteRenderer).sprite = spriteArray[0];
}

function GetSpriteList (name : String) {
	var sprArray = new Array();
	sprArray = Resources.LoadAll(name);
	var spriteArray : Array = [sprArray[7],sprArray[8], sprArray[9]];
	return spriteArray;
}





