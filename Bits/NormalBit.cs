﻿using UnityEngine;
using System.Collections;

public class NormalBit : Bit {


	public override void Update () {
		base.Update();
		Move ();
	}

	void Move () {
		transform.Translate (Vector3.down * Time.deltaTime * speed);
	}
}
