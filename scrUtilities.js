#pragma strict

public function Move (speed : float) {
	var pos = transform.position.x - speed * Time.deltaTime;
	return pos;
}

function Start () {

}

function Update () {

}