using UnityEngine;
using System.Collections;

public class HealthBar : MonoBehaviour {

	public GameObject player;
	private float initialEnergy;
	public float currentEnergy;
	public Transform filler;
	public TextMesh tm; // the multiplier text
	
	void Awake () {
		// get the filler
		filler = transform.GetChild(0);
		tm = transform.GetChild(1).GetComponent<TextMesh>();
		//	initialEnergy = player.initialEnergy;
	}
	
	void Update () {
		int n = Mathf.CeilToInt(currentEnergy/initialEnergy);
		tm.text = "X" + n.ToString();
		if (player && Game.levelStage == 1) {
			currentEnergy = player.GetComponent<Player>().currentEnergy;
			if (currentEnergy < 0f) {currentEnergy = 0f;}
			Vector3 oldScale = filler.transform.localScale;
			filler.transform.localScale = new Vector3((currentEnergy % initialEnergy) / initialEnergy, oldScale.y, oldScale.z);
		}
		else {
			player = (GameObject) GameObject.FindWithTag("tagPlayer");
			if (player) initialEnergy = player.GetComponent<Player>().initialEnergy;
			else Destroy(gameObject);
		}
	}
}
