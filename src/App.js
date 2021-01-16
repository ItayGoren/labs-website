import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class EditButton extends React.Component {
    render() {
    return <button className="btn-primary rounded-circle">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#ffffff" d="M17.263 2.177a1.75 1.75 0 012.474 0l2.586 2.586a1.75 1.75 0 010 2.474L19.53 10.03l-.012.013L8.69 20.378a1.75 1.75 0 01-.699.409l-5.523 1.68a.75.75 0 01-.935-.935l1.673-5.5a1.75 1.75 0 01.466-.756L14.476 4.963l2.787-2.786zm-2.275 4.371l-10.28 9.813a.25.25 0 00-.067.108l-1.264 4.154 4.177-1.271a.25.25 0 00.1-.059l10.273-9.806-2.94-2.939zM19 8.44l2.263-2.262a.25.25 0 000-.354l-2.586-2.586a.25.25 0 00-.354 0L16.061 5.5 19 8.44z"></path></svg>
    </button>
    }
}


class DeleteButton extends React.Component {
    render() {
        return <button className="btn-danger rounded-circle">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#ffffff" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"></path>
                <path fill="#ffffff" d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path>
                <path fill="#ffffff" d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path>
            </svg>
        </button>
    }
}


class AddButton extends React.Component {
    render() {
        return <button className="btn-success rounded-circle">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" className="bi bi-plus-circle" viewBox="0 0 16 16">
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </button>
    }
}


class NumericLabTestUnit extends React.Component {
    render() {
        return <div className="my-box">
            <EditButton/>
            <DeleteButton/>
            <br/>
            <label> Units: {this.props.units} </label><br/>
            <label> Male Range: {this.props.maleLow}-{this.props.maleHigh} </label><br/>
            <label> Female Range: {this.props.femaleLow}-{this.props.femaleHigh} </label><br/>
        </div>
    }
}


class DifferentialDiagnoses extends React.Component {
    render() {
        return <div>
            <h5 className="inline"> {this.props.type + " Differential diagnoses" } </h5>
            <AddButton/>
            <ul>
                {this.props.conditions.map((value, index) => {
                    return <li key={index}>
                        <EditButton />
                        <div className="spacer-5"/>
                        <DeleteButton />
                        <div className="spacer-10"/>
                        {value['code']}
                    </li>
                })}
            </ul>
        </div>
    }
}

 
class Indications extends React.Component {
    render() {
        return <div>
            <h5 className="inline"> {this.props.type + " Differential diagnoses" } </h5>
            <AddButton/>
            <ul>
                {this.props.conditions.map((value, index) => {
                    return <li key={index}>
                        <EditButton />
                        <div className="spacer-5"/>
                        <DeleteButton />
                        <div className="spacer-10"/>
                        {value['code'] + " with timeout of " + value['timeout'] + " and " + value['deviations'] + " standard deviations" }
                    </li>
                })}
            </ul>
        </div>
    }
}


class NumericDataSet extends React.Component {
    render() {
        var dds = [
            {'code': '1234:icd9'},
            {'code': '2345:icd9'},
            {'code': '3456:icd10'},
        ]
        var indications = [
            {'code': '1234:icd9', 'timeout': 1, 'deviations': 0},
            {'code': '2345:icd9', 'timeout': 6, 'deviations': 1},
            {'code': '3456:icd10', 'timeout': 120, 'deviations': 2},
        ]
        return <div id="data-sets" className="callout callout-primary">
            <h4> Numeric Data Set </h4>
            <h5 className="inline"> Ranges </h5> <AddButton />
            <div className="numeric-data-set">
                <NumericLabTestUnit units="mg/dl" maleLow="50" maleHigh="150" femaleLow="70" femaleHigh="170" />
                <NumericLabTestUnit units="%" maleLow="5" maleHigh="15" femaleLow="7" femaleHigh="17" />
                <DifferentialDiagnoses type="High" conditions={dds} />
                <DifferentialDiagnoses type="Low" conditions={dds} />
                <Indications type="High" conditions={indications} />
                <Indications type="Low" conditions={indications} />
            </div>
        </div>
    }
}


class BinaryDataSet extends React.Component {
    render() {
        var dds = [
            {'code': '1234:icd9'},
            {'code': '2345:icd9'},
            {'code': '3456:icd10'},
        ]
        var indications = [
            {'code': '1234:icd9', 'timeout': 1, 'deviations': 0},
            {'code': '2345:icd9', 'timeout': 6, 'deviations': 1},
            {'code': '3456:icd10', 'timeout': 120, 'deviations': 2},
        ]
        return <div id="data-sets" className="callout callout-primary">
            <h4> Binary Data Set </h4>
            <div className="binary-data-set">
                <h5> Is negative good: {this.props.isNegativeGood} </h5>
                <h5> Is positive good: {this.props.isPositiveGood} </h5>
                <DifferentialDiagnoses type="Positive" conditions={dds} />
                <DifferentialDiagnoses type="Negative" conditions={dds} />
                <Indications type="Positive" conditions={indications} />
                <Indications type="Negative" conditions={indications} />
            </div>
        </div>
    }
}


class PageHeader extends React.Component {
    render() {
        return <div>
            <h1>Lab test name: {this.props.labTestName}</h1>
            <h2>Lab test ID: {this.props.labTestId}</h2>
        </div>
    }
}


class Explanation extends React.Component {
    render() {
        return <div className="inline">
            <h5 className="inline"> {this.props.title} </h5>
            <p> {this.props.body} </p>
        </div>
    }
}


class ExplanationsPanel extends React.Component {
    render() {
        var explanations = [
            {
                'title': 'What does it mean?',
                'body': 'Green vines attached to the trunk of the tree had wound themselves toward the top of the canopy. Ants used the vine as their private highway, avoiding all the creases and crags of the bark, to freely move at top speed from top to bottom or bottom to top depending on their current chore. At least this was the way it was supposed to be. Something had damaged the vine overnight halfway up the tree leaving a gap in the once pristine ant highway.',
            }, {
                'title': 'When to get tested?',
                'body': 'He ordered his regular breakfast. Two eggs sunnyside up, hash browns, and two strips of bacon. He continued to look at the menu wondering if this would be the day he added something new. This was also part of the routine. A few seconds of hesitation to see if something else would be added to the order before demuring and saying that would be all. It was the same exact meal that he had ordered every day for the past two years.',
            }
        ];
        return <div className="callout callout-success">
            <h4 className="inline"> Explanations </h4>
            <AddButton/>
            {explanations.map((value, index) => {
                return <div key={index}>
                    <EditButton />
                    <div className="spacer-5"/>
                    <DeleteButton />
                    <div className="spacer-10"/>
                    <Explanation title={value['title']} body={value['body']}/>
                </div>
            })}
        </div>
    }
}


function App() {
  return (
<div className="row">
    <div className="col-1"></div>
    <div className="col-10">
        <PageHeader labTestName="Trombotzitim" labTestId="1234"/>
        <NumericDataSet/>
        <BinaryDataSet isNegativeGood="True" isPositiveGood="Not Relevant"/>
        <ExplanationsPanel/>
    </div>

    <div className="col-1"></div>
</div>
  );
}

export default App;
