#pragma strict

var roundActive : boolean = false;
var round : int = 0;
var roundOneHazards = new ArrayList();

function Start () {
	roundOneHazards.Add(function () { TenBombs(); });
	TenBombs ();
	yield WaitForSeconds(13);
	TwentyBombs ();
	yield WaitForSeconds(11);
	TwentyBombs ();
	TenBombs();
}

function Update () {

}

function CreateHazard (name : String, amount : int) {
	for (var i = 0; i < amount; i++) {
		var obj = GameObject.Instantiate(Resources.Load("Prefabs/" + name)) as GameObject;
	}
}

function StartRound () {
	roundActive = true;
}

function EndRound () {
	round++;
	roundActive = false;
}

// 10 bombs in 10 seconds
function TenBombs () {
	StartRound();
	var n : int = 10;
	for (var i = 0; i < n; i++) {
		CreateHazard("objBomb", 1);
		yield WaitForSeconds(1.0);
	}
}

function TwentyBombs () {
	StartRound();
	var n : int = 20;
	for (var i = 0; i < n; i++) {
		CreateHazard("objBomb", 1);
		yield WaitForSeconds(0.5);
	}
}



