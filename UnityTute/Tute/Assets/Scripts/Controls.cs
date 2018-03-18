using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Controls : MonoBehaviour {
	public Rigidbody2D rigidBody;
	public float movespeed = 3;
	public bool moveRight;
	public bool moveLeft;

	// Use this for initialization
	void Start () {
		rigidBody = GetComponent<Rigidbody2D>();
	}

	// Update is called once per frame
	void Update ()
	{
		if (Input.GetKey(KeyCode.LeftArrow))
        {
            rigidBody.velocity = new Vector2(-movespeed, rigidBody.velocity.y);

        }
        if (Input.GetKey(KeyCode.RightArrow))
        {
            rigidBody.velocity = new Vector2(movespeed, rigidBody.velocity.y);

        }

        if (moveRight)
        {
	        rigidBody.velocity = new Vector2(movespeed, rigidBody.velocity.y);
        }
        if (moveLeft)
        {
	        rigidBody.velocity = new Vector2(-movespeed, rigidBody.velocity.y);
        }
	}
}
