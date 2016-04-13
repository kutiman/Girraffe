using UnityEngine;
using System.Collections;

public class RainbowBit : Bit {

	public Color[] myColors;
	int currentColor = 0;
	float colorChangeSpeed = 1;
	float changeTimer = 0;

	
	public override void Start () {
		base.Start();
		badBit = false;
		speed = 0.5f;
		timeRemaining *= 2;
	}
	
	public override void Update () {
		base.Update();
		Move ();
		ChangeColors ();
	}
	
	void Move () {
		transform.Translate (Vector3.down * Time.deltaTime * speed);
	}

	void ChangeColors () {
		if (changeTimer >= colorChangeSpeed) {
			changeTimer = 0;
			currentColor++;
			if (currentColor >= myColors.Length) currentColor = 0;
		}
		GetComponent<SpriteRenderer>().color = Color.Lerp(GetComponent<SpriteRenderer>().color, myColors[currentColor], colorChangeSpeed * Time.deltaTime*3);
		changeTimer += Time.deltaTime;
	}
}

