using UnityEngine;
using System.Collections;

public class Shard : MonoBehaviour {

	Vector2 speed;
	float lifetime = 2f;
	float timeRemaining;
	
	void Start () {
		timeRemaining = lifetime;
		speed = new Vector2(Random.Range(-1f, 1f), Random.Range(-1f, 1f));
//		speed.x = Mathf.Sqrt(1 - Mathf.Pow(speed.y, 2)) * Mathf.Sign(speed.x);
		
		
		//yield WaitForSeconds(2);

	}
	
	void Update () {
		transform.Translate(speed.x * Time.deltaTime, speed.y *  Time.deltaTime, 0);
		
		FadeOut();
	}
	
	void FadeOut () {
		if (timeRemaining <= 0f) {
			Destroy(gameObject);
		}
		else {
			float tempAlpha =(timeRemaining / lifetime)/2f;
			Color tempColor = GetComponent<SpriteRenderer>().color;
			tempColor.a = tempAlpha;
			GetComponent<SpriteRenderer>().color = tempColor;
			
			transform.localScale -= new Vector3(0.1f,0.1f,0) * Time.deltaTime;
		}
		timeRemaining -= Time.deltaTime;
	}
}
