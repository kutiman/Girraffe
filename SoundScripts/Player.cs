using UnityEngine;
using System.Collections;

public class Player : MonoBehaviour {

	private float moveSpeed = 2.4f;
	private float originalScale = 0.2f;
	private float screenWidth = 4.8f;
	private float screenHeight = 3.2f;
	private GameObject item;
	private Transform factoryTransform;
	
	private GameObject manager;
	public GameObject shard;
	private Transform trash;
	
	// Shooting values ########################################
	public GameObject bulletObject;
	public float reloadSpeed = 0.5f;
	private float lastShot = 0f;
	public bool autoShoot = true;
	
	// Hunger end ########################################
	public GameObject healthBar;
	public float initialEnergy = 100f;
	public float currentEnergy;
	public float hungryInSeconds = 3f;
	public int multiplier;

	private float collR;
	
	public AudioSource sound;

	void Awake () {
		manager = GameObject.FindWithTag ("GameController");
	}
	
	void Start () {
		//audio
		trash = GameObject.FindWithTag("Trash").transform;
		sound = gameObject.AddComponent<AudioSource>();
		collR = gameObject.GetComponent<SphereCollider>().radius;
		factoryTransform = GameObject.FindWithTag("tagFactory").transform;
		currentEnergy = initialEnergy;
		GameObject.Instantiate(healthBar);
	}
	
	void Update () {
		multiplier = Mathf.CeilToInt(currentEnergy / initialEnergy);
		//Spin(spinSpeed);
		Move();
		// shoot
		autoShoot = Game.musicPlaying;
		if (autoShoot) {
			Shoot(multiplier);
		}
		UpdateScale();
		GetHungry();
		
		// Debug//////
		if (Input.GetKeyDown(KeyCode.Space)) {
			currentEnergy += 50;
		}
		///////
	}
	
	void Spin (float speed) {
		transform.Rotate(Time.deltaTime * speed, Time.deltaTime * speed, Time.deltaTime * speed);
	}
	
	void Move () {
		if (Input.GetKey (KeyCode.UpArrow) && transform.position.y < screenHeight - collR) {transform.Translate(0, moveSpeed * Time.deltaTime, 0);}
		else if (Input.GetKey (KeyCode.DownArrow) && transform.position.y > -screenHeight + collR) {transform.Translate(0, -moveSpeed * Time.deltaTime, 0);}
		if (Input.GetKey (KeyCode.RightArrow) && transform.position.x < screenWidth - collR) {transform.Translate(moveSpeed * Time.deltaTime, 0, 0);}
		else if (Input.GetKey (KeyCode.LeftArrow) && transform.position.x > -screenWidth + collR) {transform.Translate(-moveSpeed * Time.deltaTime, 0, 0);}
	}

	public void Vacuum () {
		foreach (Transform child in factoryTransform) {
			if (child.gameObject.tag == "EnergyBit") {
				child.gameObject.GetComponent<EnergyBit>().sucked = true;
			}
		}
	}
	
	void UpdateScale () {
		float newScale = originalScale * Mathf.Sqrt((currentEnergy + initialEnergy/2f) / initialEnergy);
		transform.localScale = new Vector3(newScale, newScale, newScale);
	}
	
	void Shoot (int level) {
		if (level < 1) {level = 1;}
		if (Time.time > lastShot + reloadSpeed) {
			lastShot = Time.time;
			GameObject[] bullets = new GameObject[level];
			
			for (var i = 0; i < level; i++) {
				bullets[i] = GameObject.Instantiate(bulletObject, transform.position, Quaternion.identity) as GameObject;
				if (level > 1) {
					float offset = (level * -10f) / 2f + ((level * 10f) / level-1) * i;
					bullets[i].transform.Rotate(new Vector3(0,0,offset));
				}
				bullets[i].transform.parent = manager.transform;			
			}
		}
	}
	
	void GetHungry () {
		if (currentEnergy <= 0f) {
			//die
			Debug.Log("I'm Dead!");
			Destroy(gameObject);
			currentEnergy = 0f;
		}
		else {
			currentEnergy -= hungryInSeconds * Time.deltaTime;
		}
	}
	
	public void BreakToPieces (int pieces) {
		
		for (var i = 0; i < pieces; i++) {
			GameObject obj = GameObject.Instantiate(shard, transform.position, Quaternion.identity) as GameObject;
			obj.GetComponent<SpriteRenderer>().color = gameObject.renderer.material.color;
			if (trash) {
				obj.transform.parent = trash;
			}
		}
	}

	public void TakeDamage (float damage) {
		currentEnergy -= damage;
		BreakToPieces (Mathf.CeilToInt (damage));
	}
}
