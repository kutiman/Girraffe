#pragma strict

function Start () {
	Level3();
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
	
	CreateHazard("objGrenade", 15, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objGrenade", 20, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objRocket", 5, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objRocket", 10, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objRocket", 15, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objSmokeGrenade", 2, 1);
	yield WaitForSeconds(2);
	CreateHazard("objBomb", 10, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objBomb", 10, 10);
	CreateHazard("objRocket", 5, 10);
	yield WaitForSeconds(13);
	
	CreateHazard("objBomb", 15, 10);
	CreateHazard("objGrenade", 5, 10);
	yield WaitForSeconds(18);
	
	CreateHazard("objBomb", 15, 10);
	CreateHazard("objGrenade", 5, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objWeight", 10, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objWeight", 15, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objWeight", 20, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objWeight", 10, 10);
	CreateHazard("objRocket", 10, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objWeight", 5, 10);
	CreateHazard("objRocket", 5, 10);
	CreateHazard("objGrenade", 5, 10);
	CreateHazard("objBomb", 5, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objWeight", 10, 10);
	CreateHazard("objRocket", 10, 10);
	CreateHazard("objGrenade", 10, 10);
	CreateHazard("objBomb", 10, 10);
	yield WaitForSeconds(15);
}

function Level2 () {
	CreateHazard("objUfo", 1, 1);
	yield WaitForSeconds(15);
	
	CreateHazard("objUfo", 3, 3);
	yield WaitForSeconds(15);
	
	CreateHazard("objUfo", 3, 3);
	CreateHazard("objSmokeGrenade", 2, 2);
	yield WaitForSeconds(15);
	
}

function Level3 () {
	yield WaitForSeconds(3);
	
	CreateHazard("objUfo", 3, 3);
	CreateHazard("objBomb", 5, 10);
	CreateHazard("objRocket", 5, 10);
	CreateHazard("objGrenade", 5, 10);
	CreateHazard("objWeight", 5, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objUfo", 6, 6);
	CreateHazard("objBomb", 10, 10);
	CreateHazard("objRocket", 10, 10);
	CreateHazard("objGrenade", 10, 10);
	CreateHazard("objWeight", 10, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objUfo", 10, 10);
	CreateHazard("objBomb", 15, 10);
	CreateHazard("objRocket", 15, 10);
	CreateHazard("objGrenade", 15, 10);
	CreateHazard("objWeight", 15, 10);
	yield WaitForSeconds(15);
	
	CreateHazard("objUfo", 10, 10);
	CreateHazard("objSmokeGrenade", 1, 9);
	CreateHazard("objBomb", 15, 10);
	CreateHazard("objRocket", 15, 10);
	CreateHazard("objGrenade", 15, 10);
	CreateHazard("objWeight", 15, 10);
	yield WaitForSeconds(15);
	
}



