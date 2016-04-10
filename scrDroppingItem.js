#pragma strict

private var player : GameObject;
public var shard : GameObject;
private var trash : GameObject;

public var speed : Vector2 = Vector2(0.0,-1.0);
public var itemType : int = 0;
public var iSpec : int;
public var sucked : boolean = false;
public var lifetime : float = 2.0;
public var timeRemaining : float;

public var myScale : float = 0.5;

private var tagsList = ["tagNormalItem", "tagBadItem", "tagUpper", "tagVacuum", "tagSpecial"];

function Start () {
	timeRemaining = lifetime;
	trash = GameObject.FindWithTag("Trash");
	player = GameObject.FindWithTag("tagPlayer");
	GetComponent(SpriteRenderer).color = scrGame.colors[itemType+1];
	GetComponent(ParticleSystem).startColor = scrGame.colors[itemType+1];
	gameObject.tag = tagsList[itemType];
	
	if (gameObject.tag == "tagVacuum") {
		GetComponent(ParticleSystem).Play();
	}
	else {
		Destroy(GetComponent(ParticleSystem));
	}
}

function Update () {
	
	if (sucked && player) {
		GetSucked(player.transform.position, 4.0);
	}
	else {
		Move();
	}	
	FadeOut();
	CheckBounds();
}

function Move () {
	switch (itemType) {
	
		case 1 :
			if (player) {
				transform.position = Vector3.MoveTowards(transform.position, player.transform.position, 1 * Time.deltaTime);
				break;
			}
		
			
		default :
			transform.position.y += speed.y * Time.deltaTime;
			transform.position.x += speed.x * Time.deltaTime;
			break;
	}
}

function GetSucked (toPosition : Vector3, speedToTarget : float) {
	transform.position = Vector3.Lerp(transform.position, toPosition, 0.05 + speedToTarget * Time.deltaTime); 
}

function FadeOut () {
	var t = timeRemaining / lifetime;
	gameObject.transform.localScale = Vector2(myScale * (Mathf.Lerp(0.1, 1.0, t)), myScale * (Mathf.Lerp(0.1, 1.0, t)));
	timeRemaining -= Time.deltaTime;
	if (timeRemaining <= 0) {
		Destroy(gameObject);
	}	
}

public function BreakToPieces (pieces : int) {

	for (var i = 0; i < pieces; i++) {
		var obj = GameObject.Instantiate(shard, transform.position, Quaternion.identity);
		obj.GetComponent(SpriteRenderer).color = GetComponent(SpriteRenderer).color;
		if (trash) {
			obj.transform.parent = trash.transform;
		}
	}
}

function CheckBounds () {
	if (Mathf.Abs(transform.position.x) > scrGame.screenWidth || Mathf.Abs(transform.position.y) > scrGame.screenHeight) {
		Destroy(gameObject);
	}
}







