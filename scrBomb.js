#pragma strict

private var rotateSpeed = 100.0;
private var moveSpeed = 1.0;

function Start () {
	RandomSpeeds();
	transform.position = Vector2(scrGame.screenWidth * 1.05, Random.Range(-scrGame.screenHeight * 0.9, scrGame.screenHeight * 0.9));
}

function Update () {
	Rotate(rotateSpeed);
	Move(moveSpeed);
	
	// going out of frame
	if (transform.position.x < -scrGame.screenWidth*1.05) {
		scrGame.bombCounter++;
		scrGame.CreateCoin(1);
		BlowUp();
	}
}

function Rotate (speed : float) {
	transform.Rotate(0, 0, Time.deltaTime * speed);
}

function Move (speed : float) {
	transform.position.x -= speed * Time.deltaTime;
}

function RandomSpeeds () { //random movement speed and rotation speed
	rotateSpeed = 30.0 + 150.0 * Random.Range(0.0, 1.0);
	moveSpeed = 0.8 + 1.0 * Random.Range(0.0, 1.0);
}

function BlowUp () {

	Destroy(gameObject);
}