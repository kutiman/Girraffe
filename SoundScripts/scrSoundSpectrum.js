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
public var gravity : float = 0.1; // the decline rate for the machine




function Tryout() {
	var i: int = 1;
	while ( i < iSamples-1 ) {
		Debug.DrawLine(new Vector3(i - 1, spectrum[i] + 10, 0), new Vector3(i, spectrum[i + 1] + 10, 0), Color.red);
		Debug.DrawLine(new Vector3(i - 1, Mathf.Log(spectrum[i - 1]) + 10, 2), new Vector3(i, Mathf.Log(spectrum[i]) + 10, 2), Color.cyan);
		Debug.DrawLine(new Vector3(Mathf.Log(i - 1), spectrum[i - 1] - 10, 1), new Vector3(Mathf.Log(i), spectrum[i] - 10, 1), Color.green);
		Debug.DrawLine(new Vector3(Mathf.Log(i - 1), Mathf.Log(spectrum[i - 1]), 3), new Vector3(Mathf.Log(i), Mathf.Log(spectrum[i]), 3), Color.yellow);
		i++;
	}
}







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
	// clamp speed modifier between two numbers
	itemSpeed = Mathf.Clamp(itemSpeed,0,10);
	if (gravity < 0) {
		gravity = 0;
	}
	spectrum = audioSource.GetSpectrumData(iSamples, 0, FFTWindow.BlackmanHarris);
	UpdateHazardMachine();
	Tryout();
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
		var eff : float = 100.0;
		var posY = (((scrGame.screenHeight*2) / eff) * Mathf.Clamp(spectrum[i]*(eff+i*i),0,eff));
		if (posList[i] <= posY) {
			posList[i] = posY;
			if (posList[i] > tolerance &&  Time.time >= waitTime + lastItemTime[i]) {
				var tempItem : GameObject; // 
				var posX : float = goTransform.position.x - scrGame.screenWidth + itemSize * i  + itemSize/2;
				tempItem = Instantiate(item, new Vector3(posX, scrGame.screenHeight + itemSize/2, goTransform.position.z),Quaternion.identity);
				tempItem.transform.parent = goTransform;
				tempItem.GetComponent(scrDroppingItem).speed = (0.2 + (posY/1.5)) * itemSpeed;
				tempItem.GetComponent(scrDroppingItem).iSpec = i;
				var newScale : float = tempItem.GetComponent(scrDroppingItem).originalScale / 2 * (1 / (3.0 - posList[i]));
				tempItem.transform.localScale = Vector2(newScale, newScale);
				var n = new Random.Range(0.0,1.0);
				if (n > 0.94) {
					n = new Random.Range(0.0,1.0);
					if (n > 0.55) {
						n = new Random.Range(0.0,1.0);
						if (n > 0.95) {
							tempItem.GetComponent(scrDroppingItem).itemType = 3;
						}
						else {
							tempItem.GetComponent(scrDroppingItem).itemType = 2;
						}
					}
					else {
						tempItem.GetComponent(scrDroppingItem).itemType = 1;
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
