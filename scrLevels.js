#pragma strict

function Start () {
	//ZigZag("objRocket", 150, 150, true);
	//Net("objBomb", 20, 20, 3);
	//yield WaitForSeconds(23);
	//Net("objBomb", 20, 25, 4);
	//yield WaitForSeconds(28);
	//Net("objBomb", 20, 30, 5);
	//yield WaitForSeconds(33);
	
	//Net("objBomb", 5, 20, 6);
	yield WaitForSeconds(3);
	Net("objRocket", 20, 20, 3);
	
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

function ZigZag (name : String, amount : int, waitTime : float, mirror : boolean) {

	var wdth = scrGame.screenWidth;
	var hght = scrGame.screenHeight;
	var rows = 4;
	var indx : int = 0;
	var eff = 1;
	
	for (var i = 0; i < amount; i++) {
		var posY = (hght / rows) * indx;
		var obj = GameObject.Instantiate(Resources.Load("Prefabs/" + name)) as GameObject;
		obj.transform.position.y = posY;
		obj.transform.position.x = wdth * 1.05;
		
		if (mirror && indx != 0) {
			var objMir = GameObject.Instantiate(Resources.Load("Prefabs/" + name)) as GameObject;
			objMir.transform.position.y = posY * -1;
			objMir.transform.position.x = wdth * 1.05;
		}
		
		indx += eff;
		if (indx >= rows || indx <= -rows) {
			indx -= eff * 2;
			eff *= -1;
		}
		yield WaitForSeconds(waitTime / amount);
	}
	
}

function Net (name : String, amount : int, waitTime : float, rows : int) {
	var wdth = scrGame.screenWidth;
	var hght = scrGame.screenHeight;
	
	for (var n : float = 0.0; n < amount; n++) {
		var eff : float = n % 2.0;
		Debug.Log(eff.ToString());
		for (var i = 0; i < rows - eff; i++) {
			var obj = GameObject.Instantiate(Resources.Load("Prefabs/" + name)) as GameObject;
			obj.transform.position.y = hght - (hght/rows) - (((hght * 2)/rows) * i) - (((hght * 2)/rows) * (eff/2)); 
			obj.transform.position.x = wdth * 1.05;
		}
		yield WaitForSeconds(waitTime / amount);
	}
	
	
	
}










