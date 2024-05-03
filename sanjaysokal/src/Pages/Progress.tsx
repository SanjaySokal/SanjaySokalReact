import React from 'react'

interface typeData {
    file: string;
    progress: number
    color: string;
}

const Progress = (props: typeData) => {
    var width = props.progress + "%";
    var color = props.color;
    return (
        <div className="progress-bar">
            <div className="upload-progress">
                <div style={{ width: width, background: color }} className="progress">{props.progress}%</div>
            </div>
            <p><b>File Name:</b> {props.file}</p>
        </div>
    )
}

export default Progress