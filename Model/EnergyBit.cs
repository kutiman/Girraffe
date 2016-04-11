using UnityEngine;
using System.Collections;

public class EnergyBit : Bit {
	

	
	public override void Start () {
		base.Start();
		speed = 5f;
	}
	
	public override void Update () {
		base.Update();
		Move ();
	}
	
	void Move () {
		transform.Translate (Vector3.down * Time.deltaTime * speed);
	}
}

