#pragma strict

var manager : GameObject;

function Start () {
	yield WaitForSeconds(15);
	Destroy(gameObject);
}

function Update () {
	if (manager) {
		transform.position = manager.transform.position;
	}
}