#pragma strict

static var screenWidth : float = 4.8;
static var screenHeight : float = 3.2;

private var counter : float;
private var bombGenSpeed : float = 2.0;

function Start () {
	counter = Time.time;
}

function Update () {
	bombMachine(bombGenSpeed);
}


function CreateBomb () {

	var obj : GameObject = GameObject.Instantiate(Resources.Load("Prefabs/objBomb"));
	obj.transform.position = Vector2(screenWidth * 1.1, Random.Range(-screenHeight,screenHeight));
}

function bombMachine (speed : float) {
	if (Time.time >= counter + speed) {
		CreateBomb();
		counter = Time.time;
	}
}

