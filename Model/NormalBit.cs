using UnityEngine;
using System.Collections;

public class NormalBit : Bit {
	
	float speed = 2f;

	public override void Start () {
		base.Start();
	}
	
	public override void Update () {
		base.Update();
		Move ();
	}

	void Move () {
		transform.Translate (Vector3.down * Time.deltaTime * speed);
	}
}
