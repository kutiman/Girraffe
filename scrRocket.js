#pragma strict

private var moveSpeed = 5.0;

function Start () {
	transform.position = Vector2(scrGame.screenWidth * 1.05, transform.position.y);
}

function Update () {
	Move(moveSpeed);
	if (transform.position.x < -scrGame.screenWidth*1.2) {
		scrGame.rocketCounter++;
		scrGame.CreateCoin(3);
		Destroy(gameObject);
	}
}

function Move (speed : float) {
	transform.position.x -= speed * Time.deltaTime;
}

function CreateExplosion () {
	var obj = GameObject.Instantiate(Resources.Load("Prefabs/objExplosion")) as GameObject;
	obj.transform.position = gameObject.transform.position;
}

function BlowUp () {
	CreateExplosion();
	Destroy(gameObject);
}