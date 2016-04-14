using UnityEngine;
using System.Collections;

public class HealthBar : MonoBehaviour {

	public Player player;
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
		if (player) {
			currentEnergy = player.currentEnergy;
			if (currentEnergy < 0f) {currentEnergy = 0f;}
			Vector3 oldScale = filler.transform.localScale;
			filler.transform.localScale = new Vector3((currentEnergy % initialEnergy) / initialEnergy, oldScale.y, oldScale.z);
		}
		else {
			player = (Player) GameObject.FindWithTag("tagPlayer").GetComponent<Player>();
			if (player) initialEnergy = player.initialEnergy;
			else Destroy(gameObject);
		}
	}
}
