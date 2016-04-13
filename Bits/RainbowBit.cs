using UnityEngine;
using System.Collections;

public class RainbowBit : Bit {

	public Color[] myColors;
	public GameObject[] objectsForChange;
	int currentColor = 0;
	float colorChangeSpeed = 1;
	float changeTimer = 0;

	
	public override void Start () {
		base.Start();
		badBit = false;
		speed = 0.5f;
		timeRemaining *= 2;
	}
	
	public override void Update () {
		base.Update();
		Move ();
		ChangeColors ();
	}
	
	void Move () {
		transform.Translate (Vector3.down * Time.deltaTime * speed);
	}

	void ChangeColors () {
		if (changeTimer >= colorChangeSpeed) {
			changeTimer = 0;
			currentColor++;
			if (currentColor >= myColors.Length) currentColor = 0;
		}
		GetComponent<SpriteRenderer>().color = Color.Lerp(GetComponent<SpriteRenderer>().color, myColors[currentColor], colorChangeSpeed * Time.deltaTime*3);
		changeTimer += Time.deltaTime;
	}

	public override void OnTriggerStay(Collider coll) {
		if (coll.gameObject.tag == "tagPlayer") {
			int i = 0;


			GameObject[] normalBits = GameObject.FindGameObjectsWithTag("NormalBit");
			foreach (GameObject obj in normalBits) {
				if (Random.value > 0.7f) i = 1;
				obj.GetComponent<NormalBit>().ChangeToObject(objectsForChange[i]);
				i = 0;
			}
			Destroy (gameObject);
		}
	}
}

