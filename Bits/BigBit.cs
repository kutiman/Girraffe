using UnityEngine;
using System.Collections;

public class BigBit : Bit {

	private float shotCounter = 0;
	private float shootSpeed = 2f;
	private Vector3 targetPos;

	public override void Start () {

		base.Start();
		shardsAmount = 20;
		shotCounter = shootSpeed;
		speed = 0.5f;
		timeRemaining = lifetime * 3f;
		targetPos = new Vector3 (transform.localPosition.x, Random.Range (-Game.WorldSize.y / 2, Game.WorldSize.y / 2), transform.localPosition.z);
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

			NormalBit nb = (NormalBit) Instantiate (normalBit, transform.position, Quaternion.identity);
			nb.gameObject.tag = "BitBullet";
			nb.transform.parent = trash;

			if (player) nb.transform.Rotate(new Vector3(0, 0, Utilities.AngleCalc(transform.position, player.transform.position)));
			nb.InitValues(3f, iSpec, 0.5f, 2f);
			nb.GetComponent<SpriteRenderer>().color = this.GetComponent<SpriteRenderer>().color;
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
