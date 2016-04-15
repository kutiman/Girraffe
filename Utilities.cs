using UnityEngine;
using System.Collections;

public class Utilities {

	public static float AngleCalc (Vector3 pos1, Vector3 pos2) {
		float x = Mathf.Abs(pos2.x - pos1.x);
		float y = Mathf.Abs(pos2.y - pos1.y);
		float angle = (Mathf.Atan (x / y)) * Mathf.Rad2Deg;
		
		if (pos1.y <= pos2.y) {
			
			if (pos1.x > pos2.x) {
				angle += 180f;
			}
			else {
				angle = 180f - angle;
			}
		}
		else if (pos1.x > pos2.x) {
			angle = 360 - angle;
		}
		
		return angle;
	}

	public static Color[] AllColors () {
		string[] list = new string[] {
			"0B080F", // black
			"FFFFFF", // white
			"FD0100", // red
			"FEE300", // yellow
			"00B9FC", // blue
			"F33389", // purple
			"8EDC0C", // green
			"F69010" // orange
		};
		Color[] colorList = new Color[list.Length];		
		
		for (int i = 0; i < list.Length; i++) {
			colorList[i] = HexToRGB(list[i]);
		}
		return colorList;
	}
	
	public static int HexToInt (char hexChar) {
		string hex = "" + hexChar;
		int tempInt;
		switch (hex) { 
		case "0": tempInt = 0; break;
		case "1": tempInt = 1; break;
		case "2": tempInt = 2; break;
		case "3": tempInt = 3; break;
		case "4": tempInt = 4; break;
		case "5": tempInt = 5; break;
		case "6": tempInt = 6; break;
		case "7": tempInt = 7; break;
		case "8": tempInt = 8; break;
		case "9": tempInt = 9; break;
		case "A": tempInt = 10; break;
		case "B": tempInt = 11; break;
		case "C": tempInt = 12; break;
		case "D": tempInt = 13; break;
		case "E": tempInt = 14; break;
		case "F": tempInt = 15; break;
		default: tempInt = 0; break;
		}
		return tempInt;
	}
	
	public static Color HexToRGB (string color) {
		float red = (HexToInt(color[1]) + HexToInt(color[0]) * 16f) / 255f;
		float green = (HexToInt(color[3]) + HexToInt(color[2]) * 16f) / 255f;
		float blue = (HexToInt(color[5]) + HexToInt(color[4]) * 16f) / 255f;
		Color finalColor = new Color();
		finalColor.r = red;
		finalColor.g = green;
		finalColor.b = blue;
		finalColor.a = 1;
		return finalColor;
	}

	public static int GetIntByChance (float[] chancesList) {

		float sum = 0f;
		float tempSum = 0f;
		float r = Random.value;
		
		foreach (float n in chancesList) {sum += n;} 
		
		for (var i = 0; i < chancesList.Length; i++) {
			if ((chancesList[i] + tempSum) / sum >= r) {return i;}
			else {tempSum += chancesList[i];}
		}
		return 0;
	}
}
