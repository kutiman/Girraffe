#pragma strict

var speed : Vector2;
var lifetime = 2.0;
var timeRemaining : float;

function Start () {
	timeRemaining = lifetime;
	speed = new Vector2(new Random.Range(-1.0, 1.0), new Random.Range(-1.0, 1.0));
	speed.x = Mathf.Sqrt(1 - Mathf.Pow(speed.y, 2)) * Mathf.Sign(speed.x);
	
	
	yield WaitForSeconds(2);
	Destroy(gameObject);
}

function Update () {
	transform.position.y += speed.y * Time.deltaTime;
	transform.position.x += speed.x * Time.deltaTime;
	
	FadeOut();
}

function FadeOut () {
	if (timeRemaining <= 0.0) {
		Destroy(gameObject);
	}
	else {
		var tempAlpha : float = (timeRemaining / lifetime)/2;
		GetComponent(SpriteRenderer).color.a = tempAlpha;
		
		transform.localScale -= Vector3(0.1,0.1,0) * Time.deltaTime;
	}
	timeRemaining -= Time.deltaTime;
}