#pragma strict

private var spinSpeed = 60.0;
private var moveSpeed = 2.4;
private var originalScale : float = 0.2;
private var screenWidth = 4.8;
private var screenHeight = 3.2;
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
	sound = gameObject.AddComponent(AudioSource);
	collR = gameObject.GetComponent(SphereCollider).radius;
	item = GameObject.FindWithTag("tagFactory").GetComponent(scrSpec).item;
	factoryTransform = GameObject.FindWithTag("tagFactory").transform;
	currentEnergy = initialEnergy;
}

function Update () {
	multiplier = Mathf.Ceil(currentEnergy / initialEnergy);
	Spin(spinSpeed);
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
			case "tagNormalItem":
				LoseSize(1);
				currentEnergy -= 5.0;
				Destroy(coll.gameObject);
				scrGame.flakesCount[0] += 1;
				break;
			
			case "tagUpper":
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
				
			case "tagBadItem":
				LoseSize(5);
				currentEnergy *= 0.75;
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

function LoseSize (amountToCreate : int) {
	for (var i = 0; i < amountToCreate; i++) {
		var obj = GameObject.Instantiate(item);
		obj.transform.position = transform.position;
		obj.transform.parent = factoryTransform;
		
		var spd : Vector2 = new Vector2(new Random.Range(-1.0, 1.0), new Random.Range(-1.0, 1.0));
		spd.x = Mathf.Sqrt(1 - Mathf.Pow(spd.y, 2)) * Mathf.Sign(spd.x);
		obj.GetComponent(scrDroppingItem).speed = spd;
		obj.GetComponent(scrDroppingItem).itemType = 2;
		obj.GetComponent(scrDroppingItem).lifeTime = Vector2(Time.time, 2.0);
		obj.GetComponent(scrDroppingItem).dying = true;
		Destroy(obj.GetComponent(BoxCollider));
	}
	//GetHurt();
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
		var i : int = 0;
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
				bullets[0] = GameObject.Instantiate(bulletObject, transform.position, Quaternion.identity);
				bullets[1] = GameObject.Instantiate(bulletObject, transform.position, Quaternion.identity);
				bullets[0].transform.Rotate(Vector3(0,0,10));
				bullets[1].transform.Rotate(Vector3(0,0,-10));
				bullets[0].transform.parent = manager.transform;
				bullets[1].transform.parent = manager.transform;
			
			default :
				break;
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












