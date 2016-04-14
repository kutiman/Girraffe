﻿using UnityEngine;
using System.Collections;

public class Bit : MonoBehaviour {

	public Player player;
	public GameObject shard;
	public Transform trash;


	public Vector2 worldSize = new Vector2 (4.8f, 3.2f);

	public float speed;
	public int iSpec;
	public float lifetime = 5f;
	public float timeRemaining;
	public float myScale = 0.5f;
	public float damageMultiplier = 1f;
	public bool badBit = true;
	public int shardsAmount = 4;

	public virtual void Start () {
		timeRemaining = lifetime;
		trash = GameObject.FindWithTag("Trash").transform;
		player = GameObject.FindWithTag("tagPlayer").GetComponent<Player>();
	}

	public virtual void Update () {
		FadeOut();
		CheckBounds();
	}

	public void BreakToPieces (int pieces) {
	
		for (int i = 0; i < pieces; i++) {
			GameObject obj = GameObject.Instantiate(shard, transform.position, Quaternion.identity) as GameObject;
			obj.GetComponent<SpriteRenderer>().color = GetComponent<SpriteRenderer>().color;
			// putting the shards in the trash parent
			if (trash) obj.transform.parent = trash;
		}
	}

	void CheckBounds () {
		if (Mathf.Abs(transform.position.x) > worldSize.x || Mathf.Abs(transform.position.y) > worldSize.y) {
			Destroy(gameObject);
		}
	}

	void GetSucked (Vector3 toPosition, float speedToTarget) {
		transform.position = Vector3.Lerp(this.transform.position, toPosition, 0.05f + speedToTarget * Time.deltaTime); 
	}
	
	void FadeOut () {

		if (timeRemaining <= 0f) {
			Destroy(gameObject);
		}
		else {
			float t = timeRemaining / lifetime;
			float root =  (myScale * Mathf.Sqrt( t ));
//			float newSize =  (myScale * t);
			gameObject.transform.localScale = new Vector2(root, root);
//			gameObject.transform.localScale = new Vector3(newSize, newSize, 1f);
			timeRemaining -= Time.deltaTime;
		}
	}

	public virtual void OnTriggerStay(Collider coll) {
		if (badBit) {
			if (coll.gameObject.tag == "tagPlayer") {
				player.TakeDamage(timeRemaining * damageMultiplier);
				BreakToPieces(shardsAmount);
				Destroy (gameObject);
			}
			else if (coll.gameObject.tag == "tagBullet") {
				timeRemaining -= coll.GetComponent<Bullet>().timeRemaining;
				Destroy (coll.gameObject);
				if (timeRemaining <= 0f) {
					BreakToPieces(shardsAmount);
					Destroy (gameObject);
				}
			}
		}
	} 
}




