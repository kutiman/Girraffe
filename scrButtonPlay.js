#pragma strict

function Start () {

}

function Update () {

}

function OnMouseDown () {
	
	GameObject.Instantiate(Resources.Load("Prefabs/objCamEffect"));
	yield WaitForSeconds(1);
	Application.LoadLevel("Level");
}

function CamEffect () {
	var cam : GameObject = GameObject.FindWithTag("MainCamera");
	var fromSize : float = 3.2;
	var duration : float = 1.0;
	if (cam.GetComponent(Camera).orthographicSize > 0) {
		cam.GetComponent(Camera).orthographicSize -= (fromSize * Time.deltaTime) / duration;
	}
}