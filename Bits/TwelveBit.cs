using UnityEngine;
using System.Collections;

public class TwelveBit : Bit {
	
	public GameObject normalBit;
	
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
			
			for (int i = 0; i < 12; i++) {
				GameObject obj = Instantiate (normalBit, transform.position, Quaternion.identity) as GameObject;
				obj.gameObject.tag = "BitBullet";
				transform.parent = gameObject.transform;
				obj.transform.Rotate(new Vector3(0, 0, 360f / 12f * i));
				obj.GetComponent<Bit>().speed = 2f;
				obj.GetComponent<Bit>().iSpec = iSpec;
				obj.GetComponent<Bit>().lifetime = 2.5f;
				obj.GetComponent<Bit>().myScale = 0.3f;
				obj.GetComponent<SpriteRenderer>().color = this.GetComponent<SpriteRenderer>().color;
				
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
