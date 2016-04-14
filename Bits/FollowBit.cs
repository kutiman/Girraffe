using UnityEngine;
using System.Collections;

public class FollowBit : Bit {

	public override void Start () {
		base.Start();
		speed = 1f;
		shardsAmount = 8;
	}
	
	public override void Update () {
		base.Update();
		Move ();
	}
	
	void Move () {
		if (player) {
			transform.position = Vector3.MoveTowards(transform.position, player.transform.position, speed * Time.deltaTime);
		}
		else {
			transform.Translate (Vector3.down * Time.deltaTime * speed);
		}
	}
}
