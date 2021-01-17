from flask import Flask, request
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
    {'id': '1234', 'code': '1234:icd9'},
    {'id': '2345', 'code': '2345:icd9'},
    {'id': '3456', 'code': '3456:icd10'},
]

indications = [
    {'id': '1234', 'code': '1234:icd9', 'timeout': 1, 'deviations': 0},
    {'id': '2345', 'code': '2345:icd9', 'timeout': 6, 'deviations': 1},
    {'id': '3456', 'code': '3456:icd10', 'timeout': 120, 'deviations': 2},
]

numeric_data_set = {
    'ranges': [
        {'id': '1234', 'units': 'mg/dl', 'male_low': 50, 'male_high': 150, 'female_low': 70, 'female_high': 170},
        {'id': '2345', 'units': '%', 'male_low': 5, 'male_high': 15, 'female_low': 7, 'female_high': 17},
    ],
    'high_dds': dds,
    'low_dds': dds,
    'high_indications': indications,
    'low_indications': indications,
}

binary_data_set = {
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
    'numeric_data_set': numeric_data_set,
    'binary_data_set': binary_data_set,
    'explanations': explanations,
}


@app.route('/labtest/<lab_test_id>/<dataset_type>/<condition_type>/<abnormality_type>/<condition_id>', methods=['POST'])
def update_condition(
    lab_test_id: str,
    dataset_type: str,
    condition_type: str,
    abnormality_type: str,
    condition_id: str,
) -> str:
    """
    Examples:
    /labtest/1234/binary/indication/positive/1234
    /labtest/1234/numeric/differential_diagnosis/low/1234
    """
    if lab_test_id != '1234':
        raise NotImplementedError()
    get_conditions_list = {
        ('binary', 'differential_diagnosis', 'positive'): lambda: binary_data_set['positive_dds'],
        ('binary', 'differential_diagnosis', 'negative'): lambda: binary_data_set['negative_dds'],
        ('binary', 'indications', 'positive'): lambda: binary_data_set['positive_indications'],
        ('binary', 'indications', 'negative'): lambda: binary_data_set['negative_indications'],
        ('numeric', 'differential_diagnosis', 'positive'): lambda: numeric_data_set['high_dds'],
        ('numeric', 'differential_diagnosis', 'negative'): lambda: numeric_data_set['low_dds'],
        ('numeric', 'indications', 'positive'): lambda: numeric_data_set['high_indications'],
        ('numeric', 'indications', 'negative'): lambda: numeric_data_set['low_indications'],
    }
    params = (dataset_type, condition_type, abnormality_type)
    conditions = get_conditions_list.get(params)
    if conditions is None:
        raise ValueError(f"couldn't find the combination {params}")
    for cond in conditions:
        if cond['id'] == condition_id:
            cond.update(request.form)
            return
    raise KeyError("couldn't find condition with id {condition_id} in combination {params}")


@app.route('/labtest/<lab_test_id>/numeric/range', methods=['POST'])
def add_range(lab_test_id: str, range_id: str) -> str:
    numeric_data_set['ranges'].append({
        'id': str(uuid.uuid4()),
        **request.form,
    })
    return ''



@app.route('/labtest/<lab_test_id>/numeric/range/<range_id>', methods=['PUT'])
def update_range(lab_test_id: str, range_id: str) -> str:
    if lab_test_id != '1234':
        raise NotImplementedError()
    for range_ in numeric_data_set['ranges']:
        if range_['id'] == range_id:
            range_.update(request.form)
            return
    raise KeyError("couldn't find range with id {range_id} in combination {params}")


@app.route('/labtest/<lab_test_id>')
def lab_test_page(lab_test_id: str) -> str:
    if lab_test_id == '1234':
        return json.dumps(lab_1234)
    raise NotImplementedError()


if __name__ == '__main__':
    app.run(port=8000, debug=True)
