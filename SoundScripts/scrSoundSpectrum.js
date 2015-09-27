#pragma strict

private var iSamples : int = 64;
var audioSource: AudioSource;
static var spectrum : float[];
var cubesTransform : Transform[];
var goTransform : Transform;
public var cube : GameObject;

private var gravity : float = 2.0;

var samples : float[,] = new float[iSamples,3];

function Start() {
	
	goTransform = GetComponent(Transform);
	audioSource = GetComponent.<AudioSource>();
	spectrum = new float[iSamples];
	cubesTransform = new Transform[iSamples];
	
	for (var i = 0; i < samples.GetLength(0); i++) {
		for (var n = 0; n < samples.GetLength(1); n++) {
			samples[i,n] = 0.0;
		}
	}
	CreateCubes();
	
}

function Update () {
	if (gravity < 0) {
		gravity = 0;
	}
	spectrum = audioSource.GetSpectrumData(iSamples, 0, FFTWindow.BlackmanHarris);
	for (var i = 0; i < spectrum.length; i++) {
		var posY = 6.4 / 50 * Mathf.Clamp(spectrum[i]*(50+i*i),0,50.0);
		if (cubesTransform[i].localScale.y <= posY) {
			cubesTransform[i].localScale.y = posY;
		}
		else /*if (cubesTransform[i].localScale.y > 0)*/{
			cubesTransform[i].localScale.y *= 1 - gravity * Time.deltaTime;
		}
	}
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

function CreateCubes () {
	// for the start function
	var tempCube : GameObject;
	var cubeSize = (scrGame.screenWidth * 2) / spectrum.Length;
	
	for (var i = 0; i < spectrum.length; i++) {
		tempCube = Instantiate(cube, new Vector3(goTransform.position.x - scrGame.screenWidth + cubeSize * i  + cubeSize/2, goTransform.position.y, goTransform.position.z),Quaternion.identity);
		cubesTransform[i] = tempCube.GetComponent(Transform);
		cubesTransform[i].parent = goTransform;
		cubesTransform[i].localScale.x = cubeSize * 1;
		cubesTransform[i].localScale.y = 0;
		
	}
}