#pragma strict

var levelsAmount : int = 0;
public var bigButtonStyle : GUIStyle;

public var manager : GameObject;
public var cam : GameObject;

function Start () {
	manager = GameObject.FindWithTag("GameController") as GameObject;
	levelsAmount = manager.GetComponent(scrGame).songsList.Length;
}

function Update () {

}

var selGridInt : int = -1;
private var selStrings : String[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15"];

function OnGUI () {
	var nRows = 5;
	/*
	if (levelsAmount < nRows) {nRows = levelsAmount;}
	var btnSize : Vector2 = Vector2(Screen.width/10.0, Screen.width/15.0);
	
	var ancY : float = Screen.height * 0.333;
	var padY : float = 20.0;
	for (var i = 0; i < levelsAmount; i++) {
		var tempX = ((Screen.width / (nRows + 1)) * ((i % nRows) + 1)) - btnSize.x/2;
		var tempY = ancY + Mathf.Floor(i / nRows) * (btnSize.y + padY);
		if (GUI.Button(Rect(tempX, tempY, btnSize.x, btnSize.y), (i+1).ToString(), bigButtonStyle)) {
			scrGame.level = i;
			Application.LoadLevel("Level");
		}
	}
	*/
	selGridInt = GUI.SelectionGrid (Rect (Screen.width * 0.1, Screen.height * 0.3, Screen.width * 0.8, Screen.height * 0.6), -1, selStrings, nRows, bigButtonStyle);
	if (selGridInt >= 0) {
		scrGame.level = selGridInt;
		Application.LoadLevel("level");
	}
}
