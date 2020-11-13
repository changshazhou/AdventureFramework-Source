export default class UIMapping {

    public static convertUIName(mappingForm) {
        if (!mappingForm) {
            console.warn(`convertUIName fail  mappingForm is null `)
            return null;
        }
        let curApp = moosnow.getAppPlatform();
        if (mappingForm[curApp])
            return mappingForm[curApp]
        else if (mappingForm[moosnow.APP_PLATFORM.WX])
            return mappingForm[moosnow.APP_PLATFORM.WX]
        else {
            console.warn(`convertUIName fail `, mappingForm)
            return null
        }
        return null
    }
}