import React from "react";
import { render } from "@testing-library/react-native";
import DesiredForecastView from "../components/DesiredForcastView";

test("renders the desired forecast view correctly", () => {
    const current = {
        condition: { text: "Clear" },
        humidity: 60,
        cloud: 20,
        wind_kph: 10,
        temp_c: 28,
    };
    const location = {
        name: "City Name",
        country: "Country Name",
    };
    const { getByText } = render(
        <DesiredForecastView current={current} location={location} />
    );

    expect(getByText(/City Name, Country Name/)).toBeTruthy();
    expect(getByText(/28°/)).toBeTruthy();
    expect(getByText(/Clear/)).toBeTruthy();
    expect(getByText(/60%/)).toBeTruthy();
    expect(getByText(/20%/)).toBeTruthy();
    expect(getByText(/10 km\/h/)).toBeTruthy();
});
