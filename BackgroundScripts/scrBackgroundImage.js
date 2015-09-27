#pragma strict

private var moveSpeed : float = -0.3;

function Start () {

}

function Update () {
	transform.Translate(moveSpeed * Time.deltaTime, 0, 0);
	if (transform.localPosition.x <= -12.8) {
		transform.localPosition.x += 25.6;
	}
}