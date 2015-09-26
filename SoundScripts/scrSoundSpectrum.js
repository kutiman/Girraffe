#pragma strict

var iSamples : int = 64;
var audioSource: AudioSource;
var spectrum : float[] = new float[iSamples];
static var samples : float[,] = new float[iSamples,3];

function Start() {
	
	audioSource = GetComponent.<AudioSource>();
	
	for (var i = 0; i < samples.GetLength(0); i++) {
		for (var n = 0; n < samples.GetLength(1); n++) {
			samples[i,n] = 0.0;
		}
	}
}

function Update () {
	spectrum = audioSource.GetSpectrumData(iSamples, 0, FFTWindow.Rectangular);	
}

function ShitFunction () {

	for (var i = 0; i < spectrum.Length; i+=1) {
		
		samples[i,0] = samples[i,1];
		samples[i,1] = samples[i,2];
		samples[i,2] = spectrum[i];
		
		if (samples[i,2] < samples[i,1] && samples[i,1] > samples[i,0] && Mathf.Clamp(samples[i,1] * (50+i*i), 0.0, 50.0) > 49.9) {
			var posY = -scrGame.screenHeight + (scrGame.screenHeight*2)/(samples.GetLength(0)) * (i);
			//CreateHazardInPosition("objBomb", posY * 0.95);
		} 	
	}
}