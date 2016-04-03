#pragma strict

var levelsAmount : int = 0;

public var manager : GameObject;
public var buttonObject : GameObject;

function Awake () {
	manager = GameObject.FindWithTag("GameController") as GameObject;
	levelsAmount = manager.GetComponent(scrGame).songsList.Length;
}

function Start () {
	CreateLevelButtons();
}

function CreateLevelButtons () {
	var w : float = scrGame.screenWidth;
	var h : float = scrGame.screenHeight;
	var btnSize : Vector3;
	var pad : float = 0.05;
	if (buttonObject) {
		if (buttonObject.GetComponent(BoxCollider)) {
			btnSize = buttonObject.GetComponent(BoxCollider).size;
		}
	}
	
	var ancY : float = h - (h * 2 * 0.4);
	var nRows : float = 4;
	if (nRows > levelsAmount) {nRows = levelsAmount;}
	
	for (var i = 0; i < levelsAmount; i++) {
		var tempX : float = -w + ((w*2.0) / (nRows + 1)) * ((i % nRows) + 1);
		var tempY : float = ancY - Mathf.Floor(i / nRows) * (btnSize.y + btnSize.y * pad);
		
		var btn : GameObject = GameObject.Instantiate(buttonObject, Vector3(tempX, tempY, 0), Quaternion.identity);
		btn.GetComponent(scrButton).buttonType = "Level";
		btn.GetComponent(scrButton).levelNumber = i;
	}
}
