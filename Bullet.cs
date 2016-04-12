using UnityEngine;
using System.Collections;

public class Bullet : MonoBehaviour {

	public float speed = 3f;
	private float lifetime = 4f;
	
	void Start () {
		//yield WaitForSeconds(lifetime);
		//Destroy(gameObject);
	}
	void FixedUpdate () {
		MoveUp();
		if (transform.position.y > Game.worldSize.y * 1.1) {
			Destroy(gameObject);
		}
	}
	
	void MoveUp () {
		transform.Translate(Vector3.up * speed * Time.deltaTime);
	}

	public void OnTriggerStay(Collider coll) {
		Bit scr = coll.GetComponent<Bit>();
		switch (coll.gameObject.tag) {
			case "NormalBit":
				coll.GetComponent<NormalBit>().BreakToPieces(4);
				Debug.Log ("Killed Normal");
				Destroy(coll.gameObject);
				Game.flakesCount[0] += 1;
				Destroy(gameObject);
				break;
				
			case "tagSpecial":
				if (scr) {scr.BreakToPieces(4);}
				Destroy(coll.gameObject);
				Destroy(gameObject);
				break;
				
			case "FollowBit":
				if (scr) {scr.BreakToPieces(6);}
				Destroy(coll.gameObject);
				Game.flakesCount[1] += 1;
				Destroy(gameObject);
				break;
		}
	}

}
