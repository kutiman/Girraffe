#pragma strict

static var screenWidth : float = 4.8;
static var screenHeight : float = 3.2;

static var bombGenSpeed : float = 0.0;
static var grenadeGenSpeed : float = 0.0;
static var rocketGenSpeed : float = 0.0;
static var weightGenSpeed : float = 0.0;
static var ufoGenSpeed : float = 0.0;

static var bombGenMaxSpeed : float = 0.02;
static var grenadeMaxGenSpeed : float = 0.002;
static var rocketMaxGenSpeed : float = 0.002;
static var weightMaxGenSpeed : float = 0.002;
static var ufoGenMaxSpeed : float = 0.002;

static var bombCounter : int = 0;
static var grenadeCounter : int = 0;
static var rocketCounter : int = 0;
static var weightCounter : int = 0;
static var ufoCounter : int = 0;

static var score : int = 0;
static var lives : int = 0;

static var player : GameObject;

function Start () {
	ResetLevelParam();
	if (!player) {
		player = GameObject.Instantiate(Resources.Load("Prefabs/objGirraffe")) as GameObject;
	}
}

function Update () {

	CalculateScore();
	/*
	CreateWeapon("objBomb", CheckMaxGenSpeed(bombGenSpeed, bombGenMaxSpeed) * Time.time / 120);
	CreateWeapon("objGrenade", CheckMaxGenSpeed(grenadeGenSpeed, grenadeMaxGenSpeed) * Time.time / 120);
	CreateWeapon("objRocket", CheckMaxGenSpeed(rocketGenSpeed, rocketMaxGenSpeed) * Time.time / 120);
	CreateWeapon("objWeight", CheckMaxGenSpeed(weightGenSpeed, weightMaxGenSpeed) * Time.time / 120);
	CreateWeapon("objUfo", CheckMaxGenSpeed(ufoGenSpeed, ufoGenMaxSpeed) * Time.time / 120);
	
	CreateWeapon("objBomb", bombGenMaxSpeed);
	CreateWeapon("objGrenade", grenadeMaxGenSpeed);
	CreateWeapon("objRocket", rocketMaxGenSpeed);
	CreateWeapon("objWeight", weightMaxGenSpeed);
	CreateWeapon("objUfo", ufoGenMaxSpeed);
	*/
	
	if (Input.GetKeyDown(KeyCode.Alpha1)) {
		GameObject.Instantiate(Resources.Load("Prefabs/" + "objBomb"));
	}
	if (Input.GetKeyDown(KeyCode.Alpha2)) {
		GameObject.Instantiate(Resources.Load("Prefabs/" + "objGrenade"));
	}
	if (Input.GetKeyDown(KeyCode.Alpha3)) {
		GameObject.Instantiate(Resources.Load("Prefabs/" + "objRocket"));
	}
	if (Input.GetKeyDown(KeyCode.Alpha4)) {
		GameObject.Instantiate(Resources.Load("Prefabs/" + "objWeight"));
	}
	if (Input.GetKeyDown(KeyCode.Alpha5)) {
		GameObject.Instantiate(Resources.Load("Prefabs/" + "objUfo"));
	}
	if (Input.GetKeyDown(KeyCode.Alpha6)) {
		CreateCoin(1);
	}
}

function CreateWeapon (name : String, speed : float) {
	var rand : float = Random.value;
	if (speed > rand) {
		var obj = GameObject.Instantiate(Resources.Load("Prefabs/" + name)) as GameObject;
	}
}

function ResetLevelParam () {
	
	
	lives = 3;
	
	bombGenSpeed = 0.02;
	grenadeGenSpeed = 0.005;
	rocketGenSpeed = 0.001;
	weightGenSpeed = 0.001;
	ufoGenSpeed = 0.001;

	bombCounter = 0;
	grenadeCounter = 0;
	rocketCounter = 0;
	weightCounter = 0;
	ufoCounter = 0;
}

function CalculateScore () {
	score = (bombCounter * 100) + (grenadeCounter * 200) + (rocketCounter * 400) + (weightCounter * 400) + (ufoCounter * 500);
}

function CheckMaxGenSpeed (speed : float, maxSpeed : float) {
	if (speed > maxSpeed) {
		speed = maxSpeed;
	}
	return speed;
}

static function CreateCoin (amount : int) {
	for (var i = 0; i < amount; i++) {
		GameObject.Instantiate(Resources.Load("Prefabs/" + "objCoin"));
	}
}




