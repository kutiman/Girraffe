#pragma strict

private var player : GameObject;

public var speed : Vector2 = Vector2(0.0,-1.0);
private var rotateSpeed : float = 2.0;
public var direction = "down";
public var itemType : int = 0;
public var iSpec : int;
public var decayRate : float = 0.1;
public var sucked : boolean = false;
public var controlled : boolean = false;
public var lifeTime : Vector2;
public var dying : boolean = false;

public var myScale : float = 0.5;

public var mats : Material[] = new Material[4];
public var sprts : Sprite[] = new Sprite[48];
private var tagsList = ["tagNormalItem", "tagBadItem", "tagUpper", "tagVacuum", "tagSpecial"];

function Start () {
	player = GameObject.FindWithTag("tagPlayer");
	//GetComponent(MeshRenderer).material = mats[itemType];
	GetComponent(SpriteRenderer).color = scrGame.colors[itemType+1];
	GetComponent(ParticleSystem).startColor = scrGame.colors[itemType+1];
	sprts = GetSpriteList("Sprites/sprSnowflakes");
	GetComponent(SpriteRenderer).sprite = sprts[Random.Range(0, sprts.length)];
	gameObject.tag = tagsList[itemType];
	
	if (gameObject.tag == "tagVacuum") {
		GetComponent(ParticleSystem).Play();
	}
}

function Update () {
	
	if (sucked && player) {
		GetSucked(player.transform.position, 4.0);
	}
	else {
		Move();
	}
	Rotate();
	Decay();
	if (transform.position.y < -scrGame.screenHeight * 1.05) {
		Destroy(gameObject);
	}
	
	if (Input.GetKeyDown(KeyCode.G)) {
		sucked = !sucked;
	}
	
	SlowlyDie();
}

function Decay () {
	var minScale : float = 0.9/3;
	var relativePosition : float = 1 - (scrGame.screenHeight - transform.position.y) / (scrGame.screenHeight * 2);
	
	myScale *= (1 - decayRate * Time.deltaTime);
	gameObject.transform.localScale = Vector2(myScale * (Mathf.Lerp(0.5, 1.0, relativePosition)), myScale * (Mathf.Lerp(0.5, 1.0, relativePosition)));
	
	if (gameObject.transform.localScale.x < minScale * (Mathf.Lerp(0.5, 1.0, relativePosition))) {
		gameObject.transform.localScale = Vector2(minScale * (Mathf.Lerp(0.5, 1.0, relativePosition)), minScale * (Mathf.Lerp(0.5, 1.0, relativePosition)));
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
			transform.position.y += speed.y * Time.deltaTime;
			transform.position.x += speed.x * Time.deltaTime;
			break;
	}
}

function Rotate () {
	rotateSpeed = speed.y * 30;
	transform.Rotate(0, 0, Time.deltaTime * rotateSpeed);
}

function GetSucked (toPosition : Vector3, speedToTarget : float) {
	transform.position = Vector3.Lerp(transform.position, toPosition, 0.05 + speedToTarget * Time.deltaTime); 
}

function SlowlyDie () {
	if (dying) {
		var dimTime : float = 2.0;
		var timeOfDeath = lifeTime.x + lifeTime.y;
		if (timeOfDeath <= Time.time) {
			Destroy(gameObject);
		}
		else if (timeOfDeath - dimTime < Time.time) {
			var tempAlpha : float = (dimTime - (Time.time - (timeOfDeath - dimTime))) / dimTime;
			GetComponent(SpriteRenderer).color.a = tempAlpha;
		}
	}

}










