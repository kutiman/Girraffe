using UnityEngine;
using System.Collections;

public class Bit : MonoBehaviour {

	public Player player;
	public GameObject shard;
	public Transform trash;
	public NormalBit normalBit;
	
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
		GameObject playerObj = (GameObject) GameObject.FindWithTag("tagPlayer");
		if (playerObj) player = playerObj.GetComponent<Player> ();
	}

	public virtual void Update () {
		FadeOut();
		CheckBounds();
	}

	public void InitValues (float mySpeed, int myISpec, float scaleMod) {
		speed = mySpeed;
		iSpec = myISpec;
		myScale = scaleMod;
	}
	public void InitValues (float mySpeed, int myISpec, float scaleMod, float myLifetime) {
		speed = mySpeed;
		iSpec = myISpec;
		myScale = scaleMod;
		lifetime = myLifetime;
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

	public float ShootCircular (int amount, float costPerShot, float bulletSpeed, float bulletScale, float bulletLiftime, float sSpeed, float sCounter) {
		if (sCounter >= sSpeed) {
			
			for (int i = 0; i < amount; i++) {
				NormalBit nb = (NormalBit) Instantiate (normalBit, transform.position, Quaternion.identity);
				nb.gameObject.tag = "BitBullet";
				nb.transform.parent = trash;
				nb.transform.Rotate(new Vector3(0, 0, 360f / amount * i));
				nb.InitValues(bulletSpeed, iSpec, bulletScale, bulletLiftime);
				nb.GetComponent<SpriteRenderer>().color = this.GetComponent<SpriteRenderer>().color;
			}
			timeRemaining -= costPerShot;
			sCounter = 0;
		}
		else {
			sCounter += Time.deltaTime;
		}
		return sCounter;
	}
}




