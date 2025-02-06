import '@testing-library/jest-dom';
import App from "./App";
import {render, screen} from '@testing-library/react';
import {nasaStore} from "./stores/NasaStore";

jest.mock('./stores/NasaStore', () => {
    return {
        nasaStore: {
            apod: null,
            neoList: [],
            loading: false,
            error: null,
            fetchAPOD: jest.fn(),
            fetchNEO: jest.fn(),

        }
    };
});

describe('App Component', () => {
    beforeEach(() => {
        // Reset all mocks and set initial state
        jest.clearAllMocks();
    });

    it('renders successfully without apod', () => {
        render(<App/>);
        expect(screen.getByText(/NASA Space Explorer/i)).toBeInTheDocument();
        expect(screen.getByText(/Near Earth Objects/i)).toBeInTheDocument();
    });

    it('renders successfully with apod', () => {
        nasaStore.apod = {
            date: "date",
            explanation: "explanation",
            hdurl: "test",
            media_type: 'image',
            service_version: "version",
            title: "title",
            url: "url",
        }
        render(<App/>);
        expect(screen.getByText(/NASA Space Explorer/i)).toBeInTheDocument();
        expect(screen.getByText(/Astronomy Picture of the Day/i)).toBeInTheDocument();
        expect(screen.getByText(/Near Earth Objects/i)).toBeInTheDocument();
        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Error/i)).not.toBeInTheDocument();
    });

    it('does not render header if loading', () => {
        nasaStore.loading = true;
        nasaStore.error = null;
        render(<App/>);
        expect(screen.queryByText(/NASA Space Explorer/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Loading/i)).toBeInTheDocument();
    });

    it('does not render header if error occurs', () => {
        nasaStore.loading = false;
        nasaStore.error = "Error";
        render(<App/>);
        expect(screen.queryByText(/NASA Space Explorer/i)).not.toBeInTheDocument();
        expect(screen.getByText(/Error/i)).toBeInTheDocument();

    });
});
