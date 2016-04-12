using UnityEngine;
using System.Collections;

public class GuiLevel : MonoBehaviour {

	int levelsAmount = 0;
	
	public GameObject manager;
	public GameObject buttonObject;
	
	void Awake () {
		manager = GameObject.FindWithTag("GameController") as GameObject;
		levelsAmount = manager.GetComponent<Game>().songsList.Length;
	}
	
	void Start () {
		CreateLevelButtons();
	}
	
	void CreateLevelButtons () {
		float w = Game.worldSize.x;
		float h = Game.worldSize.y;
		Vector3 btnSize = Vector3.one;
		float pad = 0.05f;
		if (buttonObject) {
			if (buttonObject.GetComponent<BoxCollider>()) {
				btnSize = buttonObject.GetComponent<BoxCollider>().size;
			}
		}
		
		float ancY = h - (h * 2f * 0.4f);
		float nRows = 4f;
		if (nRows > levelsAmount) {nRows = levelsAmount;}
		
		for (int i = 0; i < levelsAmount; i++) {
			float tempX = -w + ((w*2f) / (nRows + 1)) * ((i % nRows) + 1);
			float tempY = ancY - Mathf.Floor(i / nRows) * (btnSize.y + btnSize.y * pad);
			
			GameObject btn = GameObject.Instantiate(buttonObject, new Vector3(tempX, tempY, 0), Quaternion.identity) as GameObject;
			btn.GetComponent<Button>().buttonType = "Level";
			btn.GetComponent<Button>().levelNumber = i;
		}
	}

}
