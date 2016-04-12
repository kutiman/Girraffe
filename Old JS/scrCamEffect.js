#pragma strict


public var lightMode : int = 0;
private var rotateSpeed : float = 100.0;
private var camAlpha : float;
static var camRotating : int = 0;
private var spd = 0.5;

private var guiColor : Color;

function Start () {
	guiColor = gameObject.GetComponent(GUITexture).color;
}

function Update () {

	if (lightMode == 1) {
		guiColor.a = 255 * spd * Time.deltaTime;
	}
	else if (lightMode == -1) {
		guiColor.a = 255 * spd * Time.deltaTime;
	}
}


function CheckRotation () {
	if (camRotating == 1) {
		transform.Rotate(0, 0, Time.deltaTime * rotateSpeed);
		rotateSpeed += rotateSpeed * Time.deltaTime;
	}
	else if (camRotating == -1) {
		transform.Rotate(0, 0, Time.deltaTime * rotateSpeed);
		rotateSpeed -= 100 * Time.deltaTime;
		if (rotateSpeed <= 0) {
			transform.rotation.z = 0;
			camRotating = 0;
		}
	}
}





