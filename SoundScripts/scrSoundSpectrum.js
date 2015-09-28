#pragma strict

private var iSamples : int = 64;
var audioSource: AudioSource;
static var spectrum : float[];
static var posList : float[];
var lastItem : float[];
var cubesTransform : Transform[];
var goTransform : Transform;
public var cube : GameObject;

var cubeSize : float;

public var gravity : float = 0.1;

var samples : float[,] = new float[iSamples,3];

function Start() {
	
	goTransform = GetComponent(Transform);
	audioSource = GetComponent.<AudioSource>();
	spectrum = new float[iSamples];
	posList = new float[iSamples];
	lastItem = new float[iSamples];
	cubesTransform = new Transform[iSamples];
	
	cubeSize = (scrGame.screenWidth * 2) / spectrum.length;
	
	for (var i = 0; i < samples.GetLength(0); i++) {
		for (var n = 0; n < samples.GetLength(1); n++) {
			samples[i,n] = 0.0;
		}
	}
	CreateHazardMachine();
	
	
}

function Update () {
	if (gravity < 0) {
		gravity = 0;
	}
	spectrum = audioSource.GetSpectrumData(iSamples, 0, FFTWindow.BlackmanHarris);
	UpdateHazardMachine();
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
	
	for (var i = 0; i < spectrum.length; i++) {
		tempCube = Instantiate(cube, new Vector3(goTransform.position.x - scrGame.screenWidth + cubeSize * i  + cubeSize/2, goTransform.position.y, goTransform.position.z),Quaternion.identity);
		cubesTransform[i] = tempCube.GetComponent(Transform);
		cubesTransform[i].position.y = -scrGame.screenHeight;

		cubesTransform[i].parent = goTransform;
		
		
	}
}

function CreateHazardMachine () {
	// for the start function
	for (var i = 0; i < spectrum.length; i++) {
		posList[i] = -scrGame.screenHeight;		
	}
}

function UpdateCubes () {
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

function UpdateMountains () {

	for (var i = 0; i < spectrum.length; i++) {
		var posY = -scrGame.screenHeight + ((6.4 / 50) * Mathf.Clamp(spectrum[i]*(50+i*i),0,50.0));
		if (cubesTransform[i].position.y <= posY) {
			cubesTransform[i].position.y = posY;
		}
		else /*if (cubesTransform[i].localScale.y > 0)*/{
			cubesTransform[i].position.y -= gravity * Time.deltaTime;
		}
	}
}

function UpdateHazardMachine () {
	
	var waitTime : float = 0.2;
	
	for (var i = 0; i < spectrum.length; i++) {
		var posY = ((6.4 / 50) * Mathf.Clamp(spectrum[i]*(50+i*i),0,50.0));
		if (posList[i] <= posY) {
			posList[i] = posY;
			if (posList[i] > 0.3 &&  Time.time >= waitTime + lastItem[i]) {
				var tempCube : GameObject;
				var pos1 : float = goTransform.position.x + (Mathf.Floor(i/2.0) * (1.0 - (i % 2) * 2) * cubeSize);
				var pos2 : float = goTransform.position.x - scrGame.screenWidth + cubeSize * i  + cubeSize/2;
				tempCube = Instantiate(cube, new Vector3(pos2, scrGame.screenHeight + cubeSize/2, goTransform.position.z),Quaternion.identity);
				tempCube.transform.parent = goTransform;
				tempCube.GetComponent(scrDroppingItem).speed = 0.2 + (posY/1.5);
				tempCube.GetComponent(scrDroppingItem).iSpec = i;
				var newScale : float = tempCube.GetComponent(scrDroppingItem).originalScale / 2 * (1 / (3.0 - posList[i]));
				tempCube.transform.localScale = Vector2(newScale, newScale);
				var n = new Random.Range(0.0,1.0);
				if (n > 0.94) {
					n = new Random.Range(0.0,1.0);
					if (n > 0.55) {
						n = new Random.Range(0.0,1.0);
						if (n > 0.95) {
							tempCube.GetComponent(scrDroppingItem).itemType = 3;
						}
						else {
							tempCube.GetComponent(scrDroppingItem).itemType = 2;
						}
					}
					else {
						tempCube.GetComponent(scrDroppingItem).itemType = 1;
					}
					
				}
				lastItem[i] = Time.time;
			}
				
		}
		else /*if (cubesTransform[i].localScale.y > 0)*/{
			posList[i] -= gravity * Time.deltaTime;
		}
	}
}



