using UnityEngine;
using System.Collections;

public class SoundEffects : MonoBehaviour {

	public AudioClip[] soundEffects;
	public AudioSource[] audioSources;
	
	void Start () {
		audioSources = new AudioSource[soundEffects.Length];
		for (int i = 0; i < soundEffects.Length; i++) {
			audioSources[i] = gameObject.AddComponent<AudioSource>();
			audioSources[i].clip = soundEffects[i] as AudioClip;
		}
	}
}
