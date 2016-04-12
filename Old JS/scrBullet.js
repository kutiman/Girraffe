#pragma strict

public var speed : float = 3.0;
private var lifetime = 4.0;

function Start () {
	yield WaitForSeconds(lifetime);
	Destroy(gameObject);
}
function FixedUpdate () {
	MoveUp();
	if (transform.position.y > scrGame.screenHeight * 1.1) {
		Destroy(gameObject);
	}
}

function MoveUp () {
	transform.Translate(Vector3.up * speed * Time.deltaTime);
}

function OnTriggerStay(coll : Collider) {
	var scr : scrDroppingItem = coll.GetComponent(scrDroppingItem);
	switch (coll.gameObject.tag) {
		case "NormalBit":
			if (scr) {scr.BreakToPieces(4);}
			Destroy(coll.gameObject);
			scrGame.flakesCount[0] += 1;
			Destroy(gameObject);
			break;
		
		case "tagSpecial":
			if (scr) {scr.BreakToPieces(4);}
			Destroy(coll.gameObject);
			Destroy(gameObject);
			break;
			
		case "FollowBit":
			if (scr) {scr.BreakToPieces(6);}
			Destroy(coll.gameObject);
			scrGame.flakesCount[1] += 1;
			Destroy(gameObject);
			break;
	}
}
