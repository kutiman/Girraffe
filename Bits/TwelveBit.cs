using UnityEngine;
using System.Collections;

public class TwelveBit : Bit {
		
	private float shotCounter = 0;
	private float shootSpeed = 4f;
	private Vector3 targetPos;
	
	public override void Start () {
		
		base.Start();
		shardsAmount = 100;
		shotCounter = shootSpeed;
		speed = 0.3f;
		lifetime = 4f;
		timeRemaining = lifetime * 6f;
		targetPos = new Vector3 (transform.localPosition.x, Random.Range (-Game.WorldSize.y / 2, Game.WorldSize.y / 2), transform.localPosition.z);
	}
	
	public override void Update () {
		base.Update();
		Move ();
		shotCounter = ShootCircular (12, 1f, 2f, 0.3f, 25f, shootSpeed, shotCounter);
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
