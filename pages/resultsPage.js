const { test, expect } = require('@playwright/test');

exports.ResultsPage = class resultsPage{
    constructor(page){

        this.page = page;

        this.origin_input = page.locator('#origin');
        this.destination_input = page.locator('#destination'); 
        this.departureDate_input = page.locator('[data-test-id="departure-date-input"]');
        this.noReturn_Btn = page.locator('[data-test-id="no-return-ticket"]');
        this.returnDate_input = page.locator('[data-test-id="return-date-input"]');
        this.passengersNum_field = page.locator('.additional-fields div:nth-of-type(2)');
    }

    async validateResults(origin, airportOrigin, destination, departureDate, passengersNum){
        await expect(this.origin_input).toHaveValue(airportOrigin);
        await expect(this.destination_input).toHaveValue(destination);
        let options = { weekday: 'short', month: 'long', day: 'numeric' };
        let depDate  = new Date(departureDate);
        let formattedDate = depDate.toLocaleDateString("en-US", options);
        await expect(this.departureDate_input).toHaveValue(formattedDate);
        await expect(this.returnDate_input).toHaveValue('');
        await expect(this.passengersNum_field).toHaveText(passengersNum + ' passengers');
    }
}