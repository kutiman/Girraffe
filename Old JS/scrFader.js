#pragma strict

public var fadeSpeed : float = 1.0f; // Speed that the screen fades to and from black.
private var sceneStarting : boolean = true; // Whether or not the scene is still fading in.
public var sceneEnding : boolean = false;
public var levelToLoad : String = "ChooseLevel";

function Awake () {
    // Set the texture so that it is the the size of the screen and covers it.
    guiTexture.pixelInset = new Rect(0f, 0f, Screen.width, Screen.height);
}

function Update () {
    if(sceneStarting) {
        StartScene();
    }
    if (sceneEnding) {
    	EndScene();
    }
}

function FadeToClear () {
    // Lerp the colour of the texture between itself and transparent.
    guiTexture.color = Color.Lerp(guiTexture.color, Color.clear, fadeSpeed * Time.deltaTime);
}

function FadeToBlack () {
    // Lerp the colour of the texture between itself and black.
    guiTexture.color = Color.Lerp(guiTexture.color, Color.black, fadeSpeed * Time.deltaTime);
}


function StartScene () {
	guiTexture.enabled = true;
    // Fade the texture to clear.
    FadeToClear();
    
    // If the texture is almost clear...
    if(guiTexture.color.a <= 0.05f) {
        // ... set the colour to clear and disable the GUITexture.
        guiTexture.color = Color.clear;
        guiTexture.enabled = false;

        sceneStarting = false;
    }
}


private function EndScene ()
{
    // Make sure the texture is enabled.
    guiTexture.enabled = true;
   
    // Start fading towards black.
    FadeToBlack();
    
    // If the screen is almost black...
    if(guiTexture.color.a >= 0.45f) {
        // ... reload the level.
        guiTexture.color = Color.black;
        sceneEnding = false;
        Application.LoadLevel(levelToLoad);
    }
}