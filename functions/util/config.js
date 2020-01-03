const firebaseConfig = {
  apiKey: "AIzaSyC03P2Fe7SRGbNFscZR-AkmkqV92lVyv1g",
  authDomain: "social-app-9b5f5.firebaseapp.com",
  databaseURL: "https://social-app-9b5f5.firebaseio.com",
  projectId: "social-app-9b5f5",
  storageBucket: "social-app-9b5f5.appspot.com",
  messagingSenderId: "572181336894",
  appId: "1:572181336894:web:a87809ed61420f82af926f"
};

const serviceAccountConfig = {
  "type": "service_account",
  "project_id": "social-app-9b5f5",
  "private_key_id": "ca62ada6805fedffeee834b318c234b7f8298ac7",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCePyMcZQ6OVoUr\nYIkQf6slkUPP4+DrIl8CDpV0vPNkVNORBfyqW609T04/ziTAKDynzTth1vuya4sE\n2sax/cA+k6/OjWUIgIGuAczsuVSXTDEsxv/nY2JG5zUM7LBaPVvOMFJBA5zga5nc\nDRGMQWmVQkYxY0MYU+Dx5vzBlBc5eL6syt0+aQ3s8aT0u0RQX2Rwsfih67O4GXi+\n1fkEUcUIobLERHSa435d0Mx9oI54ZeqLKGm5NS/M6uZ1IfflEuq0TZ9sieP+3Hbs\nwdg93NULqw04tAGUIGRIoWs9+B/RQg0AiuvE2kW0O5KzArZrBDy4jVkSq/df8yii\n/73VvRa9AgMBAAECggEAMJhn8ljQQwKry3nOLYxfJN66qdUrZVm9Plb3K4242pc4\nDyF9CV200g6QE4T9ASt6EPez5CROT+i5nMiIWvF3P2BADVibbaR07lgsM4foQ7wI\nn90OieKZs/ddcbYfo96S2js5jzCKVNqGOa6jtGQEBet/vbvjR02+1tpdxR5ykVmY\n6cWIXhcV1ok79hTu8TcOySXg4QgRDkizRcnXVJeiRyYtvbHPERaLn30jn6M5VrCI\njQMEUTho5hjVvgR3ou2ei5XKaFFp5bq9+p+PYaT0iq/rXp51Pp/e4CwZz8jkU7TF\nRWCKwQUNbWyZ1FZK+aYuvS0Pm6WNkzmO8tV+V3ElywKBgQDKBSZPQmlBbg0cbbJF\nikc4zthmH+yx2GGmtR4jHf1LoMmYWsAjCPj8I2tkJZ2QRZ34gV1LOvdt5TzoWAGU\nIhXZmsVk4uI68bYMpkVuqEaJdHiqGLCnoZX2Ua4IijGEaP78wyOwPCI72fHWgKaj\nIpaZ36I4Bvo6lwsTk94UtHawQwKBgQDIh7wi1Zj7hUifQSH6MvKGad3FBVHo9Puh\nitu5WaHsNuJ9l9FUY4lulNOwrG/+FCCE9k4lQDo7gOQp34HebHgO/fATiUguEIGk\nQXEizN7+vwYyUta5bi+QHIbEpIpyDx/CRQZnpZiezMkCkmh/vGVp+Il6n/pNod98\n0al1hmgs/wKBgQCFmzhF7QcNpcn4BjiDszr9QBdwGycAS7nxdhFTak8NyG3rXAF8\naj+5CXfJyPLW6qPaKTxZN8tSG+zXQPTyUkSfILPxz/eMwjUDUqfS0mmsGKKA5ElY\n5A341PZDYZn0FzikVC5zLKH7cV123qjWdVait3tikILHYwOJVB7pFJz2XwKBgQCZ\nyedSO8fQlb5FTHlXXb07snM/Bz5zT3avxEOQmZoiA1GeClGiy5d5tC/JXeWh0SPD\ndPYngWNngQj6yAvcXgmRTdTR1sYBde1G4F141+/pJO0GqRs+KK/XcNk2dA4tPUYZ\nAkDQOmKa3ukFzOzRkdWg+NfOsGQRJ6SzIEQ6+rJoVwKBgGsWTVPjiOCiwlSwbhrD\nn2b4YCTrJX2G9E+vyxSI1YTB096IobWhwPR0lc2e3uXpxR9TezJ4AdH7R20w3VL6\nHPUQ5gbqpN0+/17Ti5dINXHJncCfyMkmDRjusH6GcUxK+MRY6le98YCr1XDo5Bjp\noyBd/KdI5wkJ7gNniSMDqv5Q\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-1io4m@social-app-9b5f5.iam.gserviceaccount.com",
  "client_id": "117563245683529835719",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1io4m%40social-app-9b5f5.iam.gserviceaccount.com"
}


module.exports = {
  firebaseConfig,
  serviceAccountConfig
}
