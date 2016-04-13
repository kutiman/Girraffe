using UnityEngine;
using System.Collections;

public class Bullet : MonoBehaviour {
	public float speed = 3f;

	private float lifetime;
	public float timeRemaining;

	private float myScale;

	void Start () {
		lifetime = 3f;
		timeRemaining = lifetime;
		myScale = 0.3f;
		timeRemaining = lifetime;
		gameObject.tag = "tagBullet";

		float zMod = Random.Range (-4f, 4f);
		transform.Rotate (new Vector3 (0, 0, zMod));
		float sMod = Random.Range (0.75f, 1.25f);
		speed *= sMod;
	}

	void Update () {
		MoveUp();
		FadeOut();
	}

	void MoveUp () {
		transform.Translate(Vector3.up * speed * Time.deltaTime);
	}

	void FadeOut () {

		if (timeRemaining <= 0f) {
			Destroy(gameObject);
		}
		else {
			float t = timeRemaining / lifetime;
			float newSize =  (myScale * t);
			transform.localScale = new Vector3(newSize, newSize, 1f);
			timeRemaining -= Time.deltaTime;
		}
	}

//	public void OnTriggerStay(Collider coll) {
//		Bit scr = coll.GetComponent<Bit>();
////		switch (coll.gameObject.tag) {
////			case "NormalBit":
////				coll.GetComponent<Bit>().BreakToPieces(4);
////			if (scr) {scr.BreakToPieces(4);}
////				Debug.Log ("Killed Normal");
////				Destroy(coll.gameObject);
////				Game.flakesCount[0] += 1;
////				Destroy(gameObject);
////				break;
////				
////			case "BitBullet":
////				if (scr) {scr.BreakToPieces(4);}
////				Destroy(coll.gameObject);
////				Destroy(gameObject);
////				break;
//				
////			case "FollowBit":
////				if (scr) {scr.BreakToPieces(6);}
////				Destroy(coll.gameObject);
////				Game.flakesCount[1] += 1;
////				Destroy(gameObject);
////				break;
//		}
//	}

}
