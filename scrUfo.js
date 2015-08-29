#pragma strict

private var enteringFrom : float;
private var moveSpeed : float = 1.5;
private var cooldown : float = 2.0;
private var cooling : boolean = false;
private var shots : int = 3;

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
}

function Cooldown (time : float) {
	cooling = true;
	yield WaitForSeconds(time);
	cooling = false;
}

function Move () {
	var dist : float = scrGame.player.transform.position.x - transform.position.x;
	if (dist * Mathf.Sign(dist) >= 0.01 && !cooling) {
		transform.position.x += moveSpeed * Mathf.Sign(dist) * Time.deltaTime;
	}
	else {
		Shoot();
	}
}

function Shoot () {
	
	
	Cooldown(cooldown);
}
	