#pragma strict

static public var soundOuch : AudioSource;
static public var soundCoin : AudioSource;

function Start () {
	soundOuch = gameObject.AddComponent(AudioSource);
	soundOuch.clip = Resources.Load("Sounds/sndOuch");
	
	soundCoin = gameObject.AddComponent(AudioSource);
	soundCoin.clip = Resources.Load("Sounds/sndCoin");
}

function Update () {

}