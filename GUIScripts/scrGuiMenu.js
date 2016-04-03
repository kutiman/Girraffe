#pragma strict

public var textObject : GameObject;
public var textColor : Color;
/////
var introLabel : String = (
		"A small experiment with sound. \n" + 
		"The objects are created by the velocity of each frequency band. \n" +
		"Try to catch them. Move with the arrow keys.");
// buttons

function Start () {
	if (textObject) {
		var obj = GameObject.Instantiate(textObject, Vector3(0, -scrGame.screenHeight * 0.55, 0), Quaternion.identity);
		obj.GetComponent(TextMesh).text = introLabel;
		obj.GetComponent(TextMesh).fontSize = 20;
		obj.GetComponent(TextMesh).color = textColor;
		obj.transform.parent = gameObject.transform;
	}
}