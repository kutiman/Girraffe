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
	Application.Quit();
}

function OnMouseDown () {
	pressed = true;
}

function OnMouseOver () {
	if (pressed) {
		gameObject.GetComponent(SpriteRenderer).sprite = spriteArray[2] as Sprite;
	}
	else {
		gameObject.GetComponent(SpriteRenderer).sprite = spriteArray[1] as Sprite;
	}
}

function OnMouseUp () {
	pressed = false;
}

function OnMouseExit () {
	gameObject.GetComponent(SpriteRenderer).sprite = spriteArray[0] as Sprite;
}

function GetSpriteList (name : String) {
	var sprArray = new Array();
	sprArray = Resources.LoadAll(name);
	var spriteArray : Array = [sprArray[7],sprArray[8], sprArray[9]];
	return spriteArray;
}





