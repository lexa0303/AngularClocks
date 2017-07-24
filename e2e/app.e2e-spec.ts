import { Angular1Page } from './app.po';

describe('angular1 App', () => {
  let page: Angular1Page;

  beforeEach(() => {
    page = new Angular1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
