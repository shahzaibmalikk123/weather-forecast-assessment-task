# Component Tests Documentation

## DesiredForecastView Test

### Purpose

The purpose of this test is to verify that the DesiredForecastView component correctly displays the desired forecast information.

### Working

1. Mock the `current` and `location` props.
2. Render the `DesiredForecastView` component with the mocked props using the `render` function from `@testing-library/react-native`.
3. Use the `getByText` function to retrieve elements containing specific text.
4. Use `expect` statements to verify that the expected elements are rendered with the correct text content.

## DaywiseForecastView Test

### Purpose

This test aims to ensure that the DaywiseForecastView component displays the hourly forecast correctly.

### Working

1. Mock `currentHourIndex`, `extractDateAndTime`, `location`, and `weather` props.
2. Render the `DaywiseForecastView` component with the mocked props using the `render` function.
3. Use the `getByText` function to retrieve elements containing specific text.
4. Use `expect` statements to verify that the expected elements are rendered with the correct text content.

## WeeklyForecastView Test

### Purpose

The purpose of this test is to verify that the WeeklyForecastView component displays the weekly forecast data accurately.

### Working

1. Mock the `forecastData` prop with an array of forecast data.
2. Render the `WeeklyForecastView` component with the mocked prop using the `render` function.
3. Use the `getByText` function to retrieve elements containing specific text.
4. Use `expect` statements to verify that the expected elements are rendered with the correct text content.
