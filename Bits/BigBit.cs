using UnityEngine;
using System.Collections;

public class BigBit : Bit {

	public GameObject normalBit;

	private float shotCounter = 0;
	private float shootSpeed = 2f;
	private Vector3 targetPos;

	public override void Start () {

		base.Start();
		shardsAmount = 20;
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
			obj.gameObject.tag = "BitBullet";
			transform.parent = gameObject.transform;

			if (player) obj.transform.Rotate(new Vector3(0, 0, Utilities.AngleCalc(transform.position, player.transform.position)));
			obj.GetComponent<Bit>().speed = 3f;
			obj.GetComponent<Bit>().iSpec = iSpec;
			obj.GetComponent<Bit>().lifetime = 2f;
			obj.GetComponent<SpriteRenderer>().color = this.GetComponent<SpriteRenderer>().color;
			timeRemaining -= 1f;
			shotCounter = 0;
		}
		else {
			shotCounter += Time.deltaTime;
		}
	}

	void OnTriggerEnter (Collider coll) {
		if (coll.gameObject.tag == "NormalBit") {
			timeRemaining += coll.GetComponent<Bit>().timeRemaining/10;
			Destroy (coll.gameObject);
		}
	}


}
