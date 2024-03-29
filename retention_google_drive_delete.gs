function DeleteOldBackups() {
  var Folders = new Array(
    'yourgooglefolderid' 
  );
  var FoldersToDelete;
  var RetentionDays = 4; 
  var RetentionPeriod = RetentionDays * 24 * 60 * 60 * 1000;
  
  Logger.clear();
  
  for (var key in Folders) {
    Folder = DriveApp.getFolderById(Folders[key])
    FoldersToDelete = Folder.getFolders();
      while (FoldersToDelete.hasNext()) {
        var FolderToDelete = FoldersToDelete.next();
        if (new Date() - FolderToDelete.getLastUpdated() > RetentionPeriod) {
          Folder.removeFolder(FolderToDelete);
          Logger.log('The folder ' + FolderToDelete.getName() + ' deleted successfully!');
        }
      }
  }
  if(Logger.getLog() != '')
    MailApp.sendEmail('yourname@gmail.com', 'Backup for whatever has been purged from Google Drive', Logger.getLog());
}
