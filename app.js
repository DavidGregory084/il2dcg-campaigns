import React, {useState} from 'react';
import parser from './routes-parser';
import {makeMission} from './mission';

const InputArea = ({inputText, setInputText, hasError, setHasError, setError, setParseResult}) => {

    let className = "card fluid";

    if (hasError) {
        className += ' error';
    } else if (inputText.length > 0) {
        className += ' success';
    }

    return (
        <div className={"col-sm"}>
            <div className={className}>
                <label>RDS file</label>
                <textarea value={inputText} onChange={event => {
                    const text = event.target.value;

                    try {
                        const result = parser.parse(text)
                        setHasError(false);
                        setError(null);
                        setParseResult(result);
                    } catch (err) {
                        setHasError(true);
                        setError(err);
                        setParseResult(null);
                    };

                    setInputText(text)
                }} />
            </div>
        </div>
    );
}

const Controls = ({canCreate, error, parseResult, mapName, setMapName, setOutputText}) => {

    const errorText = canCreate ? 'No problems found.' :
        error ? `Line ${error.location.start.line}, column ${error.location.start.column}: ${error.message}` :
        mapName.length == 0 ? 'Please enter a map name.' : 'No problems found.';

    return (
        <div className={"col-sm-3"} >
            <div className={"card fluid"}>

                <div className={"section"}>
                    <label>Map Name:</label>
                    <input type="text" value={mapName} onChange={event => {
                        const text = event.target.value;
                        setMapName(text);
                    }} />
                </div>

                <textarea readOnly={true} value={errorText} />

                <button
                    disabled={!canCreate}
                    onClick={() => setOutputText(makeMission(mapName, parseResult))}>Create MIS</button>

            </div>
        </div>
    );
};

const OutputArea = ({outputText}) => {
    return (
        <div className={"col-sm"}>
            <div className={"card fluid"}>
                <label>MIS file</label>
                <textarea readOnly={true} value={outputText} />
            </div>
        </div>
    );
};

const App = props => {
    const [mapName, setMapName] = useState("");
    const [inputText, setInputText] = useState("");
    const [parseResult, setParseResult] = useState([]);
    const [error, setError] = useState(null);
    const [outputText, setOutputText] = useState("");
    const [hasError, setHasError] = useState(false);
    const canCreate = !hasError && mapName.length > 0;

    return (
        <div className={"container"}>
            <div className={"row"}>
                <InputArea
                    inputText={inputText} setInputText={setInputText}
                    hasError={hasError} setHasError={setHasError}
                    setError={setError} setParseResult={setParseResult} />

                <Controls
                    canCreate={canCreate}
                    error={error} parseResult={parseResult}
                    mapName={mapName} setMapName={setMapName}
                    setOutputText={setOutputText} />

                <OutputArea
                    outputText={outputText} />
            </div>
        </div>
    );
};

export default App;