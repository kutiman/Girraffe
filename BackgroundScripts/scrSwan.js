#pragma strict

public var util : scrUtilities;

private var moveSpeed = 2.0;

function Start () {

}

function Update () {
	transform.position.x -= moveSpeed * Time.deltaTime;
}