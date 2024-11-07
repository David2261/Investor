<p><a target="_blank" href="https://app.eraser.io/workspace/qP6eTCcjaDURfblpmosW" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

@bender-tags: exportpdf, feature, 4
@bender-ui: collapsed
@bender-include: ../_helpers/tools.js
@bender-ckeditor-plugins: wysiwygarea, toolbar, basicstyles, notification

1. Click `Export to PDF`  button (the one next to the `Source`  button) in the first editor.
2. Watch appearing notifications.
 **Expected:**

- Notification `Processing PDF document...`  was visible for about 2 seconds.
- Progress steps were: `0` , `0.5` , `success` .
 **Unexpected:**

 Notification disappeared too fast to be noticable.

1. Do the same in the second editor.
 **Expected:**

- Notification `Processing PDF document...`  was visible for about 2 seconds.
- Progress steps were: `0.2` , `0.5` , `success` .
 **Unexpected:**

 Notification disappeared too fast to be noticable.



<!--- Eraser file: https://app.eraser.io/workspace/qP6eTCcjaDURfblpmosW --->