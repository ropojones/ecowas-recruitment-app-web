import { EcoRecruitTemplatePage } from './app.po';

describe('EcoRecruit App', function() {
  let page: EcoRecruitTemplatePage;

  beforeEach(() => {
    page = new EcoRecruitTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
