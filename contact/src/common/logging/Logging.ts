//import ReactAI from "react-appinsights";
import { AppInsights } from "applicationinsights-js";
export enum EventType {
  Information = "Information",
  Error = "Error",
  Exception = "Exception"
}
export class Logging {
  //static appInsights: any;
  private static userAlias: string;
  constructor(alias: string, pageViewName: string) {
    Logging.userAlias = alias;

    let appInsightsKey: string = this.GetAIIKey();
    let config: Microsoft.ApplicationInsights.IConfig = {
      instrumentationKey: appInsightsKey
    }
    if (AppInsights.downloadAndSetup !== undefined) {
      AppInsights.downloadAndSetup(config);
    }
    AppInsights.setAuthenticatedUserContext(alias);
    AppInsights.trackPageView(pageViewName, window.location.href);
  }
  private GetAIIKey(url: string = window.location.href): string {
    if (url.toLowerCase().indexOf("https://cpsui-dev.") > -1 || url.toLowerCase().indexOf("/localhost:") > -1)
      return "8d188f25-4d90-421a-ab66-217f77e754ce";
    else if (url.toLowerCase().indexOf("https://cpsui-stg.") > -1)
      return  "5db78f65-9ad5-4512-8ba4-a8e99a062b6b";
    else if (url.toLowerCase().indexOf("https://cpsui-uat.") > -1)
      return  "b3535cfb-ac7d-401f-a17d-9ce9bbdbf839";
    else
      return  "2616402f-6159-4ed0-9aea-dbed276a334e";
  }
  public static AppInsightsTrackEvent(eventName: string, eventType: string, eventSubType: string, message: string, controlID: string): void {
    var eventData = {
      "EventType": eventType,
      "EventSubType": eventSubType,
      "Message": message,
      "ControlID": controlID,
      "Url": window.location.href,
      "Alias": this.userAlias
    };
    if (!Logging.userAlias)
      throw new Error("Logging not initiated. Please initiate at base component");

    try {
      AppInsights.trackEvent(eventName, eventData);
    }
    catch (ex) {
      console.log("Error: " + ex.message.toString());
    }
  }
  public static AppInsightsTrackException(ExceptionName: string, handledAt: string, Exception: Error,
    CustomMessage?: string): void {
    if (!Logging.userAlias)
      throw new Error("Logging not initiated. Please initiate at base component");

    try {
      var eventData = {
        name: ExceptionName
      };
      this.AppInsightsTrackEvent(ExceptionName, EventType.Exception, "CustomError", Exception.message + " " + handledAt, "");
      AppInsights.trackException(Exception, handledAt, eventData);
    }
    catch (ex) {
      console.log("Error: " + ex.message.toString());
    }
  }
}
