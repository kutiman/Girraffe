using UnityEngine;
using System.Collections;

public class QvintBit : Bit {
	
	private float shotCounter = 0;
	private float shootSpeed = 3f;
	private Vector3 targetPos;
	
	public override void Start () {
		
		base.Start();
		shardsAmount = 30;
		shotCounter = shootSpeed;
		speed = 0.4f;
		lifetime = 5f;
		timeRemaining = lifetime * 5f;
		targetPos = new Vector3 (transform.localPosition.x, Random.Range (-Game.WorldSize.y / 2, Game.WorldSize.y / 2), transform.localPosition.z);
	}
	
	public override void Update () {
		base.Update();
		Move ();
		shotCounter = ShootCircular (5, 1f, 2f, 0.4f, 20f, shootSpeed, shotCounter);
	}
	
	void Move () {
		transform.localPosition = Vector3.MoveTowards(transform.localPosition, targetPos, speed * Time.deltaTime);
	}
	

	void OnTriggerEnter (Collider coll) {
		if (coll.gameObject.tag == "NormalBit") {
			timeRemaining += coll.GetComponent<Bit>().timeRemaining/10;
			Destroy (coll.gameObject);
		}
	}
}
