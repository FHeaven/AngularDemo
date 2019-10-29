import { DreamPage } from './app.po';

describe('dream App', () => {
  let page: DreamPage;

  beforeEach(() => {
    page = new DreamPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
