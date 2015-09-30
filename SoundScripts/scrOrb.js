#pragma strict

private var spinSpeed = 60.0;
private var moveSpeed = 2.4;
private var originalScale : float = 0.2;
private var screenWidth = 4.8;
private var screenHeight = 3.2;
public var grade : int = 0;

var hurt = false;
private var hurtDuration : float = 2.0;

private var collSize : float;

public var sound : AudioSource;

function Start () {
	//audio
	sound = gameObject.AddComponent(AudioSource);
	collSize = gameObject.GetComponent(SphereCollider).radius * 2;
	grade = 0;
}

function Update () {
	Spin(spinSpeed);
	Move();
}

function Spin (speed : float) {
	transform.Rotate(Time.deltaTime * speed, Time.deltaTime * speed, Time.deltaTime * speed);
}

function Move () {
	if (Input.GetKey (KeyCode.UpArrow) && transform.position.y < screenHeight - collSize/2) {transform.position.y += moveSpeed * Time.deltaTime;}
	else if (Input.GetKey (KeyCode.DownArrow) && transform.position.y > -screenHeight + collSize/2) {transform.position.y -= moveSpeed * Time.deltaTime;}
	if (Input.GetKey (KeyCode.RightArrow) && transform.position.x < screenWidth - collSize/2) {transform.position.x += moveSpeed * Time.deltaTime;}
	else if (Input.GetKey (KeyCode.LeftArrow) && transform.position.x > -screenWidth + collSize/2) {transform.position.x -= moveSpeed * Time.deltaTime;}
}

function OnTriggerStay(coll : Collider) {
	
	switch (coll.gameObject.tag) {
		case "tagNormalItem":
			Destroy(coll.gameObject);
			break;
		
		case "tagUpper":
			grade++;
			var newScale = originalScale * (Mathf.Sqrt(grade));
			transform.localScale = Vector3(newScale, newScale, newScale);
			Destroy(coll.gameObject);
			break;
		
		case "tagVacuum":
			Destroy(coll.gameObject);
			break;
		
		case "tagSpecial":
			Destroy(coll.gameObject);
			break;
			
		case "tagBadItem":
			Destroy(coll.gameObject);
			break;
	}
}

function GetHurt (dur : float) {
	hurt = true;
	sound.Play();
	
	while(dur > 0) {
		
		if (gameObject.GetComponent(Material).color.a >= 0.5) {
			gameObject.GetComponent(Material).color.a = 0.0;
		}
		else {
			gameObject.GetComponent(Material).color.a = 0.5;
		}
		yield WaitForSeconds(0.2);
		dur -= 0.2;
	}
	hurt = false;
	gameObject.GetComponent(Material).color.a = 1.0;
}

function Vacuum () {
	
}






