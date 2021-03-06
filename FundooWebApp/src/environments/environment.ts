// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,

  userApiUrl:'http://localhost:8080/users',
  registerUrl:'/register',
  loginUrl:'/login',
  forgotPasswordUrl:'/forgotPassword',
  resetPasswordUrl:'/updatePassword/',
  userVerification:'/verifyMail/',
  addCollaboratorUrl:'/addCollaborator',
  deleteCollaboratorUrl:'/deleteCollaborator',
  getCollaboratorsUrl:'/getCollaborators',
  getFileUrl:'/getFile',

  noteApiUrl:'http://localhost:8080/notes',
  createNoteUrl:'/create',
  getAllNotesUrl:'/getNotes',
  pinNoteUrl:'/pin/',
  archieveUrl:'/archieve/',
  trashUrl:'/delete/',
  addColorUrl:'/addColor/',
  getArchieveUrl:'/archievedNotes',
  getTrashedUrl:'/trashedNotes',
  getPinnedNoteUrl:'/pinnedNotes',
  deletePermanentlyUrl:'/deletePermanently/',
  searchNoteUrl:'/getNotesByTitle',
  updateNoteUrl:'/update/',
  addReminderUrl:'/noteReminder',
  removeReminderUrl:'/deleteReminder',

  labelApiUrl:'http://localhost:8080/labels',
  createLabelUrl:'/create',
  deleteLabelUrl:'/delete',
  updateLabelUrl:'/update',
  getLabelsUrl:'/getLabels',
  addLabelUrl:'/addLabel',
  removeLabelUrl:'/remove',
  getNotesByLableUrl:'/getNotesByLabel/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
