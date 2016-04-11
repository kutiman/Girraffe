#pragma strict

private var spinSpeed = 60.0;
private var moveSpeed = 2.4;
private var originalScale : float = 0.2;
private var screenWidth = 4.8;
private var screenHeight = 3.2;
private var item : GameObject;
private var factoryTransform : Transform;

private var manager : GameObject;
public var shard : GameObject;
private var trash : GameObject;

// Shooting values ########################################
public var bulletObject : GameObject;
public var reloadSpeed : float = 0.5;
private var lastShot : float = 0.0;
public var autoShoot : boolean = true;

// Hunger end ########################################
public var healthBar : GameObject;
public var initialEnergy : float = 100.0;
public var currentEnergy : float;
public var hungryInSeconds : float = 3.0;
public var multiplier : int;

var hurt = false;
private var hurtDuration : float = 2.0;

private var collR : float;

public var sound : AudioSource;
function Awake () {
	manager = GameObject.FindGameObjectWithTag ("GameController");
}

function Start () {
	//audio
	trash = GameObject.FindWithTag("Trash");
	sound = gameObject.AddComponent(AudioSource);
	collR = gameObject.GetComponent(SphereCollider).radius;
	item = GameObject.FindWithTag("tagFactory").GetComponent(scrSpec).item;
	factoryTransform = GameObject.FindWithTag("tagFactory").transform;
	currentEnergy = initialEnergy;
	GameObject.Instantiate(healthBar);
}

function Update () {
	multiplier = Mathf.Ceil(currentEnergy / initialEnergy);
	//Spin(spinSpeed);
	Move();
	// shoot
	autoShoot = scrGame.musicPlaying;
	if (autoShoot) {
		Shoot(multiplier);
	}
	UpdateScale();
	GetHungry();
	
	// Debug//////
	if (Input.GetKeyDown(KeyCode.Space)) {
		currentEnergy += 50;
	}
	///////
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
			case "NormalBit":
				BreakToPieces(1);
				currentEnergy -= 5.0;
				Destroy(coll.gameObject);
				scrGame.flakesCount[0] += 1;
				break;
			
			case "EnergyBit":
				currentEnergy += 20.0;
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
				
			case "FollowBit":
				BreakToPieces(5);
				currentEnergy -= 40.0;
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
		if (child.gameObject.tag == "EnergyBit") {
			scr.sucked = true;
		}
	}
}

function UpdateScale () {
	var newScale = originalScale * ((currentEnergy + initialEnergy/2) / initialEnergy);
	transform.localScale = Vector3(newScale, newScale, newScale);
}

function Shoot (level : int) {
	if (level < 1) {level = 1;}
	if (Time.time > lastShot + reloadSpeed) {
		lastShot = Time.time;
		var bullets : GameObject[] = new GameObject[level];
		
		for (var i = 0; i < level; i++) {
			bullets[i] = GameObject.Instantiate(bulletObject, transform.position, Quaternion.identity);
			if (level > 1) {
			var offset = (level * -10.0) / 2 + ((level * 10.0) / level-1) * i;
				bullets[i].transform.Rotate(Vector3(0,0,offset));
			}
			bullets[i].transform.parent = manager.transform;			
		}
	}
}

function GetHungry () {
	if (currentEnergy <= 0.0) {
		//die
		Debug.Log("I'm Dead!");
		Destroy(gameObject);
		currentEnergy = 0.0;
	}
	else {
		currentEnergy -= hungryInSeconds * Time.deltaTime;
	}
}

public function BreakToPieces (pieces : int) {

	for (var i = 0; i < pieces; i++) {
		var obj = GameObject.Instantiate(shard, transform.position, Quaternion.identity);
		obj.GetComponent(SpriteRenderer).color = gameObject.renderer.material.color;
		if (trash) {
			obj.transform.parent = trash.transform;
		}
	}
}

/*
switch (level) {
			case 1 :
				bullets[0] = GameObject.Instantiate(bulletObject, transform.position, Quaternion.identity);
				bullets[0].transform.parent = manager.transform;	 
				break;
				
			case 2 : 
				for (i = 0; i < level; i++) {
					bullets[i] = GameObject.Instantiate(bulletObject, transform.position, Quaternion.identity);
					bullets[i].transform.Rotate(Vector3(0,0,10 * Mathf.Pow(-1, i+1)));
					bullets[i].transform.parent = manager.transform;			
				}
				break;
			
			case 3 : 
				for (i = 0; i < level; i++) {
					bullets[i] = GameObject.Instantiate(bulletObject, transform.position, Quaternion.identity);
					bullets[i].transform.Rotate(Vector3(0,0,-15.0 + 15.0 * i));
					bullets[i].transform.parent = manager.transform;			
				}
				break;
			
			default :
				for (i = 0; i < level; i++) {
						bullets[i] = GameObject.Instantiate(bulletObject, transform.position, Quaternion.identity);
						bullets[i].transform.Rotate(Vector3(0,0,-15.0 + 15.0 * i));
						bullets[i].transform.parent = manager.transform;
				break;
		}
*/











