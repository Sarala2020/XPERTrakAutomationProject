var loginPage = require('../../../pages/loginPO/loginScreen.po');
var common = require('../commonMethods/startUpSyncMethod');
var enterprisesearch = require('../../../pages/enterpriseSearchPO/enterpriseSearch.po');
var sync = require('../../../util/testData/constantTime');
var XL = require('../../../util/testData/XLReader');
const { browser } = require('protractor');
const { verifyAccordion } = require('../../../pages/enterpriseSearchPO/enterpriseSearch.po');

//const { get } = require('../../../pages/enterpriseSearchPO/enterpriseSearch.po');

describe('Xpertrak EnterpriseSearch page validations:', function()
{        
  //browser.waitForAngularEnabled(false);

    common.startUp();
    /*it('Login in to application with proper usename and credentials',function()
        {             
            loginPage.get("http://173.165.99.66/pathtrak/login/view.html#/login");
            sync.wait(5000);            
            loginPage.enterUserName("admin");
            loginPage.enterpassWord("admin");
            loginPage.clickSignin();
            sync.wait(15000);
            //loginPage.get("http://173.165.99.66/pathtrak/enterprise/index.html#/entsearch");
            loginPage.get("http://173.165.99.66/pathtrak/enterprise/index.html#/entsearch");
            sync.wait(5000);
            /*element(by.css("button.menu-button.menu-toggle")).click();
            sync.wait(5000);
            element(by.css("span[class='menu-text-ellipse menu-text darkMenu']")).click();
            sync.wait(5000);
           
            //loginPage.verifyResult();
        })*/   

    it('Enterprise search field editable validation',function()
    {
      var TEST_DATA = XL.read_from_excel('EnterpriseSearch','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
      TEST_DATA.forEach(function(data)
      {      
        enterprisesearch.get(data.EnterpriseSearchURL);
        sync.wait(5000);
        enterprisesearch.enterSearchitem(data.RPMSearchItem1);

        enterprisesearch.verifySugessionList();
      })      
    });    

    it('Enterprise search with valid text ',function()
      {
        var TEST_DATA = XL.read_from_excel('EnterpriseSearch','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
        TEST_DATA.forEach(function(data)
        {                
          enterprisesearch.enterSearchitem(data.RPMSearchItem2);
          enterprisesearch.clickSugessionItem();
          enterprisesearch.verifyAccordion();
        })
      });
    it('Enterprise search field validation after sugession added',function()
      {
        var TEST_DATA = XL.read_from_excel('EnterpriseSearch','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
        TEST_DATA.forEach(function(data)
        {
          enterprisesearch.enterSearchitem(data.RPMSearchItem1);                   
          enterprisesearch.clickSugessionItem();
          enterprisesearch.verifyEditsearchbox();
        })  
      });
    it('Enterprise search with invalid text',function()
      {
        var TEST_DATA = XL.read_from_excel('EnterpriseSearch','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
        TEST_DATA.forEach(function(data)
        { 
          //enterprisesearch.enterSearchitem("QWE");
            enterprisesearch.invalidErrormsg(data.invalidSearchItem);             
        });
      })          

    /*validate whether only 4 accordions are adding */      
    it('Enterprise search verifying the count of the sugessions',function()
      {
        var TEST_DATA = XL.read_from_excel('EnterpriseSearch','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
        TEST_DATA.forEach(function(data)
        {         
          /*loginPage.get("http://173.165.99.66/pathtrak/enterprise/index.html#/performance");
          sync.wait(5000);
          element(by.css("button.menu-button.menu-toggle")).click();
          sync.wait(5000);
          element(by.css("span[class='menu-text-ellipse menu-text darkMenu']")).click();
          sync.wait(5000);*/
          browser.refresh();
          sync.wait(5000);
          enterprisesearch.enterSearchitem(data.addMultipleSearchItem1);
          enterprisesearch.addingMultiplesearch(data.addMultipleSearchItem1);              
          enterprisesearch.enterSearchitem(data.addMultipleSearchItem2);
          enterprisesearch.addingMultiplesearch(data.addMultipleSearchItem2);              
          enterprisesearch.enterSearchitem(data.addMultipleSearchItem3);
          enterprisesearch.addingMultiplesearch(data.addMultipleSearchItem3);
          enterprisesearch.enterSearchitem(data.addMultipleSearchItem3);
          enterprisesearch.addingMultiplesearch(data.addMultipleSearchItem4);
          enterprisesearch.enterSearchitem(data.addMultipleSearchItem4);
          enterprisesearch.addingMultiplesearch(data.addMultipleSearchItem5);                   
          enterprisesearch.verifyAccordionsize();
        })                
      })

    /* validate whether only 4 records are adding and 5th record is replcaed by 
    closing 1st record and 5th record appears as recent search */

    it('Enterprise search: verify the count of the accordion and validate the 5th accordion is replaced by closing 1st accordion',function()
    {
      var TEST_DATA = XL.read_from_excel('EnterpriseSearch','./e2e/e2e/util/testData/XperTrakTestData.xlsx')
      TEST_DATA.forEach(function(data)
        {                                       
          enterprisesearch.verifyAddedmaxAccordion(data.verifyFirstAccordionItem1,data.verifyFourthAccordionItem);
        })
    })

    /*expand n close records after clicking on ^ n validate 5 live data presence n 
    Check that the latest searched item record is open by default*/

    it('Enterprise search: expand n close records after clicking on ^ n validate 5 live data presence',function()
      {         
          enterprisesearch.verifyFirstaccordionElements();           
      })
    
    /*expand all records by cclicking on ^ n validate 5 live data presence and they are clickable links*/

    it('Enterprise search: expand n close records after clicking on ^ n validate 5 live data presence and clickable',function()
      {         
        enterprisesearch.expandAllAccordion();
        enterprisesearch.verifyAccordionelementclickable();          
      })

    /*clicking on "x" icon of each record to remove accordion*/
    it('Enterprise search: clicking on "x" icon of each record to remove accordion',function()
      {         
        enterprisesearch.accordionClose();         
      })
    })
                                                                    

     /*       
            
   })          
         /* element.all(by.xpath('//div[@class="search-wrapper"]/div'))-accordionit('Enterprise search addding one rpm port',function()
            {
              browser.waitForAngularEnabled(false);
              browser.get('http://173.165.99.66/pathtrak/enterprise/view.html#/entsearch');
          
              
               browser.get('http://173.165.99.66/pathtrak/enterprise/index.html#');
          browser.actions().mouseMove(element(by.id("searchBox")).sendKeys(protractor.Key.ENTER)).perform().then(function()
               {                 
                element(by.xpath('//*[@id="searchBox"]')).sendKeys(RPM 1 Port 1).then(function()
              {
                browser.sleep(5000);
              })
            })
          element(by.xpath('//*[@id="suggestions"]/li[1]')).click().then(function()
             {
               browser.sleep(5000);
             })
          expect(element.all(by.css("a[class='ng-binding']")).isPresent()).toBe(true);
          })*/
          
          
         /* it('Enterprise search with invalid text',function()
          { 
            browser.waitForAngularEnabled(false);
            browser.get('http://173.165.99.67/pathtrak/enterprise/view.html#/entsearch');
            browser.get('http://173.165.99.66/pathtrak/enterprise/index.html#');
          browser.actions().mouseMove(element(by.id("searchBox")).sendKeys(protractor.Key.ENTER)).perform().then(function()
               {                 
                element(by.xpath('//*[@id="searchBox"]')).sendKeys("QWE" + protractor.Key.ENTER).then(function()
              {
                browser.sleep(5000);
              })
            })
            
            element(by.xpath('//*[@id="spltcontnr"]/section/div/div[1]/div/div/div/div[2]/div[1]/div/span')).getText().then(function(text)
            {
             console.log(text);
            })
          })*/

          
          
         /* function searchrpm(name)
              {
                var name;
                browser.actions().mouseMove(element(by.id("searchBox")).sendKeys(protractor.Key.ENTER)).perform().then(function()
               {                 
                element(by.xpath('//*[@id="searchBox"]')).sendKeys(name).then(function()
              {
                browser.sleep(5000);
              })
            })
             element.all(by.xpath('//*[@id="suggestions"]/li')).count().then(function(count)
              //element.all(by.className("blockSpan ng-binding ng-scope")).count().then(function(count)
                {
                   
                   element.all(by.xpath('//*[@id="suggestions"]/li')).getText().then(function(item)
                 {
                
                
                    for(var i=0;i<count;i++)
                  {
                      //if(expect(item[i]).toContain(name))
                      if(item[i].indexOf(name) != -1)
                   {
                     
                      
                     
                       element(by.xpath('//*[@id="suggestions"]/li['+(i+1)+']')).click().then(function()
                       {
                         browser.sleep(3000);
                       })
               
                    }
                  }
                }); 
            });
          */
        /*  it('Enterprise search rpm port addding multiple suggestions',function()
            {
              browser.waitForAngularEnabled(false);
              browser.get('http://173.165.99.66/pathtrak/enterprise/view.html#/entsearch');
          
              
               browser.get('http://173.165.99.66/pathtrak/enterprise/index.html#');
            searchrpm("RPM 1 Port 4");
            element(by.xpath('//*[@id="searchBox"]')).clear();
            searchrpm("RPM 1 Port 3");
            element(by.xpath('//*[@id="searchBox"]')).clear();
            searchrpm("RPM 1 Port 5");
            element(by.xpath('//*[@id="searchBox"]')).clear();
            searchrpm("RPM 1 Port 6");
            element(by.xpath('//*[@id="searchBox"]')).clear();
            searchrpm("RPM 1 Port 7");
            element.all(by.xpath('//div[@class="search-wrapper"]/div')).getText().then(function(text)
            {
              var valid = "RPM 1 Port 4";
              if(text.indexOf(valid) == -1)
              {
                console.log(text);
              }
              
            })


        })
    }
            
    */
          


   



