import {render, screen} from "@testing-library/react";
import NEOCard from "./NEOCard";

describe('NEOCard', () => {
        const toggleFavourite = jest.fn();
        const neo = {
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

        it('renders successfully', () => {
            render(<NEOCard neo={neo} onToggleFavorite={toggleFavourite}/>)
            expect(screen.getByText(/test name/i)).toBeInTheDocument();
            expect(screen.getByText(/Diameter/i)).toBeInTheDocument();
            expect(screen.getByText(/Hazardous: No/i)).toBeInTheDocument();
            expect(screen.getByRole('button')).toBeInTheDocument();
        });

        it('renders successfully for hazardous asteroid', () => {
            neo['is_potentially_hazardous_asteroid'] = true;
            render(<NEOCard neo={neo} onToggleFavorite={toggleFavourite}/>)
            expect(screen.getByText(/Hazardous: Yes/i)).toBeInTheDocument();
        })

        it('does not render button with favourite class if not favourite', () => {
            render(<NEOCard neo={neo} onToggleFavorite={toggleFavourite}/>)
            const buttonElement = screen.getByRole('button');
            expect(buttonElement).toBeInTheDocument();
            expect(buttonElement).not.toHaveClass('favorite-active');
        });

        it('renders button with favourite class if favourite', () => {
            neo['isFavorite'] = true;
            render(<NEOCard neo={neo} onToggleFavorite={toggleFavourite}/>)
            expect(screen.getByRole('button')).toHaveClass('favorite-active');
        });

        it('calls onToggleFavorite when button is clicked', () => {
            render(<NEOCard neo={neo} onToggleFavorite={toggleFavourite}/>)
            screen.getByRole('button').click();
            expect(toggleFavourite).toHaveBeenCalledWith('1');
        });

    }
);