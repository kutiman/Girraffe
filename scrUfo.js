#pragma strict

private var enteringFrom : float;
private var moveSpeed : float = 1.5;
private var cooldown : float = 2.0;
private var cooling : boolean = false;
public var shots : int = 3;

function Start () {
	enteringFrom = Random.Range(-1, 1);
	
	if (enteringFrom > 0.0) {
		enteringFrom = 1.0;
	}
	else {
		enteringFrom = -1.0;
	}
	
	transform.position = Vector2(scrGame.screenWidth * 1.25 * enteringFrom, Random.Range(scrGame.screenHeight * 0.80, scrGame.screenHeight * 0.9));
}

function Update () {
	Move();
	var pos : float = transform.position.x;
	if (shots <= 0 && pos * Mathf.Sign(pos) > scrGame.screenWidth * 1.25) {
		Die();
	}
}

function Cooldown (time : float) {
	cooling = true;
	yield WaitForSeconds(time);
	cooling = false;
}

function Move () {
	var dist : float = scrGame.player.transform.position.x - transform.position.x;
	if (shots > 0) {
		if (dist * Mathf.Sign(dist) >= 0.01 && !cooling) {
			transform.position.x += moveSpeed * Mathf.Sign(dist) * Time.deltaTime;
		}
		else if (!cooling){
			Shoot();
		}
	}
	
	else if (!cooling){
		MoveOut();
	}
}

function Shoot () {
	var obj = GameObject.Instantiate(Resources.Load("Prefabs/objBullet")) as GameObject;
	obj.transform.position = gameObject.transform.position;
	shots--;
	Cooldown(cooldown);
}

function MoveOut () {
	transform.Translate(Vector3.right * moveSpeed * 2 * Time.deltaTime * Mathf.Sign(transform.position.x));
}

function Die () {
	scrGame.ufoCounter++;
	Destroy(gameObject);
}





