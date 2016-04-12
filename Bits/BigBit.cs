using UnityEngine;
using System.Collections;

public class BigBit : Bit {

	public GameObject normalBit;

	private float shotCounter = 0;
	private float shootSpeed = 2f;
	private Vector3 targetPos;

	public override void Start () {

		base.Start();

		shotCounter = shootSpeed;
		speed = 0.5f;
		timeRemaining = lifetime * 3f;
		targetPos = new Vector3 (transform.localPosition.x, Random.Range (-worldSize.y / 2, worldSize.y / 2), transform.localPosition.z);
	}

	public override void Update () {
		base.Update();
		Move ();
		Shoot ();

	}

	void Move () {
		transform.localPosition = Vector3.MoveTowards(transform.localPosition, targetPos, speed * Time.deltaTime);
	}

	void Shoot () {
		if (shotCounter >= shootSpeed) {

			GameObject obj = Instantiate (normalBit, transform.position, Quaternion.identity) as GameObject;
			obj.transform.LookAt(player.transform);
			obj.GetComponent<Bit>().speed = 2f;
			obj.GetComponent<Bit>().iSpec = iSpec;
			obj.GetComponent<SpriteRenderer>().color = this.GetComponent<SpriteRenderer>().color;
			shotCounter = 0;
		}
		else {
			shotCounter += Time.deltaTime;
		}
	}
}
