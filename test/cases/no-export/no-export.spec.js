/*
 * Use Case
 * Run wcc against a single custom element using with no default export
 *
 * User Result
 * Should run without any errors from the DOM shim.
 *
 * User Workspace
 * src/
 *   no-export.js
 *   header.js
 *   footer.js
 */

import chai from 'chai';
import { renderToString, renderFromHTML } from '../../../src/wcc.js';

const expect = chai.expect;

describe('Run WCC For ', function() {
  const LABEL = 'Single Custom Element with no default export';

  describe(LABEL, function() {
    describe('renderToString', () => {
      let rawHtml;
      let meta;
    
      before(async function() {
        const { html, metadata } = await renderToString(new URL('./src/no-export.js', import.meta.url));
    
        rawHtml = html;
        meta = metadata;
      });

      it('should not throw an error', function() {
        expect(rawHtml).to.equal(undefined);
      });
  
      it('should not have any definition', function() {
        expect(meta.length).to.equal(0);
      });
    });
    
    describe('renderFromHTML', () => {
      let rawHtml;
      let meta;
      const contents = `
        <html>
          <head>
            <title>No Export Test</title>
          </head>
          <body>
            <app-no-export-header></app-no-export-header>
            <h1>Hello World</h1>
            <app-no-export-footer></app-no-export-footer>
          </body>
        </html>
      `;

      before(async function() {
        const { html, metadata } = await renderFromHTML(contents, [
          new URL('./src/footer.js', import.meta.url),
          new URL('./src/header.js', import.meta.url)
        ]);

        rawHtml = html;
        meta = metadata;
      });

      it('should not throw an error and return the expected contents', function() {
        expect(rawHtml.replace(/ /g, '').replace(/\n/g, '')).to.equal(contents.replace(/ /g, '').replace(/\n/g, ''));
      });

      // I think this is broken, should actually be equal to 2?
      it('should not have any definition', function() {
        expect(meta.length).to.equal(0);
      });
    });
  });
});