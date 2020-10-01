import { runSafely } from "./Code";
import { DocService } from "./service/DocService";

// to do
function updateLogToDoc(): void {
  runSafely((): void => {
    new DocService().updateAllLogs();
  });
}