using UnityEngine;
using System.Collections;

public class NormalBit : Bit {


	public override void Update () {
		base.Update();
		Move ();
	}

	void Move () {
		transform.Translate (Vector3.down * Time.deltaTime * speed);
	}

	public void ChangeToObject (GameObject objectToCreate) {
		GameObject obj = Instantiate (objectToCreate, transform.position, Quaternion.identity) as GameObject;
		obj.GetComponent<Bit> ().timeRemaining = timeRemaining;
		obj.GetComponent<Bit> ().iSpec = iSpec;
		Destroy (gameObject);
	}
}
