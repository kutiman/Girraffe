using UnityEngine;
using System.Collections;

public class Spec : MonoBehaviour {

	public Vector2 worldSize = new Vector2(4.8f, 3.2f);

	AudioSource audioSource; // calculate the spectrum of this audio source
	Transform goTransform; 
	float[] lastItemTime; // the time when the last item was created
	
	private int iSamples = 64; // amount of samples to be calculated in the spectrum
	public static float[] spectrum; // raw spectrum data from the audio source
	public float[] ampList;
	public static float maxVelocity = 100f;
	public bool musicPlaying = false;
	
	public GameObject[] bits;
	public float[] itemChances;
	private float chancesSum;
	
	public GameObject item; // the item that will be created by the machine
	
	public float tolerance = 0.3f; // minimum  level for an item to be created
	public float itemSpeed = 0.2f; // speed modifier for all items
	private float itemSize; // size of the item created
	public float itemScale = 1.2f;
	public float ampDecay = 0.1f; // the decline rate for the machine
	
	void Start() {
		goTransform = GetComponent<Transform>();
		audioSource = GetComponent<AudioSource>();
		spectrum = new float[iSamples];
		ampList = new float[iSamples];
		lastItemTime = new float[iSamples];
		itemSize = (worldSize.x * 2f) / spectrum.Length;
		
		foreach (float n in itemChances) {
			chancesSum += n;
		} 
		
		CreateHazardMachine();
	}
	
	void Update () {
		// check if music is playing
		musicPlaying = GetComponent<AudioSource>().isPlaying;
		// clamp speed modifier between two numbers
		itemSpeed = Mathf.Clamp(itemSpeed,0f,10f);
		if (ampDecay < 0) {
			ampDecay = 0;
		}
		spectrum = audioSource.GetSpectrumData(iSamples, 0, FFTWindow.BlackmanHarris);
		UpdateHazardMachine();
	}
	
	void CreateHazardMachine () {
		for (var i = 0; i < spectrum.length; i++) {
			ampList[i] = -worldSize.x;		
		}
		
	}
	
	
	void UpdateHazardMachine () {
		
		float waitTime = 0.5f;
		
		for (int i = 1; i < spectrum.Length -1; i++) {
			float eff = 15f;
			//		var posY = spectrum[i] * (i*i);
			var posY = Mathf.Sqrt(spectrum[i]) * (i*i) * 0.7f;
			if (ampList[i] <= posY) {
				ampList[i] = posY;
				if (ampList[i] > tolerance &&  Time.time >= waitTime + lastItemTime[i]) {
					GameObject tempItem; 
					float posX = goTransform.position.x - worldSize.x + itemSize * i  + itemSize/2;
					float positionY = worldSize.y - itemSize/2 - (Bar.unitHeight * Mathf.Clamp(ampList[i], 0.0, maxVelocity) / maxVelocity);
					int r = GetRandomItem();
					tempItem = Instantiate(bits[r], new Vector3(posX, positionY, goTransform.position.z),Quaternion.identity);
					tempItem.transform.parent = goTransform;
					tempItem.GetComponent<Bit>().speed = (-0.4 - (Mathf.Log(posY))) * itemSpeed;
					tempItem.GetComponent<Bit>().iSpec = i;
					tempItem.GetComponent<Bit>().myScale = itemScale;
					
					var allItemsList : GameObject[] = new GameObject[transform.childCount];
					
					var p : int = 0;
					for (var child : Transform in transform) {
						allItemsList[p] = child.gameObject;
						var tr = allItemsList[p].GetComponent(Bit).timeRemaining;
						var lt = allItemsList[p].GetComponent(Bit).lifetime;
						if (allItemsList[p].GetComponent(Bit).iSpec == i && tr < lt/2.0) {
							allItemsList[p].GetComponent(Bit).timeRemaining *= 2;
						}
						p++;
					}
					
					lastItemTime[i] = Time.time;
				}
			}
			else {ampList[i]*= 1f - ampDecay * Time.deltaTime;}
		}
	}
	
	int GetRandomItem () {
		var type = 0;
		var r = new Random.Range(0f,1f);
		float tempSum = 0f;
		for (var i = 0; i < itemChances.Length; i++) {
			
			if ((itemChances[i] + tempSum) / chancesSum >= r) {
				return i;
			}
			else {
				tempSum += itemChances[i];
			}
		}
	}

}
