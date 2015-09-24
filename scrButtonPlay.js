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
	//GameObject.FindWithTag("GameController").GetComponent(scrGame).CreateLevel(scrGame.level);

	cam.GetComponent(scrMainCamera).lightMode = 1;
	yield WaitForSeconds(2);
	Application.LoadLevel("Level");
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


function CamEffect () {

	var fromSize : float = 3.2;
	var duration : float = 1.0;
	if (cam.GetComponent(Camera).orthographicSize > 0) {
		cam.GetComponent(Camera).orthographicSize -= (fromSize * Time.deltaTime) / duration;
	}
}

function CamSpinning () {

	var fromSize : float = 3.2;
	var duration : float = 1.0;
	var speed = 2.0;
	if (cam.GetComponent(Camera).orthographicSize > 0) {
		cam.GetComponent(Camera).orthographicSize -= (fromSize * Time.deltaTime) / duration;
		transform.Rotate(0, 0, Time.deltaTime * speed);
	}
}

function GetSpriteList (name : String) {
	var sprArray = new Array();
	sprArray = Resources.LoadAll(name);
	var spriteArray : Array = [sprArray[1],sprArray[2], sprArray[3]];
	return spriteArray;
}



