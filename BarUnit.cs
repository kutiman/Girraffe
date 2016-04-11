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
		if (iSpec > 0 && manager && manager.GetComponent<Bar>().barSizes.Length > iSpec) {
			float s = Mathf.Clamp((manager.GetComponent<Bar>().barSizes[iSpec]), 0, maxVelocity) / maxVelocity;
			//transform.localScale.y = s;
		}
		if (iSpec == 0) {
			//transform.localScale.y = 0;
		}
	}
}
