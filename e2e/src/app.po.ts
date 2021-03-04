import { browser, by, element } from 'protractor';

export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get('https://google.com/');
  }

  async getTitleText(): Promise<string> {
    return element(by.css('.title')).getText();
  }
}
