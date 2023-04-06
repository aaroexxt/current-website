import {PDFViewer as NativePDFViewer} from 'pdf-viewer-reactjs';

import 'bulma/css/bulma.css';
import 'material-design-icons/iconfont/material-icons.css';

export default function PDFViewer(props) {
    const openLinkInNewTab = (e) => {
        e.preventDefault();
        if (e.target.tagName.toLowerCase() === 'a') {
            window.open( e.target.href );
        }
    }

    return (
        <NativePDFViewer
            document={{
                url: props.filename,
                onDocumentClick: openLinkInNewTab
            }}
        />
    )
}