import '@testing-library/jest-dom';
import {getApiUrl} from "./api";


describe('api', () => {
    it('returns correct api for apod', () => {
        const endpoint = getApiUrl('APOD')
        expect(endpoint).toBe('https://api.nasa.gov/planetary/apod');
    });

     it('returns correct api for neo', () => {
        const endpoint = getApiUrl('NEO_FEED')
        expect(endpoint).toBe('https://api.nasa.gov/neo/rest/v1/feed');
    });
});