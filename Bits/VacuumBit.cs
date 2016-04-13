using UnityEngine;
using System.Collections;

public class VacuumBit : Bit {

	public override void Start () {
		base.Start();
		badBit = false;
		speed = 0.5f;
	}
	
	public override void Update () {
		base.Update();
		Move ();
	}
	
	void Move () {
		transform.Translate (Vector3.down * Time.deltaTime * speed);
	}

	public override void OnTriggerStay(Collider coll) {
		if (coll.gameObject.tag == "tagPlayer") {
			player.GetComponent<Player>().Vacuum();
			Destroy (gameObject);
		}
	}
}
