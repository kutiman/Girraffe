#pragma strict

var audioSource: AudioSource; // calculate the spectrum of this audio source
var goTransform : Transform; 
var lastItemTime : float[]; // the time when the last item was created

private var iSamples : int = 64; // amount of samples to be calculated in the spectrum
static var spectrum : float[]; // raw spectrum data from the audio source
static var ampList : float[];

public var item : GameObject; // the item that will be created by the machine

public var tolerance : float = 0.3; // minimum  level for an item to be created
public var itemSpeed : float = 0.2; // speed modifier for all items
private var itemSize : float; // size of the item created
public var itemScale : float = 1.2;
public var ampDecay : float = 0.1; // the decline rate for the machine



function Start() {
	goTransform = GetComponent(Transform);
	audioSource = GetComponent.<AudioSource>();
	spectrum = new float[iSamples];
	ampList = new float[iSamples];
	lastItemTime = new float[iSamples];
	itemSize = (scrGame.screenWidth * 2) / spectrum.length;
	
	CreateHazardMachine();
}

function Update () {
	// clamp speed modifier between two numbers
	itemSpeed = Mathf.Clamp(itemSpeed,0,10);
	if (ampDecay < 0) {
		ampDecay = 0;
	}
	spectrum = audioSource.GetSpectrumData(iSamples, 0, FFTWindow.BlackmanHarris);
	UpdateHazardMachine();
}

function CreateHazardMachine () {
	for (var i = 0; i < spectrum.length; i++) {
		ampList[i] = -scrGame.screenHeight;		
	}
}


function UpdateHazardMachine () {
	
	var waitTime : float = 0.5;
	
	for (var i = 1; i < spectrum.length -1; i++) {
		var eff : float = 1000.0;
		var posY = spectrum[i]*(i*i);
		if (ampList[i] <= posY) {
			ampList[i] = posY;
			if (ampList[i] > tolerance &&  Time.time >= waitTime + lastItemTime[i]) {
				var tempItem : GameObject; // 
				var posX : float = goTransform.position.x - scrGame.screenWidth + itemSize * i  + itemSize/2;
				tempItem = Instantiate(item, new Vector3(posX, scrGame.screenHeight - itemSize/2, goTransform.position.z),Quaternion.identity);
				tempItem.transform.parent = goTransform;
				tempItem.GetComponent(scrDroppingItem).speed.y = (-0.4 - (Mathf.Log(posY))) * itemSpeed;
				tempItem.GetComponent(scrDroppingItem).iSpec = i;
				tempItem.GetComponent(scrDroppingItem).myScale = itemScale;
				
				var allItemsList : GameObject[] = new GameObject[transform.childCount];

				var p : int = 0;
				for (var child : Transform in transform) {
					allItemsList[p] = child.gameObject;
					if (allItemsList[p].GetComponent(scrDroppingItem).iSpec == i) {
						allItemsList[p].GetComponent(scrDroppingItem).myScale = itemScale;
					}
						p++;
				}
				
				var n = new Random.Range(0.0,1.0);
				if (n > 0.94) {
					n = new Random.Range(0.0,1.0);
					if (n > 0.55) {
						n = new Random.Range(0.0,1.0);
						if (n > 0.95) {tempItem.GetComponent(scrDroppingItem).itemType = 3;}
						else {tempItem.GetComponent(scrDroppingItem).itemType = 2;}
					}
					else {tempItem.GetComponent(scrDroppingItem).itemType = 1;}
				}
				lastItemTime[i] = Time.time;
			}
		}
		else {ampList[i]*= 1 - ampDecay * Time.deltaTime;}
	}
}