#pragma strict

public var speed : float = 1.0;
public var direction = "down";
public var itemType : int = 0;
public var iSpec : int;
private var declineRate : float = 1.5;

private var originalScale : float;

public var mats : Material[] = new Material[4];

function Start () {
	GetComponent(MeshRenderer).material = mats[itemType];
	gameObject.transform.localScale *= 1 + ((itemType * 1.0) / 5);
	originalScale = gameObject.transform.localScale.x;
}

function Update () {
	switch (direction) {
		case "down":
			transform.position.y -= speed * Time.deltaTime;
			break;
	}
	CheckSpectrum();
	if (transform.position.y < -scrGame.screenHeight * 1.05) {
		Destroy(gameObject);
	}
}

function CheckSpectrum () {
	if (scrSoundSpectrum.posList[iSpec] < 6.3) {
		var scl : float = originalScale/2 * (1 / (2.5 - scrSoundSpectrum.posList[iSpec]));
		if (scl > originalScale * 2.0) {scl = originalScale * 2.0;}
		if (scl > gameObject.transform.localScale.x) {
			gameObject.transform.localScale = Vector2(scl, scl);
		}
		else {
			scl = gameObject.transform.localScale.x * (1 - declineRate * Time.deltaTime);
			gameObject.transform.localScale = Vector2(scl, scl);
		}
	}
	
}