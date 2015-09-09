﻿#pragma strict

private var moveSpeed : float = 1.0;
private var rotateSpeed : float = 180;

public var util : scrUtilities;

function Start () {
	transform.position = Vector3(scrGame.screenWidth * 1.15, Random.Range(-scrGame.screenHeight * 0.9, scrGame.screenHeight * 0.9), 0);
}

function Update () {
	Rotate();
	transform.position.x -= moveSpeed * Time.deltaTime;
	if (transform.position.x < -scrGame.screenWidth * 1.15) {
		Destroy(gameObject);
	}
}

function Rotate () {
	transform.Rotate(0, rotateSpeed * Time.deltaTime, 0);
}

function PickedUp () {
	scrSounds.soundCoin.Play();
	Destroy(gameObject);
}