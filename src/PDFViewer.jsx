import React, { useState, useCallback } from 'react';
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
import "./pdf.css";
//import 'dist/Page/AnnotationLayer.css' from 'react-pdf';
//import 'dist/Page/TextLayer.css' from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
//   ).toString();

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
//   ).toString();


function highlightPattern(text, pattern) {
    console.log(text, pattern)
    return text.replace(pattern, (value) => `<mark>${value}</mark>`);
  }

export default function PDFViewer(props) {
    const pdfErrorHandler = (error) => {
        setRenderError(true);
        console.error("PDF render error on fname: " + props.filename);
    }

    const [numPages, setNumPages] = useState(1);
    const [pageNumber, setPageNumber] = useState(1);
    const [renderError, setRenderError] = useState(false);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setRenderError(false);
    }

    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }

    function previousPage() {
        changePage(-1);
    }

    function nextPage() {
        changePage(1);
    }

    const [searchText, setSearchText] = useState('');

    const textRenderer = useCallback(
        (textItem) => highlightPattern(textItem.str, searchText), [searchText]
    );

    function onChange(event) {
        setSearchText(event.target.value);
    }

    function onItemClick({ pageNumber: itemPageNumber }) {
        setPageNumber(itemPageNumber);
      }

    return (
        <div class="pdf-container">
            <Document
                file={props.filename}
                onLoadSuccess={onDocumentLoadSuccess}
                externalLinkTarget='_blank'
                error={pdfErrorHandler}
                onItemClick={onItemClick}
            >
                <Page
                    pageNumber={pageNumber}
                    customTextRenderer={textRenderer}
                />

                <div class="page-controls">
                    <button
                        type="button"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                    >
                        {"<"}
                    </button>
                    <span>
                        {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                    </span>
                    <button
                        type="button"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                    >
                        {">"}
                    </button>

                    { false && <div>
                        <label htmlFor="search">Search:</label>
                        <input type="search" id="search" value={searchText} onChange={onChange} />
                    </div>}
                </div>
            </Document>

            {renderError && <strong>Error rendering inline PDF. Path (click to open): <a href={props.filename} target="_blank">{props.filename}</a></strong>}
        </div>
    );
}