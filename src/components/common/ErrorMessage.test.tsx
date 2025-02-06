import {render, screen} from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe('Error Message Component', () => {
    const error = "Error";

    it('renders successfully', () => {
        render(<ErrorMessage message={error}/>);
        expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
});
