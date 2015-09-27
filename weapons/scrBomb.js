#pragma strict

public var util : scrUtilities;

private var rotateSpeed = 100.0;
public var moveSpeed = 2.0;
public var moveDirection = "";

function Start () {
	RandomSpeeds();
	transform.position.z = 0;
	
}

function Update () {
	Rotate(rotateSpeed);
	transform.position.x -= moveSpeed * Time.deltaTime;
	
	// going out of frame
	if (transform.position.x < -scrGame.screenWidth*1.05) {
		scrGame.bombCounter++;
		BlowUp();
	}
}

function Rotate (speed : float) {
	transform.Rotate(0, 0, Time.deltaTime * speed);
}


function RandomSpeeds () { //random movement speed and rotation speed
	rotateSpeed = 30.0 + 150.0 * Random.Range(0.0, 1.0);
	//moveSpeed = 0.8 + 1.0 * Random.Range(0.0, 1.0);
}

function BlowUp () {

	Destroy(gameObject);
}