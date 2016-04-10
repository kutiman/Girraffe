#pragma strict

public var player : GameObject;
public var playerScript : scrPlayer;
private var initialEnergy : float;
public var currentEnergy : float;
public var filler : Transform;
public var tm : TextMesh; // the multiplier text

function Awake () {
	// get the filler
	filler = transform.GetChild(0);
	tm = transform.GetChild(1).GetComponent(TextMesh);
//	initialEnergy = player.GetComponent(scrPlayer).initialEnergy;
}

function Update () {
	var n : int = Mathf.Ceil(currentEnergy/initialEnergy);
	tm.text = "X" + n.ToString();
	if (player) {
		currentEnergy = playerScript.currentEnergy;
		filler.transform.localScale.x = (currentEnergy % initialEnergy) / initialEnergy;
	}
	else {
		player = GameObject.FindWithTag("tagPlayer");
		if (player) {
			playerScript = player.GetComponent(scrPlayer);
			initialEnergy = playerScript.initialEnergy;
		}
	}
}