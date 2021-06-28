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
    public static get(key: string, msg: string, alwaysAsk: boolean = false): string {
        let propValue;
        if (alwaysAsk) {
            let tempPropValue = UserPropertyService.property.getProperty(key);
            if (Predicates.IS_NOT_BLANK.test(tempPropValue)) {
                msg = msg + "\n\nExisting information : \n" + tempPropValue;
            }
        } else {
            propValue = UserPropertyService.property.getProperty(key);
        }
        if (Predicates.IS_BLANK.test(propValue)) {
            // get property from user
            propValue = UiService.getInputFromUser(msg);

            //user press cancel
            if (Predicates.IS_NULL.test(propValue)) {
                UiService.showErrorMessage("Current Operation Cancelled!");
                return null;
            }

            // user provide blank input, retry
            if (Predicates.IS_BLANK.test(propValue)) {
                propValue = UiService.getInputFromUser(msg, true);
            }

            //user press cancel after retry
            if (Predicates.IS_BLANK.test(propValue)) {
                UiService.showErrorMessage("Current Operation Cancelled!");
                return null;
            }
            UserPropertyService.property.setProperty(key, propValue);
        }
        return propValue;
    }

    /**
     * 
     * @param key 
     * @returns get value if exist otherwise null
     */
    public static getIfExist(key: string): string {
        return UserPropertyService.property.getProperty(key);
    }

    /**
     * @param key 
     * @returns remove value if exist otherwise null
     */
    public static remove(key: string): void {
        UserPropertyService.property.deleteProperty(key);
    }
}