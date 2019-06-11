import { HarvesterModule } from './harvester.module';

describe('CatalogModule', () => {
  let catalogModule: HarvesterModule;

  beforeEach(() => {
    catalogModule = new HarvesterModule();
  });

  it('should create an instance', () => {
    expect(catalogModule).toBeTruthy();
  });
});
