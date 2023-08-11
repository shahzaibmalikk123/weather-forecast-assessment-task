import React from "react";
import { render } from "@testing-library/react-native";
import WeeklyForecastView from "../components/WeeklyForecastView";

test("renders the weekly forecast view correctly", () => {
    const forecastData = {
        forecastday: [
            {
                date: "2023-08-12",
                day: { avgtemp_c: 28, condition: { text: "Clear" } },
            },
        ],
    };
    const { getByText } = render(
        <WeeklyForecastView
            forecastData={forecastData}
            currentCondition="Clear"
        />
    );

    expect(getByText(/28°/)).toBeTruthy();
});
