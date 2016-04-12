using UnityEngine;
using System.Collections;

public class EnergyBit : Bit {
	
	public bool sucked = false;
	
	public override void Start () {
		base.Start();
		speed = 1f;
	}
	
	public override void Update () {
		base.Update();
		if (sucked && player) {
			transform.position = Vector3.Lerp(transform.position, player.transform.position, 0.05f + 4f * Time.deltaTime);
		}
		Move ();
	}
	
	void Move () {
		transform.Translate (Vector3.down * Time.deltaTime * speed);
	}
}

