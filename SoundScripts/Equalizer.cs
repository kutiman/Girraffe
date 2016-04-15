using UnityEngine;
using System.Collections;

public class Equalizer : MonoBehaviour {
		
	public AudioSource audioSource; // calculate the spectrum of this audio source

	public int bands; // amount of samples to be calculated in the spectrum
	public float[] rawSpectrum; // raw spectrum data from the audio source
	public float[] curedSpectrum; // the spectrum returned
	public float decay; // the decline rate for the machine
	public FFTWindow fftWindowType; // the type of distrubution of something??? dont really know

	void Start() {

		bands = 64;
		decay = 0.1f;
		fftWindowType = FFTWindow.BlackmanHarris;
		rawSpectrum = new float[bands];
		curedSpectrum = new float[bands];
	}
	
	void Update () {
		if (decay < 0) decay = 0;
		UpdateEqualizer();
	}
	
	void UpdateEqualizer() {
		// getting the raw data
		rawSpectrum = audioSource.GetSpectrumData(bands, 0, fftWindowType);

		for (int i = 1; i < rawSpectrum.Length -1; i++) {
			float frqPos = Mathf.Sqrt(rawSpectrum[i]) * (i*i) * 0.7f;
			if (curedSpectrum[i] <= frqPos) {
				curedSpectrum[i] = frqPos;
			}
			else {curedSpectrum[i]*= 1f - decay * Time.deltaTime;}
		}
	}

	//	public Equalizer (AudioSource _audioSource) {
	//		bands = 64;
	//		decay = 0.1f;
	//		fftWindowType = FFTWindow.BlackmanHarris;
	//		audioSource = _audioSource;
	//	}
	//
	//	public Equalizer (int _bands, float _decay, FFTWindow _fftWindowType, AudioSource _audioSource) {
	//		bands = _bands;
	//		decay = _decay;
	//		fftWindowType = _fftWindowType;
	//		audioSource = _audioSource;
	//	}
}
