#pragma strict

var duration : float = 0.5;
var momentum : float = 1.0;

function Start () {
	yield WaitForSeconds(duration);
	Destroy(gameObject);
}

function Update () {
	CamEffect();
}

function CamEffect () {
	var cam : GameObject = GameObject.FindWithTag("MainCamera");
	var fromSize : float = 3.2;

	if (cam.GetComponent(Camera).orthographicSize > 0) {
		cam.GetComponent(Camera).orthographicSize += ((fromSize * Time.deltaTime) / duration) * momentum;
		momentum += Time.deltaTime * 10;
	}
}