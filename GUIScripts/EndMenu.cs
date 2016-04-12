using UnityEngine;
using System.Collections;

public class EndMenu : MonoBehaviour {

	public GameObject objText;
	public GameObject buttonObject;
	public bool levelWon;
	
	public string[] loseText = new string[] {
	                                  "You are dead.",
	                                  "Try again?"
	                                  };
	
	public string[] winText = new string[] {
	                                 "The music is over.",
	                                 "Congratulations, you are still alive."
	                                 };
	
	void Start() {
		if (levelWon) {GameOverMenu(winText);}
		else {GameOverMenu(loseText);}
	}
	
	public void GameOverMenu(string[] txt) {
		
		float waitTime = 2f;
		float ancY = 2f;
		float pad = Game.worldSize.y / 6f;

		GameObject[] objList = new GameObject[txt.Length];
		
		for (int i = 0; i < txt.Length; i++) {
			objList[i] = GameObject.Instantiate(objText) as GameObject;
			objList[i].GetComponent<TextMesh>().text = txt[i];
			objList[i].transform.position = new Vector3(0, ancY - (i * pad), 0);
			objList[i].transform.parent = gameObject.transform;
			//yield WaitForSeconds(waitTime);
		}
		
		GameObject[] buttons = new GameObject[2];
		
		buttons[0] = GameObject.Instantiate(buttonObject, new Vector3(0, -Game.worldSize.x * 0.3f, 0), Quaternion.identity) as GameObject;
		buttons[0].GetComponent<Button>().buttonType = "ChooseLevel";
		buttons[0].transform.parent = gameObject.transform;
		
		buttons[1] = GameObject.Instantiate(buttonObject, new Vector3(0, -Game.worldSize.x * 0.5f, 0), Quaternion.identity) as GameObject;
		buttons[1].GetComponent<Button>().buttonType = "Restart";
		buttons[1].transform.parent = gameObject.transform;
	}
	
	public void GameOverMenu() {
		
		float waitTime = 2f;
		float ancY = 2f;
		float pad = Game.worldSize.y / 6f;

		string[] endMenuLines = new string[] {
		                               "You are dead.",
		                               "Try again?"
		                               };
		
		GameObject[]objList = new GameObject[endMenuLines.Length];
		
		for (var i = 0; i < endMenuLines.Length; i++) {
			objList[i] = GameObject.Instantiate(objText) as GameObject;
			objList[i].GetComponent<TextMesh>().text = endMenuLines[i];
			objList[i].transform.position = new Vector3(0, ancY - (i * pad), 0);
			objList[i].transform.parent = gameObject.transform;
			//yield WaitForSeconds(waitTime);
		}
		
		GameObject[] buttons = new GameObject[2];
		
		buttons[0] = GameObject.Instantiate(buttonObject, new Vector3(0, -Game.worldSize.x * 0.3f, 0), Quaternion.identity) as GameObject;
		buttons[0].GetComponent<Button>().buttonType = "ChooseLevel";
		buttons[0].transform.parent = gameObject.transform;
		
		buttons[1] = GameObject.Instantiate(buttonObject, new Vector3(0, -Game.worldSize.x * 0.5f, 0), Quaternion.identity) as GameObject;
		buttons[1].GetComponent<Button>().buttonType = "Restart";
		buttons[1].transform.parent = gameObject.transform;
	}
}
