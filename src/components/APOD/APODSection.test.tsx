import '@testing-library/jest-dom';
import {render, screen} from '@testing-library/react';
import APODSection from "./APODSection";
import {APOD} from "../../types/nasa";

describe('APODSection', () => {
    it('does not render if required props is missing', () => {
        render(<APODSection apod={null}/>)
        expect(screen.queryByRole('heading')).toBeNull();
    });

    it('renders correctly if required props is provided', () => {
        const apod: APOD = {
            date: "date",
            explanation: "explanation",
            hdurl: "test",
            media_type: 'image',
            service_version: "version",
            title: "title",
            url: "url",
        }
        render(<APODSection apod={apod}/>)
        expect(screen.getAllByRole('heading')).toHaveLength(2);
        expect(screen.getByText(/title/i)).toBeInTheDocument();
        expect(screen.getByText(/explanation/i)).toBeInTheDocument();

    });
});