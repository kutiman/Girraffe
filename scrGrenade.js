﻿#pragma strict

private var endPoint : Vector2;
private var awakeTime : float;
private var timeToHit : float = 2.0;
private var throwingHeight : float;
private var throwingDistance : float;

function Start () {
	awakeTime = Time.time;
	throwingHeight = (scrGame.screenHeight * 2) * 0.5;
	endPoint = Vector2(Random.Range(-scrGame.screenWidth * 0.9, scrGame.screenWidth * 0.9), Random.Range(-scrGame.screenHeight * 0.9, scrGame.screenHeight * 0.9));
	transform.position = Vector2(scrGame.screenWidth * 1.05, endPoint.y);
	throwingDistance = transform.position.x - endPoint.x;
}

function Update () {
	
	Rotate(100);
	Move();
	
	if (Time.time >= awakeTime + timeToHit) {
		BlowUp();
	}
}

function Move () {
	
	transform.position.x -= Time.deltaTime / timeToHit * throwingDistance;
	transform.position.y += (Time.deltaTime / timeToHit * throwingHeight) * (awakeTime + (timeToHit / 2) - Time.time);
}

function Rotate (speed : float) {
	transform.Rotate(0, 0, Time.deltaTime * speed);
}

function BlowUp () {
	Destroy(gameObject);
}