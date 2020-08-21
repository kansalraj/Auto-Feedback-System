from flask import request, Flask
import json
from image_analyser import analyse_image
from text_analyser import analyse_text
from face_comparison import compare_faces
from utils.image_conversion import create_image_from_base64

app = Flask(__name__)


@app.route('/analyse_image', methods=['GET', 'POST'])
def analyse_image_route():
    data = request.get_json(force=True)
    if data is None:
        return "No data"
    create_image_from_base64(data['image'], './images/uploaded_img.png')
    res = analyse_image('./images/uploaded_img.png')
    return res


@app.route('/analyse_text', methods=['GET', 'POST'])
def analyse_text_route():
    data = request.get_json(force=True)
    if data is None:
        return "No data"
    return analyse_text(data['text'])


@app.route('/compare_faces', methods=['GET', 'POST'])
def compare_faces_route():
    data = request.get_json(force=True)
    if data is None:
        return "No data"

    path1 = './images/uploaded_face1_img.png'
    path2 = './images/uploaded_face2_img.png'
    create_image_from_base64(data['face1'], path1)
    create_image_from_base64(data['face2'], path2)

    return json.dumps({
        'match': 1 if compare_faces(path1, path2) == True else 0
    })


print('Server ready to receive requests')

# print(json.dumps(str(analyse_image('realtime.png'))))


# print(analyse_text('hi how are you'));
app.run(debug=True)
