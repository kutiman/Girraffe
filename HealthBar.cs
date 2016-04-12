using UnityEngine;
using System.Collections;

public class HealthBar : MonoBehaviour {

	public GameObject player;
	public Player playerScript;
	private float initialEnergy;
	public float currentEnergy;
	public Transform filler;
	public TextMesh tm; // the multiplier text
	
	void Awake () {
		// get the filler
		filler = transform.GetChild(0);
		tm = transform.GetChild(1).GetComponent<TextMesh>();
		//	initialEnergy = player.GetComponent(scrPlayer).initialEnergy;
	}
	
	void Update () {
		int n = Mathf.CeilToInt(currentEnergy/initialEnergy);
		tm.text = "X" + n.ToString();
		if (player) {
			currentEnergy = playerScript.currentEnergy;
			if (currentEnergy < 0f) {currentEnergy = 0f;}
			filler.transform.localScale = new Vector3((currentEnergy % initialEnergy) / initialEnergy, 0, 0);
		}
		else {
			player = GameObject.FindWithTag("tagPlayer");
			if (player) {
				playerScript = player.GetComponent<Player>();
				initialEnergy = playerScript.initialEnergy;
			}
			else {
				Destroy(gameObject);
			}
		}
	}
}
