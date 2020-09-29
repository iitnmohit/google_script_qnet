import { DocService } from "./DocService";

function updateLogToDoc(): void {
    let docService = new DocService();
    docService.updateAllLogs();
  }