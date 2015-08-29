#pragma strict

//#################################################################
// Need to find the length of the animations clip that is in the animator and destroy the animation after waiting this length
// GetCurrentAnimationClipState(0).length works but not well, because needed to be called after the end of the frame
// perhaps finding the length of the clip at START and then yield waitForTime in the destruction function
//#################################################################



function Start () {
	Destroy (gameObject, 0.3);
}
