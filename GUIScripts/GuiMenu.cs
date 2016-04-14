using UnityEngine;
using System.Collections;

public class GuiMenu : MonoBehaviour {

	public GameObject textObject;
	public Color textColor;
	/////
	string introLabel = (
		"A small experiment with sound. \n" + 
		"The objects are created by the velocity of each frequency band. \n" +
		"Try to catch them. Move with the arrow keys.");
	// buttons
	
	void Start () {
		if (textObject) {
			GameObject obj = GameObject.Instantiate(textObject, new Vector3(0, -Game.WorldSize.y * 0.55f, 0), Quaternion.identity) as GameObject;
			obj.GetComponent<TextMesh>().text = introLabel;
			obj.GetComponent<TextMesh>().fontSize = 20;
			obj.GetComponent<TextMesh>().color = textColor;
			obj.transform.parent = gameObject.transform;
		}
	}
}
