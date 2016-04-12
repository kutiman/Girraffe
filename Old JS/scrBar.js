#pragma strict

public var barObject : GameObject;
public var barsList : GameObject[] = new GameObject[64];

public var barSizes : float[] = new float[64];
public var ancPos : float;

public var equalizer : GameObject;

static var unitHeight : float = 1.61;

function Start () {
	
	barsList = CreateBars(64);
}

function Update () {
	if (equalizer) {
		barSizes = equalizer.GetComponent(scrSpec).ampList;
	}
}

function CreateBars (amount : int) {
	var w : float = scrGame.screenWidth;
	var h : float = scrGame.screenHeight;
	var tempList : GameObject[] = new GameObject[amount];
	//var eff : float = 10.6667
	for (var i = 0; i < amount; i++) {
		var pos : Vector3 = Vector3(-4.8 + i*(4.8/32.0), h, 0.0);
		tempList[i] = GameObject.Instantiate(barObject) as GameObject;
		tempList[i].transform.position = pos;
		tempList[i].transform.parent = gameObject.transform;
		tempList[i].GetComponent(scrBarUnit).iSpec = i;
		tempList[i].GetComponent(scrBarUnit).manager = gameObject;
	}
	return tempList;
}




