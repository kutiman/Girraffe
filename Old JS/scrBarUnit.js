#pragma strict

public var iSpec : int;
public var manager : GameObject;
private var originalYScale : float;
private var maxVelocity : float = 100.0;
// TODO: get the max velocity from a single source, or link it with the bar size, or both

function Awake () {
	originalYScale = transform.localScale.y;
}

function Update () {
	// changing the vertical scale of the bar according to velocity
	if (iSpec && manager && manager.GetComponent(scrBar).barSizes.Length > iSpec) {
		transform.localScale.y = Mathf.Clamp((manager.GetComponent(scrBar).barSizes[iSpec]), 0.0, maxVelocity) / maxVelocity; 
	}
	if (iSpec == 0) {
		transform.localScale.y = 0.0;
	}
}