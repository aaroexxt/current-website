import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

export default function PDFViewer(props) {
    const defaultLayoutPluginInstance = defaultLayoutPlugin(); //keeps track of state
    const openLinkInNewTab = (e) => {
        e.preventDefault();
        if (e.target.tagName.toLowerCase() === 'a') {
            window.open( e.target.href );
        }
    }

    return (
        <Worker workerUrl="pdf.worker.js">
            <div className={props.class}>
                <Viewer
                    fileUrl={`${process.env.PUBLIC_URL}/${props.filename}`}
                    plugins={[defaultLayoutPluginInstance]}
                    onClick={openLinkInNewTab}
                />
            </div>
        </Worker>
    )
}