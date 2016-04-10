#pragma strict

public var soundEffects : AudioClip[];
public var audioSources : AudioSource[];

function Start () {
	audioSources = new AudioSource[soundEffects.Length];
	for (var i = 0; i < soundEffects.Length; i++) {
		audioSources[i] = gameObject.AddComponent(AudioSource);
		audioSources[i].clip = soundEffects[i] as AudioClip;
	}
}


