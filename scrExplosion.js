#pragma strict

private var anim: Animation;

function Start () {
	anim = GetComponent.<Animation>();
	Destroy (gameObject, anim.clip.length);
}
