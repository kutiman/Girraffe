#pragma strict

public var player : GameObject;
public var playerScript : scrPlayer;
private var initialEnergy : float;
public var currentEnergy : float;
public var filler : Transform;

function Awake () {
	// get the filler
	filler = transform.GetChild(0);
//	initialEnergy = player.GetComponent(scrPlayer).initialEnergy;
}

function Update () {
	if (player) {
		currentEnergy = playerScript.currentEnergy;
		filler.transform.localScale.x = currentEnergy / initialEnergy;
	}
	else {
		player = GameObject.FindWithTag("tagPlayer");
		playerScript = player.GetComponent(scrPlayer);
		initialEnergy = playerScript.initialEnergy;
	}
}