#pragma strict

var force : float;
var startVelocity : float;
private var rb : Rigidbody;
var startPos : float;
private var waitTime : float = 3.0;

function Start () {
	rb = GetComponent.<Rigidbody>();
	startPos = Random.Range(-1, 1);
	rb.AddRelativeTorque(0, 0, 10 * Mathf.Sign(startPos));
	startVelocity = Random.Range(-5, -10);
	transform.position = Vector3(scrGame.screenWidth * 1.15  * Mathf.Sign(startPos), Random.Range(0, scrGame.screenHeight * 0.9), 0);
	rb.velocity = Vector3(startVelocity * Mathf.Sign(startPos), -startVelocity/2, 0);
	
	StartSmoke();
	
	Destroy(gameObject, 15.0);
}

function Update () {
	if ((transform.position.x <= -scrGame.screenWidth && rb.velocity.x < 0) || (transform.position.x >= scrGame.screenWidth && rb.velocity.x > 0)) {
		rb.velocity.x *= -1;
	}
}

function StartSmoke () {
	
	yield WaitForSeconds(waitTime);
	var obj = GameObject.Instantiate(Resources.Load("Prefabs/parSmoke")) as GameObject;
	if (!obj.GetComponent(scrSmoke).manager){
		obj.GetComponent(scrSmoke).manager = gameObject;
	}
}