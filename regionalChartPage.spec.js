var loginPage = require('../../../pages/loginPO/loginScreen.po');
var EnterpriseRegionalChartObject = require('../../../pages/enterprisePerformancePO/regionalChartPage.po.js');
var common = require('../commonMethods/startUpSyncMethod');
//var enterprisesearch = require('../../../pages/enterpriseSearchPO/enterpriseSearch.po');
var sync = require('../../../util/testData/constantTime');
var XL = require('../../../util/testData/XLReader');
var RegionalData = require('../../../util/testData/mockData.js');

const { browser } = require('protractor');

describe('Xpertrak EnterpriseSearch & Performance Application ', function()
{
  
       common.startUp();
       /*it('Login in to application with proper usename and credentials',function()
       {             
           loginPage.get("http://173.165.99.66/pathtrak/login/view.html#/login");
           sync.wait(5000);            
           loginPage.enterUserName("admin");
           loginPage.enterpassWord("admin");
           loginPage.clickSignin();
           sync.wait(15000);
           loginPage.get("http://173.165.99.66/pathtrak/enterprise/index.html#/performance");
           sync.wait(5000);         
       })*/
       

      it('Verify the regional performance page monthly',function()
       {
        var TEST_DATA = XL.read_from_excel('RegionGraph','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
        TEST_DATA.forEach(function(data)
          {    
            EnterpriseRegionalChartObject.get(data.PerformanceGraphURL);
            sync.wait(5000);
            EnterpriseRegionalChartObject.regionMonthlyButtonValidation();
          })
       })

      it('Verify the Graph data Monthly MacTrak',function()
       {
        var TEST_DATA = XL.read_from_excel('RegionGraph','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
        TEST_DATA.forEach(function(data)
        {   
          EnterpriseRegionalChartObject.verifyRegionHighChartItems("monthly","mactrak",data.checkboxItem1,data.checkboxItem2,data.Monthly_MacTrakGraphCount,data.Monthly_SpectralGraphCount,data.Daily_MacTrakGraphCount,data.Daily_SpectralGraphCount);                           
       })
       })

     it('Verify the regional page for Monthly Spectral',function()
       {  
         EnterpriseRegionalChartObject.verifyRegionMactrakDropdown("spectral");
       })     
       
       //need to run
       it('Verify the Graph data Monthly Spectral',function()
       { 
        var TEST_DATA = XL.read_from_excel('RegionGraph','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
        TEST_DATA.forEach(function(data)
        {  
        // EnterpriseRegionalChartObject.verifyRegionMactrakDropdown("spectral");
          EnterpriseRegionalChartObject.verifyRegionHighChartItems("monthly","spectral",data.checkboxItem1,data.checkboxItem2,data.Monthly_MacTrakGraphCount,data.Monthly_SpectralGraphCount,data.Daily_MacTrakGraphCount,data.Daily_SpectralGraphCount);
        })
       })

      it('Verify the regional page for Monthly both',function()
       { 
        var TEST_DATA = XL.read_from_excel('RegionGraph','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
        TEST_DATA.forEach(function(data)
        {   
          EnterpriseRegionalChartObject.verifyRegionMactrakDropdown("both");
          EnterpriseRegionalChartObject.verifyRegionHighChartItemsBoth("monthly","both",data.Monthly_BothGraphCount,data.Daily_BothGraphCount);          
        }) 
       })
       
 
     it('Verify the regional page for daily MacTrak',function()
       {  
        EnterpriseRegionalChartObject.clickRegionalDailyButton();
        EnterpriseRegionalChartObject.verifyRegionMactrakDropdown("mactrak");   
       })
      
      it('Verify the Graph data daily MacTrak',function()
       {
          var TEST_DATA = XL.read_from_excel('RegionGraph','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
          TEST_DATA.forEach(function(data)
          {     
            EnterpriseRegionalChartObject.verifyRegionHighChartItems("daily","mactrak",data.checkboxItem1,data.checkboxItem2,data.Monthly_MacTrakGraphCount,data.Monthly_SpectralGraphCount,data.Daily_MacTrakGraphCount,data.Daily_SpectralGraphCount);          
          })    
       })

       it('Verify the regional page for daily Spectral',function()
       {  
          EnterpriseRegionalChartObject.clickRegionalDailyButton();
          EnterpriseRegionalChartObject.verifyRegionMactrakDropdown("spectral");      
       })
      
       it('Verify the Graph data for daily Spectral',function()
       {
        var TEST_DATA = XL.read_from_excel('RegionGraph','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
        TEST_DATA.forEach(function(data)
        {  
          EnterpriseRegionalChartObject.verifyRegionHighChartItems("daily","spectral",data.checkboxItem1,data.checkboxItem2,data.Monthly_MacTrakGraphCount,data.Monthly_SpectralGraphCount,data.Daily_MacTrakGraphCount,data.Daily_SpectralGraphCount);          
        })
        
       })
      
       it('Verify the Graph count for daily Both',function()
       {
        var TEST_DATA = XL.read_from_excel('RegionGraph','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
        TEST_DATA.forEach(function(data)
        {  
          EnterpriseRegionalChartObject.clickRegionalDailyButton();
          EnterpriseRegionalChartObject.verifyRegionMactrakDropdown("both");
          EnterpriseRegionalChartObject.verifyRegionHighChartItemsBoth("daily","both",data.Monthly_BothGraphCount,data.Daily_BothGraphCount);          
        })        
       })      

     it('Verify the Uncheck button functionality of the regions',function()
        { //selall,Balto,West
          var TEST_DATA = XL.read_from_excel('RegionGraph','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
          TEST_DATA.forEach(function(data)
            {  
              EnterpriseRegionalChartObject.uncheckRegionsCheck2(data.checkboxShowAll,data.checkboxItem1,data.checkboxItem2);
              EnterpriseRegionalChartObject.verifyRegiongraphdataDisplayed(data.checkboxItem1);
              EnterpriseRegionalChartObject.uncheckandCheckRegionShowAll(data.checkboxShowAll,data.checkboxItem1,data.checkboxItem2);
              EnterpriseRegionalChartObject.unCheckRegionShowAll(data.checkboxShowAll,data.checkboxItem1,data.checkboxItem2);   
            })
          })
        

     it('Verify click on Regions Menu button functionlity', function()
        {
          EnterpriseRegionalChartObject.verifyclickRegionMenuButton();
        })
      
     it('Verify Region Zoom button', function()
        {

          EnterpriseRegionalChartObject.verifyRegionZoomButton();
        })
      
      
      
      
      
      
      
      })        