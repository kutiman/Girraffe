#pragma strict

private var moveSpeed = 5.0;

function Start () {
	transform.position = Vector2(scrGame.screenWidth * 1.05, Random.Range(-scrGame.screenHeight * 0.9, scrGame.screenHeight * 0.9));
	// Set the sorting layer of the particle system.
        particleSystem.renderer.sortingLayerName = "foreground";
        particleSystem.renderer.sortingOrder = 2;
}

function Update () {
	Move(moveSpeed);
	if (transform.position.x < -scrGame.screenWidth*1.2) {
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
	scrGame.rocketCounter++;
	CreateExplosion();
	Destroy(gameObject);
}