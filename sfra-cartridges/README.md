# Apps User Geolocation cartridge

This is the *apps_user_geolocation* cartridge that includes two controllers: *StoreSelection.js* and *UserLocation.js*. *StoreSelection.js* provides the functionalities to save the store selection in a custom attribute in the sandbox and query that selection.
*UserLocation.js* provides a functionality that returns the user's estimated geolocation based on the IP provided in the request.

# Getting Started

1. Run `npm install` to install all of the local dependencies

2. Create `dw.json` file in the root of the project. Providing a [WebDAV access key from BM](https://documentation.b2c.commercecloud.salesforce.com/DOC1/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fadmin%2Fb2c_access_keys_for_business_manager.html) in the `password` field is optional, as you will be prompted if it is not provided.
```json
{
    "hostname": "your-sandbox-hostname.demandware.net",
    "username": "AM username like me.myself@company.com",
    "password": "your_webdav_access_key",
    "code-version": "version_to_upload_to"
}
```

3. Run `npm run uploadCartridge`. It will upload `apps_user_geolocation` cartridge to the sandbox you specified in `dw.json` file.

4. Add the `apps_user_geolocation` cartridge to your cartridge path in _Administration >  Sites >  Manage Sites > RefArch - Settings_. It must be added _before_ the path for `app_storefront_base`. Example path: `apps_user_geolocation:app_storefront_base`

5. This cartridge requires that you add a custom attribute definition in the sandbox. In order to do this, log in to your sandbox instance, go to Administration > Site Development > System Object Types. In the System Object Type List search for Profile object and enter its configuration, then go to the Attribute Definitions and create a new attribute: for the **ID** field enter *store*, in the **Display Name** enter a value of your choosing (e.g *Preferred Store* or *Store Selection*) and finally, in the **Value Type** make sure that you select *String*. Save your changes and the new attribute should be created

6. You should now be ready to use this catridge.

## Uploading

`npm run uploadCartridge` - Will upload `apps_user_geolocation` to the server. Requires a valid `dw.json` file at the root that is configured for the sandbox to upload.