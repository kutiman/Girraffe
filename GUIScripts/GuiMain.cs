using UnityEngine;
using System.Collections;

public class GuiMain : MonoBehaviour {

	public GameObject objText;
	public Texture[] icons;
	public GameObject buttonObject;
	
	public float vSliderValue = 15f;
	public GUIStyle sliderStyle;
	public GUIStyle thumbStyle;
	
	private int levelStage = 0;
	
	void Start () {
		if (Game.levelStage == 0 && !Game.tutorialPassed){
			StartCoroutine (ShowTutorial());
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

			// TODO: Fix this!!!


			if (GUI.Button(new Rect(Screen.width * (1f - pad) - (iconHeight * (icons[0].width / icons[0].height)), Screen.width * pad, iconHeight * (icons[0].width / icons[0].height), iconHeight), icons[0], GUIStyle.none)) {
				GameObject.FindWithTag("GameController").GetComponent<Game>().ChooseLevel();
			}
		}
		// the slider that controls the frequency tolerance of the factory
		Vector2 size = new Vector2(Screen.width * 0.02f, Screen.width * 0.2f);

		thumbStyle.fixedHeight = (float) size.y/10f;
		//thumbStyle.overflow.left = (int) size.y/20f;
		//thumbStyle.overflow.right = (int) size.y/20f;

		vSliderValue = GUI.VerticalSlider (new Rect (Screen.width * 0.95f, Screen.height/2f - size.y/2f, size.x, size.y), vSliderValue, 1f, 15f, sliderStyle, thumbStyle);
		GameObject.FindWithTag("tagFactory").GetComponent<Factory>().tolerance = vSliderValue;

	}
	
	void RestartPressed () {
		levelStage = 1;
		GameObject.FindWithTag("GameController").GetComponent<Game>().Restart();
	}
	
	IEnumerator ShowTutorial () {
		float waitTime = 3f;
		float ancY = 2f;
		float pad  = Game.WorldSize.y / 6f;
		
		string[] tutorialLines = new string[] {
	        "You are a small yellow orb.",
	        "Use the ARROW KEYS to move in all directions.",
			"Collect the yellow squares, or you will fade out.",
			"Shoot everything else."
		};
		
		GameObject[] objList = new GameObject[tutorialLines.Length];
		yield return new WaitForSeconds(2);
		for (var i = 0; i < tutorialLines.Length; i++) {
			int myFontSize = 30;
			objList[i] = GameObject.Instantiate(objText) as GameObject;
			objList[i].GetComponent<TextMesh>().text = tutorialLines[i];
			objList[i].GetComponent<TextMesh>().fontSize = myFontSize;
			objList[i].transform.position = new Vector3(0, ancY - (i * pad), 0);
			objList[i].transform.parent = gameObject.transform;
			yield return new WaitForSeconds(waitTime);
		}
		
		Game.tutorialPassed = true;
		foreach (GameObject obj in objList) {
			Destroy(obj.gameObject);
		}
	}

}
