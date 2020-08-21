import face_recognition

def compare_faces(face1, face2):
  known_image = face_recognition.load_image_file(face1)
  unknown_image = face_recognition.load_image_file(face2)

  biden_encoding = face_recognition.face_encodings(known_image)[0]
  unknown_encoding = face_recognition.face_encodings(unknown_image)[0]

  results = face_recognition.compare_faces([biden_encoding], unknown_encoding)
  return results[0]


# Test:

# print(compare_faces('photo.jpg', 'realtime.png'))