#pragma strict

private var momentum : float = 1.0;
private var gravity : float = 1.5;

function Start () {
	transform.position = Vector2(Random.Range(-scrGame.screenWidth * 0.9, scrGame.screenWidth * 0.9), scrGame.screenHeight * 1.55);
}

function Update () {
	Move();
	
	// going out of frame
	if (transform.position.y < -scrGame.screenHeight * 1.15) {
		Die();
	}
}

function Move () {
	transform.position.y -= momentum * Time.deltaTime;
	momentum += gravity * Time.deltaTime;
}

function Die() {
	gameObject.GetComponent(AudioSource).Stop();
	Destroy(gameObject);
}

