import '@testing-library/jest-dom';
import {nasaStore} from './NasaStore';

const axios = require("axios");
jest.mock("axios", () => ({
    get: jest.fn(),
}));

const {NASA_API_CONFIG, getApiUrl} = require('../config/api');
jest.mock('../config/api', () => ({
    getApiUrl: jest.fn(),
    NASA_API_CONFIG: {
        API_KEY: 'test',
    }
}));

beforeEach(() => {
    jest.clearAllMocks();  // Clears any mock setup before each test
});

describe('NasaStore', () => {
    const startDate = "2021-10-10";
    const endDate = "2021-10-11";

    const neoList = [
        {
            id: "1",
            neo_reference_id: "reference",
            name: "test name",
            nasa_jpl_url: "url",
            absolute_magnitude_h: 123,
            estimated_diameter: {
                kilometers: {
                    estimated_diameter_min: 123,
                    estimated_diameter_max: 123,
                },
            },
            is_potentially_hazardous_asteroid: false,
            close_approach_data: [{
                close_approach_date: "date",
                miss_distance: {
                    kilometers: "kilometers",
                },
                relative_velocity: {
                    kilometers_per_hour: "kilometers",
                },
            }
            ],
            isFavorite: false,
        }
    ]


    it('fetchAPOD calls api with correct key', async () => {
        getApiUrl.mockReturnValue('https://api.nasa.gov/planetary/apod');
        await nasaStore.fetchAPOD();
        expect(axios.get).toHaveBeenCalledWith('https://api.nasa.gov/planetary/apod?api_key=test');
    });

    it('fetchAPOD sets store attributes correctly with successful api call', async () => {
        axios.get.mockResolvedValue({data: "test-data"});
        await nasaStore.fetchAPOD();
        expect(nasaStore.apod).toEqual("test-data");
        expect(nasaStore.loading).toBe(false);
    });

    it('fetchAPOD sets store attributes correctly with unsuccessful api call', async () => {
        axios.get.mockRejectedValue(new Error('Network error'));
        await nasaStore.fetchAPOD();
        expect(nasaStore.loading).toBe(false);
        expect(nasaStore.error).toBe('Failed to fetch APOD');
    });


    it('fetchNEO calls api with correct key', async () => {
        getApiUrl.mockReturnValue('https://api.nasa.gov/neo/rest/v1/feed');
        await nasaStore.fetchNEO(startDate, endDate);
        expect(axios.get).toHaveBeenCalledWith('https://api.nasa.gov/neo/rest/v1/feed?start_date=2021-10-10&end_date=2021-10-11&api_key=test');
    });

    it('fetchNEO sets store attributes correctly with successful api call', async () => {
        axios.get.mockResolvedValue({data: {near_earth_objects: [{id: 1}]}});
        await nasaStore.fetchNEO(startDate, endDate);
        expect(nasaStore.neoList).toEqual([{id: 1}]);
        expect(nasaStore.loading).toBe(false);
    });

    it('fetchNEO sets store attributes correctly with unsuccessful api call', async () => {
        axios.get.mockRejectedValue(new Error('Network error'));
        await nasaStore.fetchNEO(startDate, endDate);
        expect(nasaStore.loading).toBe(false);
        expect(nasaStore.error).toBe('Failed to fetch NEO data');
    });

    it('toggleFavorite sets isFavorite to true if false', () => {
        nasaStore.neoList = neoList;
        expect(nasaStore.neoList[0].isFavorite).toBe(false);
        nasaStore.toggleFavorite('1');
        expect(nasaStore.neoList[0].isFavorite).toBe(true);
    });

    it('toggleFavorite does not change isFavorite if id not found', () => {
        nasaStore.neoList = neoList;
        expect(nasaStore.neoList[0].isFavorite).toBe(false);
        nasaStore.toggleFavorite('2');
        expect(nasaStore.neoList[0].isFavorite).toBe(false);
    });

    it('toggleFavorite sets isFavorite to false if true', () => {
        neoList[0].isFavorite = true;
        nasaStore.neoList = neoList;
        expect(nasaStore.neoList[0].isFavorite).toBe(true);
        nasaStore.toggleFavorite('1');
        expect(nasaStore.neoList[0].isFavorite).toBe(false);
    });

});