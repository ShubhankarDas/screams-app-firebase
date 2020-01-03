let db = {
  users: [
    {
      userId: 'someId',
      email: 'user@email.com',
      handle: "user",
      createdAt: '2019-12-31T03:23:24.464Z',
      imageUrl: "some url",
      bio: "Hello, something is burning in my kitchen but i am still here.",
      website: 'https://wesite.com',
      location: 'Somewhere, Earth'
    }
  ],
  screams: [
    {
      userHandle: 'user',
      body: 'scream body',
      createdAt: '2019-12-23T17:25:14.522Z',
      likeCount: 5,
      commentCount: 2
    }
  ],
  comments: {
    userHandle: 'user',
    screamId: 'sadfkgjsd',
    body: 'I like this scream on ice scream',
    createdAt: '2019-12-23T17:25:14.522Z'
  }
}

const userDetails = {
  // redux data
  credentials: {
    userId: 'someId',
    email: 'user@email.com',
    handle: "user",
    createdAt: '2019-12-31T03:23:24.464Z',
    imageUrl: "some url",
    bio: "Hello, something is burning in my kitchen but i am still here.",
    website: 'https://wesite.com',
    location: 'Somewhere, Earth'
  },
  likes: [
    {
      userHandle: 'user',
      screamId: 'h32ads1oWfgHH2pa'
    }
  ]
}
