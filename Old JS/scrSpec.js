#pragma strict

var audioSource: AudioSource; // calculate the spectrum of this audio source
var goTransform : Transform; 
var lastItemTime : float[]; // the time when the last item was created

private var iSamples : int = 64; // amount of samples to be calculated in the spectrum
static var spectrum : float[]; // raw spectrum data from the audio source
public var ampList : float[];
static var maxVelocity : float = 100.0;
public var musicPlaying : boolean = false;

public var bits : GameObject[];
public var itemChances : float[];
private var chancesSum : float;

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
	
	for (var n : float in itemChances) {
		chancesSum += n;
	} 
	
	CreateHazardMachine();
}

function Update () {
	// check if music is playing
	musicPlaying = GetComponent(AudioSource).isPlaying;
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
		var eff : float = 15.0;
//		var posY = spectrum[i] * (i*i);
		var posY = Mathf.Sqrt(spectrum[i]) * (i*i) * 0.7;
		if (ampList[i] <= posY) {
			ampList[i] = posY;
			if (ampList[i] > tolerance &&  Time.time >= waitTime + lastItemTime[i]) {
				var tempItem : GameObject; 
				var posX : float = goTransform.position.x - scrGame.screenWidth + itemSize * i  + itemSize/2;
				var positionY : float = scrGame.screenHeight - itemSize/2 - (scrBar.unitHeight * Mathf.Clamp(ampList[i], 0.0, maxVelocity) / maxVelocity);
				var r = GetRandomItem();
				tempItem = Instantiate(item, new Vector3(posX, positionY, goTransform.position.z),Quaternion.identity) as GameObject;
				tempItem.transform.parent = goTransform;
				tempItem.GetComponent(scrDroppingItem).speed.y = (-0.4 - (Mathf.Log(posY))) * itemSpeed;
				tempItem.GetComponent(scrDroppingItem).iSpec = i;
				tempItem.GetComponent(scrDroppingItem).myScale = itemScale;
				
				var allItemsList : GameObject[] = new GameObject[transform.childCount];

				var p : int = 0;
				for (var child : Transform in transform) {
					allItemsList[p] = child.gameObject;
					var tr = allItemsList[p].GetComponent(scrDroppingItem).timeRemaining;
					var lt = allItemsList[p].GetComponent(scrDroppingItem).lifetime;
					if (allItemsList[p].GetComponent(scrDroppingItem).iSpec == i && tr < lt/2.0) {
						allItemsList[p].GetComponent(scrDroppingItem).timeRemaining *= 2;
					}
						p++;
				}
				tempItem.GetComponent(scrDroppingItem).itemType = GetRandomItem();
				lastItemTime[i] = Time.time;
			}
		}
		else {ampList[i]*= 1 - ampDecay * Time.deltaTime;}
	}
}

function GetRandomItem () : int {
	var type = 0;
	var r = Random.value;
	var tempSum = 0.0;
	for (var i = 0; i < itemChances.Length; i++) {
		
		if ((itemChances[i] + tempSum) / chancesSum >= r) {
			return i;
		}
		else {
			tempSum += itemChances[i];
		}
	}
}

/*

function UpdateHazardMachine () {
	
	var waitTime : float = 0.5;
	
	for (var i = 1; i < spectrum.length -1; i++) {
		var eff : float = 15.0;
//		var posY = spectrum[i] * (i*i);
		var posY = Mathf.Sqrt(spectrum[i]) * (i*i) * 0.7;
		if (ampList[i] <= posY) {
			ampList[i] = posY;
			if (ampList[i] > tolerance &&  Time.time >= waitTime + lastItemTime[i]) {
				var tempItem : GameObject; 
				var posX : float = goTransform.position.x - scrGame.screenWidth + itemSize * i  + itemSize/2;
				var positionY : float = scrGame.screenHeight - itemSize/2 - (scrBar.unitHeight * Mathf.Clamp(ampList[i], 0.0, maxVelocity) / maxVelocity);
				var r = GetRandomItem();
				tempItem = Instantiate(item, new Vector3(posX, positionY, goTransform.position.z),Quaternion.identity);
				tempItem.transform.parent = goTransform;
				tempItem.GetComponent(scrDroppingItem).speed.y = (-0.4 - (Mathf.Log(posY))) * itemSpeed;
				tempItem.GetComponent(scrDroppingItem).iSpec = i;
				tempItem.GetComponent(scrDroppingItem).myScale = itemScale;
				
				var allItemsList : GameObject[] = new GameObject[transform.childCount];

				var p : int = 0;
				for (var child : Transform in transform) {
					allItemsList[p] = child.gameObject;
					var tr = allItemsList[p].GetComponent(scrDroppingItem).timeRemaining;
					var lt = allItemsList[p].GetComponent(scrDroppingItem).lifetime;
					if (allItemsList[p].GetComponent(scrDroppingItem).iSpec == i && tr < lt/2.0) {
						allItemsList[p].GetComponent(scrDroppingItem).timeRemaining *= 2;
					}
						p++;
				}
		
				tempItem.GetComponent(scrDroppingItem).itemType = GetRandomItem();
				lastItemTime[i] = Time.time;
			}
		}
		else {ampList[i]*= 1 - ampDecay * Time.deltaTime;}
	}
}

*/


