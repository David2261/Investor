<p><a target="_blank" href="https://app.eraser.io/workspace/uSHk40LacjEejIQNGXJC" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

@bender-tags: exportpdf, feature, 1
@bender-ui: collapsed
@bender-include: ../_helpers/tools.js
@bender-ckeditor-plugins: wysiwygarea, toolbar, basicstyles, notification, format

1. Click `Export to PDF`  button (the one next to the `Source`  button) in the first editor.
2. Wait for the file to download.
 **Expected:**

 File with `ckeditor4-export-pdf.pdf` name (possibly with number if file already existed) was downloaded.

 **Unexpected:**

 File was not downloaded or its name is incorrect.

1. Do the same in the second editor.
 **Expected:**

 File with `different-name.pdf` name (possibly with number if file already existed) was downloaded.

 **Unexpected:**

 File was not downloaded or its name is incorrect.

1. Repeat for the third editor.
 **Expected:**

 File with 'Beautiful title.pdf' name (possibly with number if file already existed) was downloaded.

 **Unexpected:**

 File was not downloaded or its name is incorrect.

1. Change text in the third editor to `New title`  (**important:** it has to remain a `<h1>`  element).
2. Click and download PDF again.
 **Expected:**

 Name of a new file is 'New title.pdf'.

 **Unexpected:**

 Name is the same as before or there is an error.



<!--- Eraser file: https://app.eraser.io/workspace/uSHk40LacjEejIQNGXJC --->