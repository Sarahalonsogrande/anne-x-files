import { of } from 'rxjs';

export const mockTranslateService = {
    get: (k: any) => of(k === 'appTitle' || k === 'appTitles.appTitle' ? 'Hello, anne-x-files' : k),
    instant: (k: any) => (k === 'appTitle' || k === 'appTitles.appTitle' ? 'Hello, anne-x-files' : k),
    stream: (k: any) => of(k === 'appTitle' || k === 'appTitles.appTitle' ? 'Hello, anne-x-files' : k),
    getParsedResult: (k: any) => of(k === 'appTitle' || k === 'appTitles.appTitle' ? 'Hello, anne-x-files' : k),
    use: (_: any) => { },
    setDefaultLang: (_: any) => { },
    setFallbackLang: (_: any) => { },
    getCurrentLang: () => 'en',
    getFallbackLang: () => null,
    getLangs: () => [],
    onLangChange: { subscribe: (_: any) => ({ unsubscribe() { } }) },
    onTranslationChange: { subscribe: (_: any) => ({ unsubscribe() { } }) },
    onFallbackLangChange: { subscribe: (_: any) => ({ unsubscribe() { } }) },
};

export const mockActivatedRoute = {
    snapshot: { params: {}, queryParams: {} },
    paramMap: of(new Map()),
    queryParamMap: of(new Map()),
};

export const mockRouter = {
    navigate: (_: any[]) => Promise.resolve(true),
    navigateByUrl: (_: any) => Promise.resolve(true),
};
