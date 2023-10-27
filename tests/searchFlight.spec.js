const { test, expect } = require('@playwright/test');
import { SearchPage } from '../pages/searchPage'

test('Search flight', async ({ page, context }) => {

  const Search = new SearchPage(page);
 
  await Search.gotoSite()
  //fillSearchFields method expects city of Origin , airport of Origin and city of destination
  let originCity,originAirport ,destination, departureDate,passengersNum
  let array = [originCity = 'New York', originAirport = 'John F. Kennedy International Airport', destination = 'Berlin', departureDate = "10-30-2023", passengersNum = 2]
  await Search.fillSearchFields(...array)
  const newTab = await Search.submitSearch()
  const Results = new SearchPage(newTab);
  await Results.validateResults(...array)
  
});