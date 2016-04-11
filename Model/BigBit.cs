using UnityEngine;
using System.Collections;

public class BigBit : Bit {
	private float shootSpeed;
	private Vector3 targetPos;
	private float speed = 0.5f;

	public override void Start () {
		base.Start();
		timeRemaining = lifetime * 3f;
		targetPos = new Vector3 (transform.localPosition.x, Random.Range (-worldSize.y / 2, worldSize.y / 2), transform.localPosition.z);
	}

	public override void Update () {
		base.Update();
		Move ();
	}

	void Move () {
		transform.localPosition = Vector3.MoveTowards(transform.localPosition, targetPos, speed * Time.deltaTime);
	}

	void Shoot () {
		
	}
}
