import { Predicates } from "../library/Predicates";
import { UiService } from "./UiService";

export class UserPropertyService {
    private static property: GoogleAppsScript.Properties.Properties = PropertiesService.getUserProperties();

    /**
     * 
     * @param key property key
     * @param msg msg for display if property not exist
     * 
     * @returns must return value, 
     * ask user if not exist
     * if user deny to response after 1 retry then return null and send msg to user
     */
    public static get(key: string, msg: string): string {
        let value = UserPropertyService.property.getProperty(key);
        if (Predicates.IS_BLANK.test(value)) {
            // get property from user
            value = UiService.getInputFromUser(msg);

            //user press cancel
            if (Predicates.IS_NULL.test(value)) {
                UiService.showErrorMessage("Current Operation Cancelled!");
                return null;
            }

            // user provide blank input, retry
            if (Predicates.IS_BLANK.test(value)) {
                value = UiService.getInputFromUser(msg, true);
            }

            //user press cancel after retry
            if (Predicates.IS_BLANK.test(value)) {
                UiService.showErrorMessage("Current Operation Cancelled!");
                return null;
            }
            UserPropertyService.property.setProperty(key, value);
        }
        return value;
    }

    /**
     * 
     * @param key 
     * @returns get value if exist otherwise null
     */
    public static getIfExist(key: string): string {
        return UserPropertyService.property.getProperty(key);
    }
}