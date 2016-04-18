using UnityEngine;
using System.Collections;

public class Game : MonoBehaviour {

	static public Vector2 WorldSize = new Vector2 (4.8f, 3.2f);

	public static bool tutorialPassed = false;
	
	public static int level = 0;
	public AudioClip[] songsList;
	public static int[] flakesCount = new int[4];
	
	public static GameObject player;
	public GameObject playerObject;
	public GameObject soundManager;
	public GameObject soundEffectsManager;
	public GameObject gameOverMenu;
	private GameObject endMenu;
	public static int levelStage = 0;
	public static bool musicPlaying;
	
	public bool gamePaused = false;
	
	void Start () {
		Debug.Log(levelStage);
		if (!tutorialPassed && Application.loadedLevelName == "Level" && levelStage == 0) {
				StartCoroutine (TutorialTimeline ());
		} 
		else if (Application.loadedLevelName == "Level") {
			levelStage = 1;
			Debug.Log("I'm here now");
			player = GameObject.Instantiate(playerObject) as GameObject;
			CreateLevel(level);
		}
	}
	
	void Update () {
		
		if (soundManager) {musicPlaying = soundManager.GetComponent<AudioSource>().isPlaying;}
		
		if (Application.loadedLevelName == "Level") {
			if (levelStage == 1 && !musicPlaying && !gamePaused && player) {
				//player.BreakToPieces(40);
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
		
		if (Input.GetKey(KeyCode.Q)) Application.Quit();
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
			levelStage = 1;
			Destroy(player);
			flakesCount = new int[] {0,0,0,0};
			CreateLevel(level);
			player = GameObject.Instantiate(Resources.Load("Prefabs/SoundPrefabs/objOrb")) as GameObject;
		}
	}
	
	public void ChooseLevel() {
		levelStage = 1;
		GameObject.FindWithTag("tagFader").GetComponent<Fader>().levelToLoad = "ChooseLevel";
		GameObject.FindWithTag("tagFader").GetComponent<Fader>().sceneEnding = true;
		
		
		//Destroy(player);
		flakesCount = new int[] {0,0,0,0};
	}
	
	void OnApplicationFocus(bool focusStatus) {
		gamePaused = !focusStatus;
	}
	IEnumerator TutorialTimeline () {
		flakesCount = new int[] {0,0,0,0};
		yield return new WaitForSeconds(4);
		player = GameObject.Instantiate(playerObject) as GameObject;
		yield return new WaitForSeconds(10);
		tutorialPassed = true;
		CreateLevel(level);
	}
}


