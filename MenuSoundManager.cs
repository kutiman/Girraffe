using UnityEngine;
using System.Collections;

public class MenuSoundManager : MonoBehaviour {

	AudioSource audioSource; // calculate the spectrum of this audio source

	public Equalizer equalizer;
	public Transform header;
	public Transform playButton;
	public float limit = 100f;
	public float waitTime = 1f;
	[Range (0.01f, 0.5f)] public float decay = 1f;
	float buttonCounter = 1f;
	float headerCounter = 0;

	void Start () {
			audioSource = GetComponent<AudioSource>();
			if (equalizer) equalizer.audioSource = this.audioSource;
		
	}
	
	void Update () {
		headerCounter = ResizeByMusic(header, 1f, 10, headerCounter);
		buttonCounter = ResizeByMusic(playButton, 0.5f, 13, buttonCounter);
	}

	public float ResizeByMusic (Transform trans, float originalScale, int iSpec, float counter)
	{
		
		float n = equalizer.curedSpectrum [iSpec];
		if (n > originalScale && counter >= waitTime) {
			n = originalScale * (1f + n / limit * 0.2f);
			if (trans) {
				trans.localScale = new Vector3 (n, n, 1f);
				counter = 0;
			}
		} 
		else {
			counter += Time.deltaTime;
			trans.localScale *= 1f - (decay * Time.deltaTime);
		}
		if (trans.localScale.x < originalScale) {
			trans.localScale = new Vector3(originalScale, originalScale, 1f);
		}
		return counter;
	}
}



