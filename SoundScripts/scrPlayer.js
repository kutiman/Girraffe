#pragma strict

private var spinSpeed = 60.0;
private var moveSpeed = 2.4;
private var originalScale : float = 0.2;
private var screenWidth = 4.8;
private var screenHeight = 3.2;
public var grade : int = 1;
private var item : GameObject;
private var factoryTransform : Transform;

private var manager : GameObject;

// Shooting values ########################################
public var bulletObject : GameObject;
public var reloadSpeed : float = 0.5;
private var lastShot : float = 0.0;
public var autoShoot : boolean = true;

// Hunger end ########################################
public var initialEnergy : float = 100.0;
public var currentEnergy : float;
public var hungryInSeconds : float = 5.0;

var hurt = false;
private var hurtDuration : float = 2.0;

private var collR : float;

public var sound : AudioSource;
function Awake () {
	manager = GameObject.FindGameObjectWithTag ("GameController");
}

function Start () {
	//audio
	sound = gameObject.AddComponent(AudioSource);
	collR = gameObject.GetComponent(SphereCollider).radius;
	grade = 0;
	item = GameObject.FindWithTag("tagFactory").GetComponent(scrSpec).item;
	factoryTransform = GameObject.FindWithTag("tagFactory").transform;
	currentEnergy = initialEnergy;
}

function Update () {
	Spin(spinSpeed);
	Move();
	// shoot
	if (autoShoot) {
		Shoot();
	}
	
	GetHungry();
}

function Spin (speed : float) {
	transform.Rotate(Time.deltaTime * speed, Time.deltaTime * speed, Time.deltaTime * speed);
}

function Move () {
	if (Input.GetKey (KeyCode.UpArrow) && transform.position.y < screenHeight - collR) {transform.position.y += moveSpeed * Time.deltaTime;}
	else if (Input.GetKey (KeyCode.DownArrow) && transform.position.y > -screenHeight + collR) {transform.position.y -= moveSpeed * Time.deltaTime;}
	if (Input.GetKey (KeyCode.RightArrow) && transform.position.x < screenWidth - collR) {transform.position.x += moveSpeed * Time.deltaTime;}
	else if (Input.GetKey (KeyCode.LeftArrow) && transform.position.x > -screenWidth + collR) {transform.position.x -= moveSpeed * Time.deltaTime;}
}

function OnTriggerStay(coll : Collider) {
	
	if (!hurt) {
		switch (coll.gameObject.tag) {
			case "tagNormalItem":
				Explode(1);
				currentEnergy = initialEnergy;
				Destroy(coll.gameObject);
				scrGame.flakesCount[0] += 1;
				break;
			
			case "tagUpper":
				grade++;
				currentEnergy = initialEnergy;
				var newScale = originalScale * (1 + grade * 0.2);
				transform.localScale = Vector3(newScale, newScale, newScale);
				Destroy(coll.gameObject);
				scrGame.flakesCount[2] += 1;
				break;
			
			case "tagVacuum":
				Vacuum();
				Destroy(coll.gameObject);
				scrGame.flakesCount[3] += 1;
				break;
			
			case "tagSpecial":
				Destroy(coll.gameObject);
				break;
				
			case "tagBadItem":
				Explode(Mathf.Floor(grade/2));
				currentEnergy = initialEnergy;
				UpdateScale ();
				Destroy(coll.gameObject);
				scrGame.flakesCount[1] += 1;
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
		if (child.gameObject.tag == "tagUpper") {
			scr.sucked = true;
		}
	}
}

function Explode (amountToCreate : int) {
	for (var i = 0; i < amountToCreate; i++) {
		var obj = GameObject.Instantiate(item);
		obj.transform.position = transform.position;
		obj.transform.parent = factoryTransform;
		
		var spd : Vector2 = new Vector2(new Random.Range(-1.0, 1.0), new Random.Range(-1.0, 1.0));
		spd.x = Mathf.Sqrt(1 - Mathf.Pow(spd.y, 2)) * Mathf.Sign(spd.x);
		obj.GetComponent(scrDroppingItem).speed = spd;
		obj.GetComponent(scrDroppingItem).itemType = 2;
		obj.GetComponent(scrDroppingItem).lifeTime = Vector2(Time.time, 3.0);
		obj.GetComponent(scrDroppingItem).dying = true;
	}
	GetHurt();
	grade -= amountToCreate;
}

function UpdateScale () {
	var newScale = originalScale * (1 + grade * 0.2);
	transform.localScale = Vector3(newScale, newScale, newScale);
}

function Shoot () {
	if (Time.time > lastShot + reloadSpeed) {
		var bullet : GameObject = GameObject.Instantiate(bulletObject, transform.position, Quaternion.identity);
		lastShot = Time.time;
		bullet.transform.parent = manager.transform;
	}
}

function GetHungry () {
	if (currentEnergy <= 0.0) {
		Explode(1);
		currentEnergy = initialEnergy;
	}
	else {
		currentEnergy -= initialEnergy / hungryInSeconds * Time.deltaTime;
	}
}


