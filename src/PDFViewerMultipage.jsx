import React, { useState, useEffect } from 'react';
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
import "./pdf.css";
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

function PDFViewerMultipage(props) {
    const [numPages, setNumPages] = useState(null);
    const [loadedPages, setLoadedPages] = useState(1); // Start with the first page
    const [renderError, setRenderError] = useState(false);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setRenderError(false);
    };

    const onPageRenderSuccess = () => {
        // Load the next page after the current one has finished rendering
        if (loadedPages < numPages) {
            setLoadedPages(loadedPages + 1);
        }
    };

    const pdfErrorHandler = (error) => {
        setRenderError(true);
        console.error("PDF render error on filename: " + props.filename, error);
    };

    return (
        <div className="pdf-container" style={{ position: 'relative' }}>
            {renderError && (
                <strong className="react-pdf__Document" style={{ padding: "5em" }}>
                    Error rendering inline PDF. Path (click to open): 
                    <a href={props.filename} target="_blank" rel="noopener noreferrer">
                        {props.filename}
                    </a>
                </strong>
            )}
            
            <Document
                file={props.filename}
                onLoadSuccess={onDocumentLoadSuccess}
                externalLinkTarget='_blank'
                error={pdfErrorHandler}
                className={renderError ? "hide-document" : ""}
            >
                {Array.from(new Array(loadedPages), (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        className={index == numPages-1 ? "no-margin" : ""}
                        onRenderSuccess={onPageRenderSuccess}
                    />
                ))}
            </Document>
        </div>
    );
}

export default PDFViewerMultipage;
