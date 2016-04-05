#pragma strict

public var speed : float = 3.0;

function FixedUpdate () {
	MoveUp();
}

function MoveUp () {
	transform.Translate(Vector3.up * speed * Time.deltaTime);
}

function OnTriggerStay(coll : Collider) {

	switch (coll.gameObject.tag) {
		case "tagNormalItem":
			Destroy(coll.gameObject);
			scrGame.flakesCount[0] += 1;
			break;
		
		case "tagSpecial":
			Destroy(coll.gameObject);
			break;
			
		case "tagBadItem":
			Destroy(coll.gameObject);
			scrGame.flakesCount[1] += 1;
			break;
	}
}
