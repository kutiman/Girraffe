﻿using UnityEngine;
using System.Collections;

public class Bar : MonoBehaviour {

	public GameObject barObject;
	public GameObject[] barsList = new GameObject[64];
	
	public float[] barSizes = new float[64];
	public float ancPos;
	
	public Factory factory;
	
	public static float unitHeight = 1.61f;
	
	void Start () {
		
		barsList = CreateBars(64);
	}
	
	void Update () {
		if (factory) {
			barSizes = factory.equalizer.curedSpectrum;
		}
	}
	
	GameObject[] CreateBars (int amount) {
		float w = Game.WorldSize.x;
		float h = Game.WorldSize.y;
		GameObject[] tempList = new GameObject[amount];
		//var eff : float = 10.6667
		for (var i = 0; i < amount; i++) {
			Vector3 pos = new Vector3(-w + i*(w/32f), h, 0);
			tempList[i] = GameObject.Instantiate(barObject) as GameObject;
			tempList[i].transform.position = pos;
			tempList[i].transform.parent = gameObject.transform;
			tempList[i].GetComponent<BarUnit>().iSpec = i;
			tempList[i].GetComponent<BarUnit>().manager = gameObject;
		}
		return tempList;
	}

}
