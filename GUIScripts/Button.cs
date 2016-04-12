using UnityEngine;
using System.Collections;

public class Button : MonoBehaviour {

	// button state images 
	public Sprite[] sprites; 	// images of all states of the button
	public string[] typeOfButtons = new string[] {"Play", "Menu", "Level", "Restart", "ChooseLevel"}; // what type of button is this. a level button will also use a levelNumber.
	public string buttonType;
	public GameObject textObject;
	public int levelNumber; // which level to load. only used by level buttons
	private bool pressed = false; // check if the button is presed.
	
	void Awake () {
		if (GetComponent<SpriteRenderer>()) {
			gameObject.GetComponent<SpriteRenderer>().sprite = sprites[0] as Sprite;
		}	
	}
	
	void Start () {
		if (textObject){
			string tempText;
			if (buttonType == "Level") {
				tempText = (levelNumber + 1).ToString();
			}
			else if ((buttonType == "ChooseLevel")){
				tempText = "Continue";
			}
			else {
				tempText = buttonType;
			}
			
			GameObject text = GameObject.Instantiate(textObject) as GameObject;
			text.transform.parent = gameObject.transform;
			text.transform.localPosition = new Vector3(0,0,0);
			text.GetComponent<TextMesh>().text = tempText;
		}
	}
	
	void OnMouseUpAsButton () {
		switch (buttonType) {
		case "Play" :
			GameObject.FindWithTag("tagFader").GetComponent<Fader>().levelToLoad = "ChooseLevel";
			GameObject.FindWithTag("tagFader").GetComponent<Fader>().sceneEnding = true;
			break;
		case "ChooseLevel" :
			GameObject.FindWithTag("GameController").GetComponent<Game>().ChooseLevel();
			break;
		case "Level" :
			Game.level = levelNumber;
			GameObject.FindWithTag("tagFader").GetComponent<Fader>().levelToLoad = "Level";
			GameObject.FindWithTag("tagFader").GetComponent<Fader>().sceneEnding = true;
			break;
		case "Restart" :
			GameObject.FindWithTag("tagFader").GetComponent<Fader>().levelToLoad = "Level";
			GameObject.FindWithTag("tagFader").GetComponent<Fader>().sceneEnding = true;
			break;
		}
	}
	
	void OnMouseDown () {
		pressed = true;
	}
	
	void OnMouseOver () {
		if (pressed && sprites.Length > 2) {
			gameObject.GetComponent<SpriteRenderer>().sprite = sprites[2] as Sprite;
		}
		else {
			gameObject.GetComponent<SpriteRenderer>().sprite = sprites[1] as Sprite;
		}
	}
	
	void OnMouseUp () {
		pressed = false;
	}
	
	void OnMouseExit () {
		gameObject.GetComponent<SpriteRenderer>().sprite = sprites[0] as Sprite;
	}

}
