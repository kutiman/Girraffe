#pragma strict

private var spinSpeed = 60.0;
private var moveSpeed = 2.4
;
private var screenWidth = 4.8;
private var screenHeight = 3.2;

var hurt = false;
private var hurtDuration : float = 2.0;

private var collSize : float;

public var sound : AudioSource;

function Start () {
	//audio
	sound = gameObject.AddComponent(AudioSource);
	sound.clip = Resources.Load("Sounds/sndOuch");
	
	collSize = gameObject.GetComponent(BoxCollider).size.y * transform.localScale.x;
}

function Update () {
	Spin(spinSpeed);
	Move();
}

function Spin (speed : float) {
	transform.Rotate(0, 0, Time.deltaTime * speed);
}

function Move () {
	if (Input.GetKey (KeyCode.UpArrow) && transform.position.y < screenHeight - collSize/2) {transform.position.y += moveSpeed * Time.deltaTime;}
	else if (Input.GetKey (KeyCode.DownArrow) && transform.position.y > -screenHeight + collSize/2) {transform.position.y -= moveSpeed * Time.deltaTime;}
	if (Input.GetKey (KeyCode.RightArrow) && transform.position.x < screenWidth - collSize/2) {transform.position.x += moveSpeed * Time.deltaTime;}
	else if (Input.GetKey (KeyCode.LeftArrow) && transform.position.x > -screenWidth + collSize/2) {transform.position.x -= moveSpeed * Time.deltaTime;}
}

function OnTriggerStay(coll : Collider) {

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
		else if (coll.gameObject.tag == "tagBullet") {
			coll.gameObject.GetComponent(scrBullet).Die();
			GetHurt(hurtDuration);
		}
		else if (coll.gameObject.tag == "tagCoin") {
			scrGame.coins++;
			coll.gameObject.GetComponent(scrCoin).PickedUp();
		}
	}
}

function GetHurt (dur : float) {
	hurt = true;
	scrGame.lives--;
	sound.Play();
	
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








