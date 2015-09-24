#pragma strict

#pragma strict


public var lightMode : int = 0;
private var spd = 0.5;
private var guiColor : Color;




function Start () {
	guiColor = gameObject.GetComponent(GUITexture).color;
}

function Update () {
	Dimmer();
}




function Dimmer () {
	// dims the light when going through screens
	if (lightMode == 1) {
		guiColor.a = 255 * spd * Time.deltaTime;
		Debug.Log("Working!!!");
	}
	else if (lightMode == -1) {
		guiColor.a = 0 * spd * Time.deltaTime;
	}
}





