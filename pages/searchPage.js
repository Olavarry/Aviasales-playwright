const { test, expect } = require('@playwright/test');

exports.SearchPage = class searchPage{
    constructor(page){
        this.page = page

        this.theme_toggle = page.locator('[data-selene-widget="navbar"] [data-test-id="switch"]')
        this.origin_input = page.locator('#origin');
        this.destination_input = page.locator('#destination');
        this.departureDate_option = page.getByLabel('Mon Oct 30 2023').getByText('30');
        this.departureDate_input = page.locator('[data-test-id="departure-date-input"]');
        this.noReturn_Btn = page.locator('[data-test-id="no-return-ticket"]');
        this.passengers_field = page.locator('[data-test-id="passengers-field"]');
        this.incrPassengers_link = page.locator('[data-test-id="passengers-adults-field"] a').nth(1);
        this.setPassengerNum = page.locator('.additional-fields__passenger-value').nth(0);
        this.returnDate_input = page.locator('[data-test-id="return-date-input"]');
        this.passengersNum_field = page.locator('.additional-fields div:nth-of-type(2)');
        this.sumbit_btn = page.locator('[data-test-id="form-submit"]');

    }

    async gotoSite(){
        await this.page.goto('https://www.aviasales.com/');
    }

    async darkTheme(){
        await this.theme_toggle.click()
    }

    async fillSearchFields(origin, airportOrigin, destination, departureDate, passengersNum){
        await this.origin_input.fill(origin);
        await this.page.getByText(airportOrigin).click();
        await this.destination_input.fill(destination);
        await this.page.getByText(destination).click();
        //format date to search in date input
        let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
        let depDate  = new Date(departureDate);
        let formattedDate = depDate.toLocaleDateString("en-US", options).replaceAll(',', '');
        await this.page.getByLabel(formattedDate).getByText(formattedDate.split(' ')[2]).click();
        await this.noReturn_Btn.click();
        await this.passengers_field.click();
        await this.page.pause()
        while(await this.setPassengerNum.textContent() < passengersNum){
            await this.incrPassengers_link.click();
        }  
    }

    async submitSearch(){
        const pagePromise = this.page.waitForEvent('popup');
        await this.sumbit_btn.click();
        const newTab = await pagePromise;
        return newTab;
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