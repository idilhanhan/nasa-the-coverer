import {render, screen} from "@testing-library/react";
import NEOSection from "./NEOSection";

describe('NEOCard', () => {
        const toggleFavourite = jest.fn();
        const neoList = [{
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
        }]

        it('renders successfully', () => {
            render(<NEOSection neoList={neoList} onToggleFavorite={toggleFavourite}/>)
            expect(screen.getByText(/Near Earth Objects/i)).toBeInTheDocument();
            expect(screen.getByText(/test name/)).toBeInTheDocument();
        });

    }
);