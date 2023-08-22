import React, { useState, useCallback } from 'react';
import { Document, Page } from "react-pdf";
import { pdfjs } from 'react-pdf';
import "./pdf.css";
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.js';

//import 'dist/Page/AnnotationLayer.css' from 'react-pdf';
//import 'dist/Page/TextLayer.css' from 'react-pdf';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs.js'
//   ).toString();

// The below does not work:
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/build/pdf.worker.min.js',
//     import.meta.url,
//   ).toString();

//Set workerSrc to point to the local copy of pdf.js, which is installed in the node_modules of the "react-pdf" module:
//Note: the import.meta.url property does not work in IE11, so we have to hardcode the path to the pdf.worker.min.js file:
/*
errror:

./node_modules/react-pdf/dist/esm/pdfjs.js
Module not found: Can't resolve 'pdfjs-dist' in 'C:\Users\HP\Desktop\Code\current-website\node_modules\react-pdf\dist\esm'


./src/PDFViewer.jsx 35:90
Module parse failed: Unexpected token (35:90)
File was processed with these loaders:
 * ./node_modules/@pmmmwh/react-refresh-webpack-plugin/loader/index.js
 * ./node_modules/babel-loader/lib/index.js
You may need an additional loader to handle the result of these loaders.
|
| import { jsxDEV as _jsxDEV } from "react/jsx-dev-runtime";
> pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url).toString();
| function highlightPattern(text, pattern) {
|   console.log(text, pattern);
*/
// const pdfjsWorkerPath = '/pdfjs-dist/build/pdf.worker.min.js'; // Replace with the actual path
// pdfjs.GlobalWorkerOptions.workerSrc = new URL(pdfjsWorkerPath, window.location.href).toString();

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;


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
        </div>
    );
}