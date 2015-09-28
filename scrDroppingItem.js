#pragma strict

public var speed : float = 1.0;
private var rotateSpeed : float = 2.0;
public var direction = "down";
public var itemType : int = 0;
public var iSpec : int;
private var declineRate : float = 1.5;

public var originalScale : float = 0.5 * (1 + ((itemType * 1.0) / 5));

public var mats : Material[] = new Material[4];
public var colors : Color[] = new Color[4];
public var sprts : Sprite[] = new Sprite[48];

function Start () {
	//GetComponent(MeshRenderer).material = mats[itemType];
	originalScale = 0.5 * (1 + ((itemType * 1.0) / 5));
	GetComponent(SpriteRenderer).color = colors[itemType];
	gameObject.transform.localScale = Vector2(originalScale,originalScale);
	sprts = GetSpriteList("Sprites/sprSnowflakes");
	GetComponent(SpriteRenderer).sprite = sprts[Random.Range(0, sprts.length)];
}

function Update () {
	// rotating the object
	rotateSpeed = speed * 30;
	transform.Rotate(0, 0, Time.deltaTime * rotateSpeed);
	// moving the object
	switch (direction) {
		case "down":
			transform.position.y -= speed * Time.deltaTime;
			break;
	}
	CheckSpectrum();
	if (transform.position.y < -scrGame.screenHeight * 1.05) {
		Destroy(gameObject);
	}
}

function CheckSpectrum () {
	var maxScale : float = originalScale;
	var minScale : float = originalScale/4;
	if (scrSoundSpectrum.posList[iSpec] < 6.4) {
		var scl : float = originalScale / 2 * (1 / (3.0 - scrSoundSpectrum.posList[iSpec]));
		if (scl > originalScale * 1.5) {scl = maxScale;}
		if (scl > gameObject.transform.localScale.x) {
			gameObject.transform.localScale = Vector2(scl, scl);
		}
		else {
			scl = gameObject.transform.localScale.x * (1 - declineRate * Time.deltaTime);
			gameObject.transform.localScale = Vector2(scl, scl);
		}
		
		if (gameObject.transform.localScale.x < minScale) {gameObject.transform.localScale = Vector2(minScale, minScale);}
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