using UnityEngine;
using System.Collections;

public class EnergyBit : Bit {
	
	public bool sucked = false;
	
	public override void Start () {
		base.Start();
		badBit = false;
		speed = 0.5f + Random.value;

	}
	
	public override void Update () {
		base.Update();

		// moving it towards the player if being sucked
		if (sucked && player) transform.position = Vector3.Lerp(transform.position, player.transform.position, 0.05f + 4f * Time.deltaTime);
		Move ();
	}

	public override void OnTriggerStay(Collider coll) {
		if (coll.gameObject.tag == "tagPlayer") {
			player.currentEnergy += 20f;
			Destroy (gameObject);
		}
	}
	
	void Move () {
		transform.Translate (Vector3.down * Time.deltaTime * speed);
	}
}

