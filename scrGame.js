#pragma strict

static var screenWidth : float = 4.8;
static var screenHeight : float = 3.2;

static var bombCounter : int = 0;
static var grenadeCounter : int = 0;
static var rocketCounter : int = 0;
static var weightCounter : int = 0;
static var ufoCounter : int = 0;

static var score : int = 0;
static var lives : int = 0;
static var coins : int = 0;
static var level : int = 0;

static var player : GameObject;
static var background : GameObject;
static var cam : GameObject;
static var levelManager : GameObject;

// Menu items
public var buttonPlay : GameObject;
public var header : GameObject;


function Start () {
	//CreateMenu();
	
	cam = GameObject.FindWithTag("MainCamera");

	yield WaitForSeconds(0);
	CreateLevel(0);
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
	
	if (Input.GetKey(KeyCode.G)) {
		Application.Quit();
	}
	
}

function CreateWeapon (name : String, speed : float) {
	var rand : float = Random.value;
	if (speed > rand) {
		var obj = GameObject.Instantiate(Resources.Load("Prefabs/" + name)) as GameObject;
	}
}

function ResetLevelParam () {
	/*
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
	*/
	
	lives = 3;
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

function CreateLevel (level : int) {

	//ResetLevelParam();
	// creating level items
	//background = GameObject.Instantiate(Resources.Load("Prefabs/objGround")) as GameObject;
	levelManager = GameObject.Instantiate(Resources.Load("Prefabs/conLevels")) as GameObject;
	player = GameObject.Instantiate(Resources.Load("Prefabs/objGiraffe")) as GameObject;
	GameObject.Instantiate(Resources.Load("Prefabs/conGui"));

}

function CreateMenu () {
	header = GameObject.Instantiate(Resources.Load("Prefabs/Menu/objHeaderText")) as GameObject;
	buttonPlay = GameObject.Instantiate(Resources.Load("Prefabs/Menu/objButtonPlay")) as GameObject;
}


