#pragma strict

public var speed : float = 1.0;
public var direction = "down";
public var itemType : int = 0;

public var mats : Material[] = new Material[4];

function Start () {
	GetComponent(MeshRenderer).material = mats[itemType];
	gameObject.transform.localScale *= 1 + ((itemType * 1.0) / 5);
}

function Update () {
	switch (direction) {
		case "down":
			transform.position.y -= speed * Time.deltaTime;
			break;
	}
	
	if (transform.position.y < -scrGame.screenHeight * 1.05) {
		Destroy(gameObject);
	}
}

