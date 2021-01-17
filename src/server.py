from flask import Flask
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)


explanations = [
    {
        'title': 'What does it mean?',
        'body': 'Green vines attached to the trunk of the tree had wound themselves toward the top of the canopy. Ants used the vine as their private highway, avoiding all the creases and crags of the bark, to freely move at top speed from top to bottom or bottom to top depending on their current chore. At least this was the way it was supposed to be. Something had damaged the vine overnight halfway up the tree leaving a gap in the once pristine ant highway.',
    }, {
        'title': 'When to get tested?',
        'body': 'He ordered his regular breakfast. Two eggs sunnyside up, hash browns, and two strips of bacon. He continued to look at the menu wondering if this would be the day he added something new. This was also part of the routine. A few seconds of hesitation to see if something else would be added to the order before demuring and saying that would be all. It was the same exact meal that he had ordered every day for the past two years.',
    }
]

dds = [
    {'code': '1234:icd9'},
    {'code': '2345:icd9'},
    {'code': '3456:icd10'},
]

indications = [
    {'code': '1234:icd9', 'timeout': 1, 'deviations': 0},
    {'code': '2345:icd9', 'timeout': 6, 'deviations': 1},
    {'code': '3456:icd10', 'timeout': 120, 'deviations': 2},
]

numericDataSet = {
    'ranges': [
        {'units': 'mg/dl', 'male_low': 50, 'male_high': 150, 'female_low': 70, 'female_high': 170},
        {'units': '%', 'male_low': 5, 'male_high': 15, 'female_low': 7, 'female_high': 17},
    ],
    'high_dds': dds,
    'low_dds': dds,
    'high_indications': indications,
    'low_indications': indications,
}

binaryDataSet = {
    'is_negative_good': 'True',
    'is_positive_good': 'Not Relevant',
    'positive_dds': dds,
    'negative_dds': dds,
    'positive_indications': indications,
    'negative_indications': indications,
}

lab_1234 = {
    'lab_test_name': 'Trombotzitim',
    'lab_test_id': '1234',
    'lab_test_panel': 'Micro Major Space Cows',
    'supported_panels': ['Micro Major Space Cows', 'Huge Spaceship Rocket'],
    'numeric_data_set': numericDataSet,
    'binary_data_set': binaryDataSet,
    'explanations': explanations,
}

@app.route('/labtest/<lab_test_id>')
def lab_test_page(lab_test_id: str):
    if lab_test_id == '1234':
        return json.dumps(lab_1234)
    raise NotImplementedError()


if __name__ == '__main__':
    app.run(port=8000, debug=True)
