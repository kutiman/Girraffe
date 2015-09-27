#pragma strict

private var moveSpeed : float = -1.5;

function Start () {

}

function Update () {
	transform.Translate(moveSpeed * Time.deltaTime, 0, 0);
	if (transform.localPosition.x <= -12.8) {
		transform.localPosition.x += 25.6;
	}
}