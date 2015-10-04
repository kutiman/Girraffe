#pragma strict

private var moveSpeed = 5.0;
public var util : scrUtilities;

function Start () {
	transform.position = Vector2(scrGame.screenWidth * 1.05, transform.position.y);
}

function Update () {
	transform.position.x -= moveSpeed * Time.deltaTime;
	if (transform.position.x < -scrGame.screenWidth*1.2) {

		Destroy(gameObject);
	}
}

function CreateExplosion () {
	var obj = GameObject.Instantiate(Resources.Load("Prefabs/objExplosion")) as GameObject;
	obj.transform.position = gameObject.transform.position;
}

function BlowUp () {
	CreateExplosion();
	Destroy(gameObject);
}