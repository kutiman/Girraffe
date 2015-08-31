#pragma strict

var manager : GameObject;

function Start () {

}

function Update () {
	if (manager) {
		transform.position = manager.transform.position;
	}
}