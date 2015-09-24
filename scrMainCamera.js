#pragma strict

#pragma strict


public var lightMode : int = 0;
private var spd = 1.0;

function Start () {
	GetComponent(scrMainCamera).lightMode = -1;
	GetComponent(GUITexture).color.a = 1;
}

function Update () {
	Dimmer();
}



function Dimmer () {
	// dims the light when going through screens
	if (lightMode == 1) {
		GetComponent(GUITexture).color.a += Time.deltaTime / spd;

	}
	else if (lightMode == -1) {
		GetComponent(GUITexture).color.a -= Time.deltaTime / spd;
	}
	
	if (lightMode == -1 && GetComponent(GUITexture).color.a <= 0.0) {
		GetComponent(GUITexture).color.a = 0;
		lightMode = 0;
	}
}





