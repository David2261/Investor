<p><a target="_blank" href="https://app.eraser.io/workspace/E4cDZYmithR469bm6aWv" id="edit-in-eraser-github-link"><img alt="Edit in Eraser" src="https://firebasestorage.googleapis.com/v0/b/second-petal-295822.appspot.com/o/images%2Fgithub%2FOpen%20in%20Eraser.svg?alt=media&amp;token=968381c8-a7e7-472a-8ed6-4a6626da5501"></a></p>

@bender-tags: exportpdf, feature, 4
@bender-ui: collapsed
@bender-include: ../_helpers/tools.js
@bender-ckeditor-plugins: wysiwygarea, toolbar, notification

**Note:** Errors in console during this test are allowed.

1. Click `Export to PDF`  button in the first editor.
 **Expected:**

- Warning notification with `Error occured.`  message appeared.
- Button is clickable.
- File wasn't downloaded.
 **Unexpected:**

- Notification didn't show up.
- Button wasn't reenabled.
- File was downloaded.
1. Click `Export to PDF`  button in the second editor.
 **Expected:**

- Alert appeared instead of notification.
- Button is clickable.
- File wasn't downloaded.
 **Unexpected:**

- Notification didn't show up.
- Button wasn't reenabled.
- File was downloaded.




<!--- Eraser file: https://app.eraser.io/workspace/E4cDZYmithR469bm6aWv --->