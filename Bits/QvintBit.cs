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

			for (int i = 0; i < 5; i++) {
				NormalBit nb = (NormalBit) Instantiate (normalBit, transform.position, Quaternion.identity);
				nb.gameObject.tag = "BitBullet";
				nb.transform.parent = gameObject.transform;
				nb.transform.Rotate(new Vector3(0, 0, 360f / 5f * i));
				nb.InitValues(2f, iSpec, 0.4f, 3f);
				nb.GetComponent<SpriteRenderer>().color = this.GetComponent<SpriteRenderer>().color;

			}
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
