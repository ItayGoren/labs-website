import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';


class EditButton extends React.Component {
    render() {
        return <button className="btn-primary rounded-circle" onClick={this.props.onClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="#ffffff" d="M17.263 2.177a1.75 1.75 0 012.474 0l2.586 2.586a1.75 1.75 0 010 2.474L19.53 10.03l-.012.013L8.69 20.378a1.75 1.75 0 01-.699.409l-5.523 1.68a.75.75 0 01-.935-.935l1.673-5.5a1.75 1.75 0 01.466-.756L14.476 4.963l2.787-2.786zm-2.275 4.371l-10.28 9.813a.25.25 0 00-.067.108l-1.264 4.154 4.177-1.271a.25.25 0 00.1-.059l10.273-9.806-2.94-2.939zM19 8.44l2.263-2.262a.25.25 0 000-.354l-2.586-2.586a.25.25 0 00-.354 0L16.061 5.5 19 8.44z"></path></svg>
        </button>
    }
}


function EditRangeButton(props) {
    const [show, setShow] = useState(false);
    const [units, setUnits] = useState(props.units);
    const [maleHigh, setMaleHigh] = useState(props.maleHigh);
    const [maleLow, setMaleLow] = useState(props.maleLow);
    const [femaleHigh, setFemaleHigh] = useState(props.femaleHigh);
    const [femaleLow, setFemaleLow] = useState(props.femaleLow);

    const handleShow = () => setShow(true);
    const handleSave = () => {
        // TODO send the result to the server here
        console.info([units, maleHigh, maleLow, femaleHigh, femaleLow]);
        setShow(false);
    }
    const handleCancel = () => setShow(false);

    return <div className="inline">
        { props.type === 'add'
            ? <AddButton onClick={handleShow}/>
            : <EditButton onClick={handleShow}/>
        }
        <Modal show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Range</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label> Units: </label> <input type="text" value={units} onChange={event => setUnits(event.target.value)} /> <br/>
                <label> Male High: </label> <input type="text" value={maleHigh} onChange={event => setMaleHigh(event.target.value)} /> <br/>
                <label> Male Low: </label> <input type="text" value={maleLow} onChange={event => setMaleLow(event.target.value)} /> <br/>
                <label> Female High: </label> <input type="text" value={femaleHigh} onChange={event => setFemaleHigh(event.target.value)} /> <br/>
                <label> Female Low: </label> <input type="text" value={femaleLow} onChange={event => setFemaleLow(event.target.value)} /> <br/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Please forgive my changes and bring the old version back!
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    I made the world a better place. Save my changes sir.
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}


function DeleteButton(props) {
    const [show, setShow] = useState(false);

    const handleShow = () => setShow(true);
    const handleDelete = () => {
        props.onClick();
        setShow(false);
    }
    const handleCancel = () => setShow(false);

    return <div className="inline">
        <button className="btn-danger rounded-circle" onClick={handleShow}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#ffffff" d="M16 1.75V3h5.25a.75.75 0 010 1.5H2.75a.75.75 0 010-1.5H8V1.75C8 .784 8.784 0 9.75 0h4.5C15.216 0 16 .784 16 1.75zm-6.5 0a.25.25 0 01.25-.25h4.5a.25.25 0 01.25.25V3h-5V1.75z"></path>
                <path fill="#ffffff" d="M4.997 6.178a.75.75 0 10-1.493.144L4.916 20.92a1.75 1.75 0 001.742 1.58h10.684a1.75 1.75 0 001.742-1.581l1.413-14.597a.75.75 0 00-1.494-.144l-1.412 14.596a.25.25 0 01-.249.226H6.658a.25.25 0 01-.249-.226L4.997 6.178z"></path>
                <path fill="#ffffff" d="M9.206 7.501a.75.75 0 01.793.705l.5 8.5A.75.75 0 119 16.794l-.5-8.5a.75.75 0 01.705-.793zm6.293.793A.75.75 0 1014 8.206l-.5 8.5a.75.75 0 001.498.088l.5-8.5z"></path>
            </svg>
        </button>

        <Modal show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Oh no! What have I done? No!
                </Button>
                <Button variant="primary" onClick={handleDelete}>
                    Yes! Delete it!
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}


class AddButton extends React.Component {
    render() {
        return <button className="btn-success rounded-circle" onClick={this.props.onClick}>
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
            <EditRangeButton units={this.props.units} maleLow={this.props.maleLow} maleHigh={this.props.maleHigh} femaleLow={this.props.femaleLow} femaleHigh={this.props.femaleHigh} />
            <div className="spacer-5"/>
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
            <EditDifferentialDiagnosis type="add" code=""/>
            <ul>
                {this.props.conditions.map((value, index) => {
                    return <li key={index}>
                        <EditDifferentialDiagnosis code={value['code']}/>
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


function EditDifferentialDiagnosis(props) {
    const [show, setShow] = useState(false);
    const [code, setCode] = useState(props.code);

    const handleShow = () => setShow(true);
    const handleSave = () => {
        // TODO send the result to the server here
        console.info([code]);
        setShow(false);
    }
    const handleCancel = () => setShow(false);

    return <div className="inline">
        { props.type === 'add'
            ? <AddButton onClick={handleShow}/>
            : <EditButton onClick={handleShow}/>
        }
        <Modal show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Edit DD</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label> Code: </label> <input type="text" value={code} onChange={event => setCode(event.target.value)} /> <br/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Please forgive my changes and bring the old version back!
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    I made the world a better place. Save my changes sir.
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}


function EditIndication(props) {
    const [show, setShow] = useState(false);
    const [code, setCode] = useState(props.code);
    const [timeout, setTimeout] = useState(props.timeout);
    const [deviations, setDeviations] = useState(props.deviations);

    const handleShow = () => setShow(true);
    const handleSave = () => {
        // TODO send the result to the server here
        console.info([code, timeout, deviations]);
        setShow(false);
    }
    const handleCancel = () => setShow(false);

    return <div className="inline">
        { props.type === 'add'
            ? <AddButton onClick={handleShow}/>
            : <EditButton onClick={handleShow}/>
        }
        <Modal show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Indication</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label> Code: </label> <input type="text" value={code} onChange={event => setCode(event.target.value)} /> <br/>
                <label> Timeout: </label> <input type="text" value={timeout} onChange={event => setTimeout(event.target.value)} /> <br/>
                <label> Deviations: </label> <input type="text" value={deviations} onChange={event => setDeviations(event.target.value)} /> <br/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Please forgive my changes and bring the old version back!
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    I made the world a better place. Save my changes sir.
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}

 
class Indications extends React.Component {
    render() {
        return <div>
            <h5 className="inline"> {this.props.type + " Indications" } </h5>
            <EditIndication type="add" code="" timeout={0} deviations={0}/>
            <ul>
                {this.props.conditions.map((value, index) => {
                    return <li key={index}>
                        <EditIndication code={value['code']} timeout={value['timeout']} deviations={value['deviations']}/>
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
        console.info('rendering numeric data set');
        return <div id="data-sets" className="callout callout-primary">
            <h4> Numeric Data Set </h4>
            <h5 className="inline"> Ranges </h5>
            <EditRangeButton type="add" units="people/hour" maleLow={0} maleHigh={0} femaleLow={0} femaleHigh={0} />
            <div className="numeric-data-set">
                {this.props.data.ranges.map((value, index) => {
                    return <NumericLabTestUnit key={index} units={value.units} maleLow={value.male_low} maleHigh={value.male_high} femaleLow={value.female_low} femaleHigh={value.female_high}/>
                })}
                <DifferentialDiagnoses type="High" conditions={this.props.data.high_dds} />
                <DifferentialDiagnoses type="Low" conditions={this.props.data.high_dds} />
                <Indications type="High" conditions={this.props.data.high_indications} />
                <Indications type="Low" conditions={this.props.data.high_indications} />
            </div>
        </div>
    }
}


class BinaryDataSet extends React.Component {
    render() {
        console.info('rendering binary data set');
        return <div id="data-sets" className="callout callout-primary">
            <h4> Binary Data Set </h4>
            <div className="binary-data-set">
                <h5 className="inline"> Is negative good: {this.props.data.is_negative_good} </h5>
                <EditButton/>
                <br/>
                <h5 className="inline"> Is positive good: {this.props.data.is_positive_good} </h5>
                <EditButton/>
                <br/>
                <DifferentialDiagnoses type="Positive" conditions={this.props.data.positive_dds} />
                <DifferentialDiagnoses type="Negative" conditions={this.props.data.negative_dds} />
                <Indications type="Positive" conditions={this.props.data.positive_indications} />
                <Indications type="Negative" conditions={this.props.data.negative_indications} />
            </div>
        </div>
    }
}


class PageHeader extends React.Component {
    render() {
        return <div>
            <h1 className="inline">Lab test name: {this.props.labTestName}</h1>
            <div className="spacer-10"/>
            <EditButton/>
            <h2>Lab test ID: {this.props.labTestId}</h2>
            <h2 className="inline">Lab test panel: {this.props.labTestPanel}</h2>
            <div className="spacer-10"/>
            <EditButton/>
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
        return <div className="callout callout-success">
            <h4 className="inline"> Explanations </h4>
            <EditExplanation type="add" title="" body="" />
            {this.props.explanations.map((value, index) => {
                return <div key={index}>
                    <div style={{height: "10px"}}/>
                    <EditExplanation title={value['title']} body={value['body']} />
                    <div className="spacer-5"/>
                    <DeleteButton />
                    <div className="spacer-10"/>
                    <Explanation title={value['title']} body={value['body']}/>
                </div>
            })}
        </div>
    }
}


function EditExplanation(props) {
    const [show, setShow] = useState(false);
    const [title, setTitle] = useState(props.title);
    const [body, setBody] = useState(props.body);

    const handleShow = () => setShow(true);
    const handleSave = () => {
        // TODO send the result to the server here
        console.info([title, body]);
        setShow(false);
    }
    const handleCancel = () => setShow(false);

    return <div className="inline">
        { props.type === 'add'
            ? <AddButton onClick={handleShow}/>
            : <EditButton onClick={handleShow}/>
        }
        <Modal show={show} onHide={handleCancel}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Explanation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label> Title: </label> <input type="text" value={title} onChange={event => setTitle(event.target.value)} /> <br/>
                <label> Explanation: </label> <br/>
                <textarea style={{width:"100%"}} rows="5" value={body} onChange={event => setBody(event.target.value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCancel}>
                    Please forgive my changes and bring the old version back!
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    I made the world a better place. Save my changes sir.
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}


class Page extends React.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            data: null,
        }
    }

    componentDidMount() {
    fetch("http://localhost:8000/labtest/1234")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    loaded: true,
                    data: result,
                });
            }
        )
    }

    render() {
        if (!this.state.loaded) {
            return <h1> Loading </h1>
        }
        return <div>
            <PageHeader labTestName={this.state.data.lab_test_name} labTestId={this.state.data.lab_test_id} labTestPanel={this.state.data.lab_test_panel} supportedPanels={this.state.data.supported_panels}/>
            <NumericDataSet data={this.state.data.numeric_data_set}/>
            <BinaryDataSet data={this.state.data.binary_data_set}/>
            <ExplanationsPanel explanations={this.state.data.explanations}/>
        </div>
    }
}


function App() {
  return (
    <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
            <Page/>
        </div>
        <div className="col-1"></div>
    </div>
  );
}

export default App;
