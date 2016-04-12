using UnityEngine;
using System.Collections;

public class Game : MonoBehaviour {

	
	public static Vector2 worldSize = new Vector2 (4.8f, 3.2f);

	public static bool tutorialPassed = false;
	
	public static int level = 0;
	public static Color[] colors = new Color[8];
	public AudioClip[] songsList;
	public static int[] flakesCount = new int[4];
	
	public static GameObject player;
	public GameObject playerObject;
	public GameObject soundManager;
	public GameObject soundEffectsManager;
	public GameObject cam;
	public GameObject gameOverMenu;
	private GameObject endMenu;
	public static int levelStage = 1;
	public static bool musicPlaying;
	
	public bool gamePaused = false;
	
	void Start () {
		if (Application.loadedLevelName == "Level") {
			flakesCount = new int[] {0,0,0,0};
			colors = AllColors();

				/*
				yield return new WaitForSeconds(4);
				player = GameObject.Instantiate(Resources.Load("Prefabs/SoundPrefabs/objOrb")) as GameObject;
				yield return new WaitForSeconds(9);
				CreateLevel(level);
				*/
			player = GameObject.Instantiate(playerObject) as GameObject;
			CreateLevel(level);
		}
	}
	
	void Update () {
		
		if (soundManager) {musicPlaying = soundManager.GetComponent<AudioSource>().isPlaying;}
		
		if (Application.loadedLevelName == "Level") {
			if (levelStage == 1 && !musicPlaying && !gamePaused && player) {
				//player.GetComponent(scrPlayer).BreakToPieces(40);
				Destroy(player.gameObject);
				endMenu = GameObject.Instantiate(gameOverMenu, Vector3.zero, Quaternion.identity) as GameObject;
				endMenu.GetComponent<EndMenu>().levelWon = true;
				levelStage = 2;
			}
			else if (levelStage == 1 && musicPlaying && !gamePaused && !player) {
				levelStage = 2;
				endMenu = GameObject.Instantiate(gameOverMenu, Vector3.zero, Quaternion.identity) as GameObject;
				endMenu.GetComponent<EndMenu>().levelWon = false;
				soundManager.GetComponent<AudioSource>().Stop();
				soundEffectsManager.GetComponent<SoundEffects>().audioSources[0].Play();
				
				
			}
		}
		
		if (Input.GetKey(KeyCode.Q)) {
			Application.Quit();
		}
	}
	
	public void CreateLevel (int level) {
		if (Application.loadedLevelName == "Level") {
			// level parameters which will help check if the music is over (time started, length of audio clip)
			if (!player) {player = GameObject.Instantiate(Resources.Load("Prefabs/SoundPrefabs/objOrb")) as GameObject;}
			if (soundManager) {
				soundManager.GetComponent<AudioSource>().clip = songsList[level];
				soundManager.GetComponent<AudioSource>().Play();
			}
			levelStage = 1;
		}
	}
	
	public void Restart() {
		if (Application.loadedLevelName == "Level") {
			Destroy(player);
			flakesCount = new int[] {0,0,0,0};
			CreateLevel(level);
			player = GameObject.Instantiate(Resources.Load("Prefabs/SoundPrefabs/objOrb")) as GameObject;
		}
	}
	
	public void ChooseLevel() {
		
		GameObject.FindWithTag("tagFader").GetComponent<Fader>().levelToLoad = "ChooseLevel";
		GameObject.FindWithTag("tagFader").GetComponent<Fader>().sceneEnding = true;
		
		levelStage = 1;
		Destroy(player);
		flakesCount = new int[] {0,0,0,0};
	}
	
	Color[] AllColors () {
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
	
	int HexToInt (char hexChar) {
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
	
	Color HexToRGB (string color) {
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
	
	void OnApplicationFocus(bool focusStatus) {
		gamePaused = !focusStatus;
	}
}
