#pragma strict

private var spinSpeed = 60.0;
private var moveSpeed = 2.4;
private var originalScale : float = 0.2;
private var screenWidth = 4.8;
private var screenHeight = 3.2;
public var grade : int = 1;
private var item : GameObject;
private var factoryTransform : Transform;

var hurt = false;
private var hurtDuration : float = 2.0;

private var collSize : float;

public var sound : AudioSource;

function Start () {
	//audio
	sound = gameObject.AddComponent(AudioSource);
	collSize = gameObject.GetComponent(SphereCollider).radius * 2;
	grade = 0;
	item = GameObject.FindWithTag("tagFactory").GetComponent(scrSoundSpectrum).item;
	factoryTransform = GameObject.FindWithTag("tagFactory").transform;
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
	
	if (!hurt) {
		switch (coll.gameObject.tag) {
			case "tagNormalItem":
				Destroy(coll.gameObject);
				break;
			
			case "tagUpper":
				grade++;
				var newScale = originalScale * (1 + grade * 0.2);
				transform.localScale = Vector3(newScale, newScale, newScale);
				Destroy(coll.gameObject);
				break;
			
			case "tagVacuum":
				Vacuum();
				Destroy(coll.gameObject);
				break;
			
			case "tagSpecial":
				Destroy(coll.gameObject);
				break;
				
			case "tagBadItem":
				Explode();
				UpdateScale ();
				Destroy(coll.gameObject);
 				break;
		}
	}
}

function GetHurt () {
	hurt = true;
	sound.Play();
	yield WaitForSeconds(0.5);
	hurt = false;
}

function Vacuum () {
	
	for (var child : Transform in factoryTransform) {
		var scr = child.gameObject.GetComponent(scrDroppingItem);
		if (child.gameObject.tag != "tagBadItem") {
			scr.sucked = true;
		}
	}
}

function Explode () {
	var amountToCreate = Mathf.Floor(grade/2);
	for (var i = 0; i < amountToCreate; i++) {
		var obj = GameObject.Instantiate(item);
		obj.transform.position = transform.position;
		obj.transform.parent = factoryTransform;
		
		var spd : Vector2 = new Vector2(new Random.Range(-1.0, 1.0), new Random.Range(-1.0, 1.0));
		spd.x = Mathf.Sqrt(1 - Mathf.Pow(spd.y, 2)) * Mathf.Sign(spd.x);
		obj.GetComponent(scrDroppingItem).speed = spd;
		obj.GetComponent(scrDroppingItem).itemType = 2;
	}
	GetHurt();
	grade = Mathf.Ceil(grade/2.0);
}

function UpdateScale () {
	var newScale = originalScale * (1 + grade * 0.2);
	transform.localScale = Vector3(newScale, newScale, newScale);
}





