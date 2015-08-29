#pragma strict

static var screenWidth : float = 4.8;
static var screenHeight : float = 3.2;

static var bombGenSpeed : float = 0.0;
static var grenadeGenSpeed : float = 0.0;
static var rocketGenSpeed : float = 0.0;
static var weightGenSpeed : float = 0.0;
static var ufoGenSpeed : float = 0.0;

static var bombCounter : float = 0.0;
static var grenadeCounter : float = 0.0;
static var rocketCounter : float = 0.0;
static var weightCounter : float = 0.0;
static var ufoCounter : float = 0.0;

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
	CreateWeapon("objBomb", bombGenSpeed * Time.time / 120);
	CreateWeapon("objGrenade", grenadeGenSpeed * Time.time / 120);
	CreateWeapon("objRocket", rocketGenSpeed * Time.time / 120);
	CreateWeapon("objWeight", weightGenSpeed * Time.time / 120);
	
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
	score = (bombCounter * 100) + (grenadeCounter * 200) + (rocketCounter * 400);
}



