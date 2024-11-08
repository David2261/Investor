<p><a target="_blank" href="https://app.eraser.io/workspace/OqLuh3G6zS42KW0F5xV9" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

@bender-tags: exportpdf, feature, 77
@bender-ui: collapsed
@bender-include: ../_helpers/tools.js
@bender-ckeditor-plugins: wysiwygarea, toolbar, basicstyles, notification, format

Note: You need the Internet connection to run this test.

1. Open and examine console.
 **Expected:** `exportpdf-no-token-url` warning appeared.

 **Unexpected:** No warning.

1. Click `Export to PDF`  button in the editor.
2. Examine the area in the red frame below.
 **Expected:** Frame has text `undefined`.

 **Unexpected:** There is a long token string in the frame.

1. Examine console.
 **Expected:** `exportpdf-no-token` warning appeared.

 **Unexpected:** No warning.

1. Wait for the file to download and open it.
 **Expected:** File contains info about being created with CKEditor.

 **Unexpected:** No copyright info was added.



<!--- Eraser file: https://app.eraser.io/workspace/OqLuh3G6zS42KW0F5xV9 --->