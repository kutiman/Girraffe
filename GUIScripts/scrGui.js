#pragma strict

private var scoreText : GameObject;
private var livesText : GameObject;

function Start () {
	
	//scoreText = CreateText(Vector3(0.5, 0.96, 0));
	//livesText = LivesText();
}

function Update () {
	//scoreText.GetComponent(GUIText).text = "Score: " + scrGame.score.ToString();
	//livesText.GetComponent(GUIText).text = "Lives: " + scrGame.lives.ToString();
}

public function CreateText (pos : Vector3) {
	var obj = GameObject.Instantiate(Resources.Load("Prefabs/objGuiText")) as GameObject;
	obj.transform.position = pos;
	obj.transform.parent = gameObject.transform;
	return obj;
}

// Debug
function LivesText () {
	var obj = CreateText(Vector3(0.04, 0.96, 0)) as GameObject;
	obj.GetComponent(GUIText).anchor = TextAnchor.UpperLeft;
	obj.GetComponent(GUIText).alignment = TextAlignment.Left;
	obj.GetComponent(GUIText).fontSize = 14;
	return obj;
}