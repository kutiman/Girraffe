using UnityEngine;
using System.Collections;

public class Factory : MonoBehaviour {

	AudioSource audioSource; // calculate the spectrum of this audio source
	float[] lastItemTime; // the time when the last item was created for each band
	float[] lastCuredSpectrum; // the previous cured spectrum
	
	private int bands = 64; // amount of frequency bands for the spectrum. must be 64, 256, 1024 ...
	public static float maxVelocity = 100f; // highest velocity
	public bool musicPlaying = false;

	public Equalizer equalizer;

	public Bit[] bits; // the bits to create
	public float[] itemChances; // chances for each one of the members to be chosen, relative to the other members

	public float tolerance = 0.3f; // minimum  level for an item to be created
	public float itemSpeed = 0.2f; // speed modifier for all items
	public float itemScale = 1.2f; // scale modifier for the items
	[Range (0.5f, 3f)] public float waitTime = 0.5f;

	private float itemSize; // size of the item created
	
	void Start() {
		audioSource = GetComponent<AudioSource>();
		lastItemTime = new float[bands];
		lastCuredSpectrum = new float[bands];
		if (!equalizer) equalizer = GameObject.FindWithTag ("Equalizer").GetComponent<Equalizer>();
		equalizer.audioSource = this.audioSource;
		itemSize = (Game.WorldSize.x * 2f) / bands;
	}
	
	void Update () {
		// check if music is playing
		musicPlaying = audioSource.isPlaying;
		// clamp speed modifier between two numbers
		itemSpeed = Mathf.Clamp(itemSpeed,0f,10f);

		CreateBits ();
	}

	void CreateBits () {
		for (int i = 1; i < equalizer.curedSpectrum.Length -1; i++) {
			if (lastCuredSpectrum[i] < equalizer.curedSpectrum[i] && equalizer.curedSpectrum[i] > tolerance &&  Time.time >= waitTime + lastItemTime[i]) {
				Bit tempItem; 
				float posX = transform.position.x - Game.WorldSize.x + itemSize * i  + itemSize/2;
				float positionY = Game.WorldSize.y - itemSize/2f - (Bar.unitHeight * Mathf.Clamp(equalizer.curedSpectrum[i], 0f, maxVelocity) / maxVelocity);
				int r = Utilities.GetIntByChance(itemChances);
				tempItem = Instantiate(bits[r], new Vector3(posX, positionY, transform.position.z),Quaternion.identity) as Bit;
				tempItem.transform.parent = transform;
				tempItem.InitValues( (0.2f + (Mathf.Log(equalizer.curedSpectrum[i]))) * itemSpeed, i, itemScale); 

				Bit[] allItemsList = new Bit[transform.childCount];
				// make items bigger during their life if frequency is banging
				int p = 0;
				foreach (Transform child in transform) {
					allItemsList[p] = child.gameObject.GetComponent<Bit>();
					float tr = allItemsList[p].timeRemaining;
					float lt = allItemsList[p].lifetime;
					if (allItemsList[p].iSpec == i && tr < lt/3f) {
						allItemsList[p].timeRemaining *= 2f;
					}
					p++;
				}
				lastItemTime[i] = Time.time;
			}
			lastCuredSpectrum[i] = equalizer.curedSpectrum[i];
		}

	}
}
