import React from "react";
import { render } from "@testing-library/react-native";
import DaywiseForecastView from "../components/DaywiseForcastView";

test("renders the daywise forecast view correctly", () => {
    const currentHourIndex = 0;
    const extractDateAndTime = jest.fn();
    const location = {
        localTime: "2023-08-11 10:00",
    };
    const weather = {
        forecast: {
            forecastday: [
                {
                    hour: [
                        {
                            time: "2023-08-11 10:00",
                            temp_c: 28,
                            condition: { text: "Clear" },
                        },
                    ],
                },
            ],
        },
    };
    const { getByText } = render(
        <DaywiseForecastView
            currentHourIndex={currentHourIndex}
            extractDateAndTime={extractDateAndTime}
            location={location}
            weather={weather}
            currentCondition="Clear"
        />
    );

    expect(getByText(/10:00/)).toBeTruthy();
    expect(getByText(/28°/)).toBeTruthy();
});
