import React, { useState, useCallback, useEffect } from 'react';
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
import "./pdf.css";
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js';

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;


function highlightPattern(text, pattern) {
    const regex = new RegExp(pattern.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'), 'gi');
    return text.replace(regex, (match) => `<mark>${match}</mark>`);
}

export default function PDFViewerSinglePage(props) {
    //State variables
    const [numPages, setNumPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [renderError, setRenderError] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [hasText, setHasText] = useState(false);

    //Custom text renderer
    const textRenderer = useCallback(
        (textItem) => {
            if (textItem.str.trim().length > 0) {
                // console.log("pdf text",textItem.str)
                setHasText(true);
            } else {
                // console.log("no pdf text")
            }
            return `<span>${highlightPattern(textItem.str, searchText)}</span>`;
        },
        [searchText]
    );

    const pdfErrorHandler = (error) => {
        setRenderError(true);
        console.error("PDF render error on fname: " + props.filename);
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setRenderError(false);
    }

    function changePage(offset) {
        setHasText(false);  // Reset here
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    function onChange(event) {
        setSearchText(event.target.value);
    }

    function onItemClick({ pageNumber: itemPageNumber }) {
        setPageNumber(itemPageNumber);
    }

    return (
        <div className="pdf-container">
            {renderError && <strong className="react-pdf__Document" style={{padding: "5em"}}>Error rendering inline PDF. Path (click to open): <a href={props.filename} target="_blank">{props.filename}</a></strong>}
            
            <Document
                file={props.filename}
                onLoadSuccess={onDocumentLoadSuccess}
                externalLinkTarget='_blank'
                error={pdfErrorHandler}
                onItemClick={onItemClick}
                className={renderError ? "hide-document" : ""}
            >
                
                <Page
                    pageNumber={pageNumber}
                    // customTextRenderer={textRenderer}
                    className={"no-margin"}
                />

                    <div className="page-controls-container">
                        <div className="page-controls">
                            <button
                                className={`control-button ${pageNumber <= 1 ? 'button-disabled' : ''}`}
                                type="button"
                                disabled={pageNumber <= 1}
                                onClick={previousPage}
                            >
                                {"<"}
                            </button>
                            <div className="page-info">
                                {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                            </div>
                            <button
                                className={`control-button ${pageNumber >= numPages ? 'button-disabled' : ''}`}
                                type="button"
                                disabled={pageNumber >= numPages}
                                onClick={nextPage}
                            >
                                {">"}
                            </button>

                            {hasText && (
                                <div className="search-section">
                                    <input
                                        type="search"
                                        id="search"
                                        className="search-input"
                                        placeholder="Type to search..."
                                        value={searchText}
                                        onChange={onChange}
                                    />
                                </div>
                            )}
                        </div>
                    </div>


            </Document>
        </div>
    );
}