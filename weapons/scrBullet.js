#pragma strict

private var moveSpeed : float = 3.0;

function Start () {

}

function Update () {
	Move();
	if (transform.position.y < -scrGame.screenHeight * 1.15) {
		Die();
	}
}

function Move () {
	transform.Translate(Vector3.down * moveSpeed * Time.deltaTime, Space.World);
}

function Die() {
	Destroy(gameObject);
}