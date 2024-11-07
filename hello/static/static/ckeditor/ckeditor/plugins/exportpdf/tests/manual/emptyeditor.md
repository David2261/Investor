<p><a target="_blank" href="https://app.eraser.io/workspace/Y0AmfRLmBptbzmfwGhUv" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

@bender-tags: exportpdf, feature, 11
@bender-ui: collapsed
@bender-include: ../_helpers/tools.js
@bender-ckeditor-plugins: wysiwygarea, toolbar, basicstyles, notification

**Note:** At the beginning open the console.

1. Click `Export to PDF`  button (the one next to the `Source`  button) in the first editor.
2. Wait for the file to download.
3. Open the file.
 **Expected:**

- Empty file was downloaded.
- No errors in console.
 **Unexpected:**

- File wasn't downloaded.
- File was downloaded but can't be opened.
- Error in the console appeared.
1. Click `Export to PDF`  button in the second editor.
 **Expected:**

- File wasn't downloaded.
- The notification with error appeared in the editor.
- There is an error message in the console.
 **Unexpected:**

- File was downloaded and can't be opened.
- Success notification was displayed.




<!--- Eraser file: https://app.eraser.io/workspace/Y0AmfRLmBptbzmfwGhUv --->