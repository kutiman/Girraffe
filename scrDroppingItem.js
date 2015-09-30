#pragma strict

private var player : GameObject;

public var speed : float = 1.0;
private var rotateSpeed : float = 2.0;
public var direction = "down";
public var itemType : int = 0;
public var iSpec : int;
private var declineRate : float = 1.5;
public var sucked : boolean = false;

public var originalScale : float = 0.5 * (1 + ((itemType * 1.0) / 5));

public var mats : Material[] = new Material[4];
public var colors : Color[] = new Color[4];
public var sprts : Sprite[] = new Sprite[48];
private var tagsList = ["tagNormalItem", "tagBadItem", "tagUpper", "tagVacuum", "tagSpecial"];

function Start () {
	player = GameObject.FindWithTag("tagPlayer");
	//GetComponent(MeshRenderer).material = mats[itemType];
	originalScale = 0.5 * (1 + ((itemType * 1.0) / 5));
	GetComponent(SpriteRenderer).color = colors[itemType];
	gameObject.transform.localScale = Vector2(originalScale,originalScale);
	sprts = GetSpriteList("Sprites/sprSnowflakes");
	GetComponent(SpriteRenderer).sprite = sprts[Random.Range(0, sprts.length)];
	gameObject.tag = tagsList[itemType];
}

function Update () {
	
	if (sucked && player) {
		GetSucked(player.transform.position, 4.0);
	}
	else {
		Move();
	}
	Rotate();
	CheckSpectrum();
	if (transform.position.y < -scrGame.screenHeight * 1.05) {
		Destroy(gameObject);
	}
	
	if (Input.GetKeyDown(KeyCode.G)) {
		sucked = !sucked;
	}
}

function CheckSpectrum () {
	var maxScale : float = originalScale;
	var minScale : float = originalScale/8;
	var relativePosition : float = 1 - (scrGame.screenHeight - transform.position.y) / (scrGame.screenHeight * 2);
	
	if (/*scrSoundSpectrum.posList[iSpec] < 6.4*/ true) {
		var scl : float = originalScale / 2 * (1 / (3.0 - scrSoundSpectrum.posList[iSpec]));
		if (scl > originalScale * 1.5) {scl = maxScale;}
		if (scl < gameObject.transform.localScale.x) {
			scl = gameObject.transform.localScale.x * (1 - declineRate * Time.deltaTime);
		}
		gameObject.transform.localScale = Vector2(scl, scl);
		if (gameObject.transform.localScale.x < minScale) {
			gameObject.transform.localScale = Vector2(minScale * Mathf.Lerp(0.7, 1.0, relativePosition), minScale * Mathf.Lerp(0.7, 1.0, relativePosition));
		}
	}
	
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

function Move () {
	switch (direction) {
		case "down":
			transform.position.y -= speed * Time.deltaTime;
			break;
	}
}

function Rotate () {
	rotateSpeed = speed * 30;
	transform.Rotate(0, 0, Time.deltaTime * rotateSpeed);
}

function GetSucked (toPosition : Vector3, speedToTarget : float) {
	transform.position = Vector3.Lerp(transform.position, toPosition, 0.05 + speedToTarget * Time.deltaTime); 
}



