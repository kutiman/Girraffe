using UnityEngine;
using System.Collections;

public class Bit : MonoBehaviour {

	public GameObject player;
	public GameObject shard;
	public GameObject trash;

	public Vector2 worldSize = new Vector2 (4.8f, 3.2f);

	public float speed;
	public int iSpec;
	public float lifetime = 5f;
	public float timeRemaining;
	public float myScale = 0.5f;

	public virtual void Start () {
		timeRemaining = lifetime;
		trash = GameObject.FindWithTag("Trash");
		player = GameObject.FindWithTag("tagPlayer");
	}

	public virtual void Update () {
		FadeOut();
		CheckBounds();
	}

	public void BreakToPieces (int pieces) {
	
		for (int i = 0; i < pieces; i++) {
			GameObject obj = GameObject.Instantiate(shard, transform.position, Quaternion.identity) as GameObject;
			obj.GetComponent<SpriteRenderer>().color = GetComponent<SpriteRenderer>().color;
			if (trash) {
				obj.transform.parent = trash.transform;
			}
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
		float t = timeRemaining / lifetime;
		//gameObject.transform.localScale = new Vector2(myScale * (Mathf.Lerp(0.1f, 1f, t)), myScale * (Mathf.Lerp(0.1f, 1f, t)));
		float root =  (myScale * Mathf.Sqrt( t ));
		gameObject.transform.localScale = new Vector2(root, root);
		timeRemaining -= Time.deltaTime;
		if (timeRemaining <= 0f) {
			Destroy(gameObject);
		}	
	}
}




