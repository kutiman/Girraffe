using UnityEngine;
using System.Collections;

public class GUI : MonoBehaviour {

	public GameObject objText;
	public Texture[] icons;
	public GameObject buttonObject;
	
	public float vSliderValue = 15f;
	public GUIStyle sliderStyle;
	public GUIStyle thumbStyle;
	
	private int levelStage = 0;
	
	void Start () {
		if (Game.levelStage == 0 && !Game.tutorialPassed){
			ShowTutorial();
		}
		levelStage = 1;
	}
	
	void Update () {
		if (Game.levelStage == 2 && levelStage == 1) {
			levelStage = 2;
		}
	}
	
	
	void OnGUI () {	
		if (Game.levelStage == 1) {
			float iconHeight = Screen.height/15f;
			float pad = 0.02f; //percentage of screen width to use as padding... 
			if (GUI.Button(Rect(Screen.width * (1f - pad) - (iconHeight * (icons[0].width / icons[0].height)), Screen.width * pad, iconHeight * (icons[0].width / icons[0].height), iconHeight), icons[0], GUIStyle.none)) {
				GameObject.FindWithTag("GameController").GetComponent<Game>().ChooseLevel();
			}
		}
		// the slider that controls the frequency tolerance of the factory
		var size : Vector2 = Vector2(Screen.width * 0.02f, Screen.width * 0.2f);
		thumbStyle.fixedHeight = size.y/10f;
		thumbStyle.overflow.left = size.y/20f;
		thumbStyle.overflow.right = size.y/20f;
		vSliderValue = GUI.VerticalSlider (Rect (Screen.width * 0.95f, Screen.height/2f - size.y/2f, size.x, size.y), vSliderValue, 1f, 15f, sliderStyle, thumbStyle);
		GameObject.FindWithTag("tagFactory").GetComponent(Spec).tolerance = vSliderValue;
	}
	
	void RestartPressed () {
		levelStage = 1;
		GameObject.FindWithTag("GameController").GetComponent(Game).Restart();
	}
	
	void ShowTutorial () {
		float waitTime = 2f;
		float ancY = 2f;
		float pad  = Game.worldSize.y / 6f;
		
		string[] tutorialLines = new string[] {
	        "You are a small yellow orb.",
	        "Collect the snowflakes made by the music.",
			"Avoid the red ones."};
		
		GameObject[] objList = new GameObject[tutorialLines.Length];
		
		yield return new WaitForSeconds(waitTime);
		
		for (var i = 0; i < tutorialLines.Length; i++) {
			
			objList[i] = GameObject.Instantiate(objText) as GameObject;
			objList[i].GetComponent<TextMesh>().text = tutorialLines[i];
			objList[i].transform.position = Vector3(0, ancY - (i * pad), 0);
			objList[i].transform.parent = gameObject.transform;
			yield return new WaitForSeconds(waitTime);
		}
		
		Game.tutorialPassed = true;
		foreach (GameObject obj in objList) {
			Destroy(obj.gameObject);
		}
	}

}
