<p><a target="_blank" href="https://app.eraser.io/workspace/FKS9r8QnGLHe6GXZ1xJr" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

@bender-tags: exportpdf, feature, 77
@bender-ui: collapsed
@bender-include: ../../_helpers/tools.js
@bender-ckeditor-plugins: wysiwygarea, toolbar, basicstyles, notification, format, easyimage

Note: You need the Internet connection to run this test.

1. Click `Export to PDF`  toolbar button.
2. Examine the area in the red frame below.
 **Expected:** There is a long token string in the frame.

 **Unexpected:** Frame is empty or says 'undefined'.

1. Wait for the file to download and examine it.
 **Expected:** No information about being created with CKEditor was added.

 **Unexpected:** There is an additional note about CKEditor at the bottom of page.

1. Upload an image.
2. Examine browser console.
 **Expected:** There are no errors or warnings.

 **Unexpected:** Any error or warning concerning `Export to PDF` or `Easy Image` occurred.



<!--- Eraser file: https://app.eraser.io/workspace/FKS9r8QnGLHe6GXZ1xJr --->