#pragma strict

function Start () {
	Level1();
}

function Update () {

}

function CreateHazard (name : String, amount : int, duration : float) {
	for (var i = 0; i < amount; i++) {
		var obj = GameObject.Instantiate(Resources.Load("Prefabs/" + name)) as GameObject;
		yield WaitForSeconds(duration / amount);
	}
}

function Level1 () {
	CreateHazard("objBomb", 10, 10);
	yield WaitForSeconds(15);
	CreateHazard("objBomb", 15, 10);
	yield WaitForSeconds(15);
	CreateHazard("objBomb", 20, 10);
	yield WaitForSeconds(15);
	CreateHazard("objGrenade", 10, 10);
	yield WaitForSeconds(15);
	CreateHazard("objRocket", 5, 10);
	yield WaitForSeconds(15);
	CreateHazard("objRocket", 10, 10);
	yield WaitForSeconds(15);
	CreateHazard("objSmokeGrenade", 2, 1);
	yield WaitForSeconds(2);
	CreateHazard("objBomb", 10, 10);
}



