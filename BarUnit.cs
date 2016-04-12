using UnityEngine;
using System.Collections;

public class BarUnit : MonoBehaviour {

	public int iSpec;
	public GameObject manager;
	private float originalYScale;
	private float maxVelocity = 100f;
	// TODO: get the max velocity from a single source, or link it with the bar size, or both
	
	void Awake () {
		originalYScale = transform.localScale.y;
	}
	
	void Update () {
		// changing the vertical scale of the bar according to velocity
		Vector3 newScale;
		if (iSpec > 0 && manager && manager.GetComponent<Bar>().barSizes.Length > iSpec) {
			float s = Mathf.Clamp((manager.GetComponent<Bar>().barSizes[iSpec]), 0, maxVelocity) / maxVelocity;
			newScale = new Vector3(transform.localScale.x, s, transform.localScale.z); 
			transform.localScale = newScale;
		}
		if (iSpec == 0) {
			newScale = new Vector3(transform.localScale.x, 0, transform.localScale.z);
			transform.localScale = newScale;
		}
	}
}
