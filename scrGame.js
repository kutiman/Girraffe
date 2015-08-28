#pragma strict

static var screenWidth : float = 4.8;
static var screenHeight : float = 3.2;

static var bombGenSpeed : float = 0.0;
static var grenadeGenSpeed : float = 0.0;
static var rocketGenSpeed : float = 0.0;

static var bombCounter : int = 0;
static var grenadeCounter : int = 0;
static var rocketCounter : int = 0;

function Start () {

}

function Update () {

	CreateWeapon("objBomb", bombGenSpeed);
	CreateWeapon("objGrenade", grenadeGenSpeed);
	CreateWeapon("objRocket", rocketGenSpeed);
	
	if (Input.GetKeyDown(KeyCode.Alpha1)) {
		GameObject.Instantiate(Resources.Load("Prefabs/" + "objBomb"));
	}
	if (Input.GetKeyDown(KeyCode.Alpha2)) {
		GameObject.Instantiate(Resources.Load("Prefabs/" + "objGrenade"));
	}
	if (Input.GetKeyDown(KeyCode.Alpha3)) {
		GameObject.Instantiate(Resources.Load("Prefabs/" + "objRocket"));
	}
}

function CreateWeapon (name : String, speed : float) {
	var rand : float = Random.value;
	if (speed > rand) {
		var obj = GameObject.Instantiate(Resources.Load("Prefabs/" + name)) as GameObject;
	}
}





