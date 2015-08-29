#pragma strict

private var spinSpeed = 60.0;
private var moveSpeed = 2.4
;
private var screenWidth = 4.8;
private var screenHeight = 3.2;

var hurt = false;
private var hurtDuration : float = 2.0;

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

function OnCollisionStay(coll : Collision) {

	if (!hurt) {
		if (coll.gameObject.tag == "tagBomb") {
			coll.gameObject.GetComponent(scrBomb).BlowUp();
			GetHurt(hurtDuration);
		}
		else if (coll.gameObject.tag == "tagRocket") {
			coll.gameObject.GetComponent(scrRocket).BlowUp();
			GetHurt(hurtDuration);
		}
		else if (coll.gameObject.tag == "tagExplosion") {
			GetHurt(hurtDuration);
		}
		else if (coll.gameObject.tag == "tagWeight") {
			GetHurt(hurtDuration);
		}
	}
}

function GetHurt (dur : float) {
	hurt = true;
	scrGame.lives--;
	gameObject.GetComponent(AudioSource).Play();
	
	while(dur > 0) {
		
		if (gameObject.GetComponent(SpriteRenderer).color.a >= 0.5) {
			gameObject.GetComponent(SpriteRenderer).color.a = 0.0;
		}
		else {
			gameObject.GetComponent(SpriteRenderer).color.a = 0.5;
		}
		yield WaitForSeconds(0.2);
		dur -= 0.2;
	}
	hurt = false;
	gameObject.GetComponent(SpriteRenderer).color.a = 1.0;
}








