import {render, screen} from "@testing-library/react";
import LoadingSpinner from "./LoadingSpinner";

describe('Loading Spinner Component', () => {
    it('renders successfully', () => {
        render(<LoadingSpinner />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
});
