#pragma strict

public var iSpec : int;
public var manager : GameObject;
private var originalYScale : float;

function Awake () {
	originalYScale = transform.localScale.y;
}

function Update () {
	var p : float = 0.01;
	if (iSpec && manager && manager.GetComponent(scrBar).barSizes.Length > iSpec) {
		transform.localScale.y = Mathf.Clamp((manager.GetComponent(scrBar).barSizes[iSpec]), 0.0, 55.0) / 55.0; 
	}
	if (iSpec == 0) {
		transform.localScale.y = 0.0;
	}
}