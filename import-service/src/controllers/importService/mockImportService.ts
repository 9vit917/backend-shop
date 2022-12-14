export default class MockImportService {
  static readonly signedUrl = 'mock-signed-url';

  public getSignedUrl(): Promise<string> {
    return Promise.resolve(MockImportService.signedUrl);
  }

  public parseFile<T>(): Promise<T[]> {
    return Promise.resolve([] as T[]);
  }
}