#pragma strict

private var spinSpeed = 60.0;
private var moveSpeed = 2.4
;
private var screenWidth = 4.8;
private var screenHeight = 3.2;

function Start () {
	//screenWidth = 4.8 - (collider.bounds.size.y / 2);
	//screenHeight = 3.2 - (collider.bounds.size.y / 2);;
}

function Update () {
	Spin(spinSpeed);
	Move();
}

function Spin (speed : float) {
	transform.Rotate(0, 0, Time.deltaTime * speed);
}

function Move () {
	if (Input.GetKey (KeyCode.UpArrow) && transform.position.y < screenHeight) {transform.position.y += moveSpeed * Time.deltaTime;}
	else if (Input.GetKey (KeyCode.DownArrow) && transform.position.y > -screenHeight) {transform.position.y -= moveSpeed * Time.deltaTime;}
	if (Input.GetKey (KeyCode.RightArrow) && transform.position.x < screenWidth) {transform.position.x += moveSpeed * Time.deltaTime;}
	else if (Input.GetKey (KeyCode.LeftArrow) && transform.position.x > -screenWidth) {transform.position.x -= moveSpeed * Time.deltaTime;}
}

function OnCollisionEnter(coll : Collision) {
	if (coll.gameObject.tag == "tagBomb") {
		Debug.Log ("I've collided with a bomb");
		coll.gameObject.GetComponent(scrBomb).BlowUp();
	}
}



