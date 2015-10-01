#pragma strict

var audioSource: AudioSource; // calculate the spectrum of this audio source
var goTransform : Transform; 
var lastItemTime : float[]; // the time when the last item was created

private var iSamples : int = 64; // amount of samples to be calculated in the spectrum
static var spectrum : float[]; // raw spectrum data from the audio source
static var posList : float[];

public var item : GameObject; // the item that will be created by the machine

public var tolerance : float = 0.3; // minimum  level for an item to be created
public var itemSpeed : float = 0.2; // speed modifier for all items
private var itemSize : float; // size of the item created
public var gravity : float = 0.1;

var samples : float[,] = new float[iSamples,3];

function Start() {
	
	goTransform = GetComponent(Transform);
	audioSource = GetComponent.<AudioSource>();
	spectrum = new float[iSamples];
	posList = new float[iSamples];
	lastItemTime = new float[iSamples];

	
	itemSize = (scrGame.screenWidth * 2) / spectrum.length;
	
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

function CreateHazardMachine () {
	// for the start function
	for (var i = 0; i < spectrum.length; i++) {
		posList[i] = -scrGame.screenHeight;		
	}
}


function UpdateHazardMachine () {
	
	var waitTime : float = 0.5;
	
	for (var i = 0; i < spectrum.length; i++) {
		var posY = 6.4 * spectrum[i];//((6.4 / 50) * Mathf.Clamp(spectrum[i]*(50+i*i),0,50.0));
		if (posList[i] <= posY) {
			posList[i] = posY;
			if (posList[i] > tolerance &&  Time.time >= waitTime + lastItemTime[i]) {
				var tempCube : GameObject;
				var pos1 : float = goTransform.position.x + (Mathf.Floor(i/2.0) * (1.0 - (i % 2) * 2) * itemSize);
				var pos2 : float = goTransform.position.x - scrGame.screenWidth + itemSize * i  + itemSize/2;
				tempCube = Instantiate(item, new Vector3(pos2, scrGame.screenHeight + itemSize/2, goTransform.position.z),Quaternion.identity);
				tempCube.transform.parent = goTransform;
				tempCube.GetComponent(scrDroppingItem).speed = (0.2 + (posY/1.5)) * itemSpeed;
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
				lastItemTime[i] = Time.time;
			}
		}
		else /*if (itemsTransform[i].localScale.y > 0)*/{
			posList[i] -= gravity * Time.deltaTime;
		}
	}
}



