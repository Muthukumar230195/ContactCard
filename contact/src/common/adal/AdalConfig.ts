import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';

export const adalConfig = {
  clientId: "e0f60ff0-327b-43e2-9055-54782bbed141",
  tenant: "microsoft.onmicrosoft.com",
  endpoints: {
    graphApiUri: "https://graph.microsoft.com",
    IDRApiUri: "https://idrservice-stg.azurewebsites.net",
    WebApiUri: "https://campuswebapi.azurewebsites.net",
    TeamsApiUri: "https://teamsforcampus.azurewebsites.net",
    SharePointFuncApp:"https://sharepointfuncapps.azurewebsites.net",
    DevOpsAPIUri:"499b84ac-1321-427f-aa17-267ca6975798"
  },
  postLogoutRedirectUri: window.location.origin,
  cacheLocation: 'localStorage' as 'localStorage',
};

export const authContext = new AuthenticationContext(adalConfig);

export enum APISource {
  Campus = "https://campuswebapi",
  IDR = "https://idrservice",
  MSGraph = "https://graph.microsoft.com",
  Teams = "https://teamsforcampus.azurewebsites.net",
  TeamsRoot = "https://teamsforcampus",  
  SPfuncAppsRoot = "https://sharepointfuncapps"
}

export class WebAPIHelper {
  private getResource(url: string): string {
    var endpointsUri = "";
    url = url.substr(0, 30).toLowerCase();
    if (url.indexOf("https://idrservice") > -1)
      endpointsUri = adalConfig.endpoints.IDRApiUri;
    else if (url.indexOf("https://graph.microsoft.com") > -1)
      endpointsUri = adalConfig.endpoints.graphApiUri;
    else if (url.indexOf("https://campuswebapi") > -1)
      endpointsUri = adalConfig.endpoints.WebApiUri;
    else if (url.indexOf("https://teamsforcampus") > -1)
      endpointsUri = adalConfig.endpoints.TeamsApiUri;
    else if (url.indexOf("https://dev.azure.com") > -1)
      endpointsUri = adalConfig.endpoints.DevOpsAPIUri;
    else if (url.indexOf("https://sharepointfuncapps") > -1)
      endpointsUri = adalConfig.endpoints.SharePointFuncApp;      
    else
      endpointsUri = adalConfig.endpoints.WebApiUri;
    return endpointsUri;
  }
    private getAPIBaseURL(apiSource: string, url: string = window.location.href): string {
        if (url.toLowerCase().indexOf("https://cpsui-dev.") > -1 || url.toLowerCase().indexOf("/localhost:") > -1)
            return apiSource + "-stg.azurewebsites.net/api/";
        else if (url.toLowerCase().indexOf("https://cpsui-stg.") > -1)
            return apiSource + "-stg.azurewebsites.net/api/";
        else if (url.toLowerCase().indexOf("https://cpsui-uat.") > -1)
            return apiSource + "-uat.azurewebsites.net/api/";
        else if (url.toLowerCase().indexOf("https://cpsui-extuat.") > -1)
            return apiSource + "-extuat.azurewebsites.net/api/";
        else
            return apiSource + ".azurewebsites.net/api/";
    }
    public getEnvironment(url: string = window.location.href): string {
        if (url.toLowerCase().indexOf("https://cpsui-dev.") > -1 || url.toLowerCase().indexOf("/localhost:") > -1)
            return "DEV";
        else if (url.toLowerCase().indexOf("https://cpsui-stg.") > -1)
            return "STG";
        else if (url.toLowerCase().indexOf("https://cpsui-uat.") > -1)
            return "UAT";
        else if (url.toLowerCase().indexOf("https://cpsui-extuat.") > -1)
            return "EXTUAT";
        else
            return "Prod";
    }
  public GetCampusWebAPI(apiSource: APISource, apiRelativePath: string): Promise<any> {
    return new Promise<any>((resolve: (result: any) => void, reject: (error: any) => void): void => {
      let fullAPIUrl: string;
      const options = {
        method: "GET",
        headers: {          
          "Content-type": "application/json"
        }                
      }
      try {
        if (apiSource === APISource.MSGraph || apiSource === APISource.Teams)
          fullAPIUrl = apiSource + "/" + apiRelativePath;
        else
          fullAPIUrl = this.getAPIBaseURL(apiSource) + apiRelativePath;
          console.log(fullAPIUrl);
        const output = adalFetch(authContext, this.getResource(fullAPIUrl), fetch, fullAPIUrl, options).then((r:any) => r.json());
        resolve(output);
      }
      catch (error) {
        reject(error);
      }
    });
  }

  public GetCampusWebAPIGraph(apiSource: APISource, apiRelativePath: string): Promise<any> {
    return new Promise<any>((resolve: (result: any) => void, reject: (error: any) => void): void => {
      let fullAPIUrl: string;
      const options = {        
        method: "GET",
        headers: {          
          "Content-type": "image/jpg"
        }                
      }
      try {
        if (apiSource === APISource.MSGraph || apiSource === APISource.Teams)
          fullAPIUrl = apiSource + "/" + apiRelativePath;
        else
          fullAPIUrl = this.getAPIBaseURL(apiSource) + apiRelativePath;
         
        const output = adalFetch(authContext, this.getResource(fullAPIUrl), fetch, fullAPIUrl, options).then((r:any) => r);
        resolve(output);
      }
      catch (error) {
        reject(error);
      }
    });
  }

  public PostCampusWebAPI(apiSource: APISource, apiRelativePath: string, jsonbody?: string, returnType?: string): Promise<any> {
    return new Promise<any>((resolve: (result: any) => void, reject: (error: any) => void): void => {
      let fullAPIUrl: string;
      const options = {
        method: "POST",
        body: jsonbody,
        headers: {
          "Accept": "application/json;odata=verbose",
          "Content-type": "application/json;odata=verbose",
        }
      }
      try {
        if (apiSource === APISource.MSGraph || apiSource === APISource.Teams)
          fullAPIUrl = apiSource + "/" + apiRelativePath;
        else
          fullAPIUrl = this.getAPIBaseURL(apiSource) + apiRelativePath;

        const output = adalFetch(authContext, this.getResource(fullAPIUrl), fetch, fullAPIUrl, options).then((r:any) => r.json());
        resolve(output);
      }
      catch (error) {
        reject(error);
      }
    });
  } 
  
}

export const adalApiFetch = (url: string, options: any = {}) => {
  return adalFetch(authContext, adalConfig.endpoints.WebApiUri, fetch, url, options);
}

export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.WebApiUri);

export const adalUserName = () => {
  var cache = authContext.getCachedUser();
  if (cache !== null || cache !== undefined)
    return authContext.getCachedUser().profile.name;
  else
    return '';
}

export const adalUserAlias = () => {
  var cache = authContext.getCachedUser();
  if (cache !== null || cache !== undefined)
    return authContext.getCachedUser().userName.split('@')[0];
  else
    return '';
}

export const adalUserEmail = () => {
  var cache = authContext.getCachedUser();
  if (cache !== null || cache !== undefined)
    return authContext.getCachedUser().userName;
  else
    return '';
}

