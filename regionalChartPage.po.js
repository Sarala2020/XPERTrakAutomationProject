const { element, browser } = require("protractor");


function EnterpriseRegionalChartObject()
{
      
var eleRegionMonthlyButton = element(by.xpath('//*[@id="fstdiv"]/div/div[3]/button[2]'));
var eleRegionDailyButton = element(by.xpath('//*[@id="fstdiv"]/div/div[3]/button[1]'));
var eleRegionMacTrackbutton = element(by.xpath("//html[1]/body[1]/app-root[1]/div[1]/main[1]/app-charts[1]/div[1]/div[1]/div[1]/as-split[1]/as-split-area[1]/app-region-chart[1]/div[1]/div[1]/div[1]/div[3]/select[1]"));
var eleregionHighchart = element(by.xpath("//as-split[1]/as-split-area[1]/app-region-chart[1]/div[1]/div[2]/div[1]/div[2]/highcharts-chart[1]/div[1]/*[local-name()='svg'][1]/*[name()='g'][5]/*[name()='g'][3]/*[name()='rect'][1]"));
var eleregionHighchartforCheck1 =element(by.xpath("//as-split[1]/as-split-area[1]/app-region-chart[1]/div[1]/div[2]/div[1]/div[2]/highcharts-chart[1]/div[1]/*[local-name()='svg'][1]/*[name()='g'][5]/*[name()='g'][1]/*[name()='rect'][1]"));
var eleregionHighchartsAll = element.all(by.xpath("//as-split[1]/as-split-area[1]/app-region-chart[1]/div[1]/div[2]/div[1]/div[2]/highcharts-chart[1]/div[1]/*[local-name()='svg'][1]/*[name()='g'][5]/*[name()='g'][3]/*[name()='rect']"));
var eleRegionMacTrackbuttonOptions = element.all(by.tagName('option'));
var eleBaltoCheckbox = element(by.xpath('//*[@id="Balto"]'));
var eleRegionShowAllCheckbox = element(by.xpath('//*[@id="selall"]'));
var eleWestCheckbox = element(by.xpath('//*[@id="West"]'));
var  eleRegionHighChartdestination = element(by.xpath("//as-split[1]/as-split-area[1]/app-region-chart[1]/div[1]/div[2]/div[1]/div[2]/highcharts-chart[1]/div[1]/*[local-name()='svg'][1]/*[name()='g'][5]/*[name()='g'][3]/*[name()='rect'][2]"));
var eleRegionResetZoombutton = element(by.xpath("//*[local-name() = 'g' and @class = 'highcharts-button highcharts-reset-zoom          highcharts-button-normal']"));
var eleRegionMenuButton = element(by.xpath('//as-split/as-split-area[1]/app-region-chart/div/div[1]/div/div[1]/a[1]/i'));
//var eleResetZoombutton = element(by.css('g.highcharts-button.highcharts-reset-zoom'));
  
    var toolTipCount;
    var TotalRegionChartsResults;
    var TotalSystemChartsResults;
    var mouseEle3;
    
this.get = function(url){

    browser.get(url);
};

this.regionMonthlyButtonValidation = function()
{
   // monthlyButton.click();
   expect(eleRegionMonthlyButton.isEnabled()).toBe(false);   
}

 this.verifyRegionHighChartItems = function(buttonValue,mactrakdropdownvalue,checkItem1,checkItem2,Monthly_MacTrakGraphCount,Monthly_SpectralGraphCount,Daily_MacTrakGraphCount,Daily_SpectralGraphCount)
 {    
        // To get the rect values related to graphs count for dialy
        //element.all(by.xpath("//split-area[1]/regionchart[1]/div[1]/div[2]/div[1]/div[2]/chart[1]/div[1]/*[local-name()='svg'][1]/*[name()='g'][5]/*[name()='g'][1]/*[name()='rect']")).count().then(function(size)
        eleregionHighchartsAll.count().then(function(size)
        {
            TotalRegionChartsResults = size;
            console.log("RegionChartsCount:" +TotalRegionChartsResults);  
            
            for(var i = 1; i<=TotalRegionChartsResults; i++)
                {                                        
                var mouseEle = element(by.xpath("//as-split[1]/as-split-area[1]/app-region-chart[1]/div[1]/div[2]/div[1]/div[2]/highcharts-chart[1]/div[1]/*[local-name()='svg'][1]/*[name()='g'][5]/*[name()='g'][3]/*[name()='rect']["+i+"]"));
                browser.actions().mouseMove(mouseEle).perform().then(function()
                {
                    browser.sleep(5000);                  

                })
                mouseEle.click().then(function()
                    {
                    browser.sleep(10000);  
                    element.all(by.css("g.highcharts-tooltip tspan")).count().then(function(size)
                       {
                        toolTipCount = size;
                        //console.log(toolTipCount);
                       }) 
               
                         element.all(by.css("g.highcharts-tooltip")).each(function(item)			
                           {                        
                           for(var Counter = 1; Counter<=toolTipCount; Counter++)
                               {
                                   item.element(by.css("tspan:nth-of-type("+Counter+")")).getText().then(function(value)
                                       {
                                          // console.log("TooltipText="+ value);
                                          switch(value){
                                            case "MACTrak™":
                                                if(mactrakdropdownvalue== 'mactrak'|| mactrakdropdownvalue== 'both') 
                                               { expect(value).toMatch("MACTrak™");}
                                                break;
                                             case "Spectral":
                                                if(mactrakdropdownvalue== 'spectral'|| mactrakdropdownvalue== 'both')  
                                               { expect(value).toMatch("Spectral");}
                                                 break;                                          
            
                                            case checkItem1:
                                                expect(value).toMatch(checkItem1);
                                                break;

                                            case checkItem2:
                                                expect(value).toMatch(checkItem2);
                                                break;                               
            
                                            case "Percent Failed:":
                                                expect(value).toMatch("Percent Failed:");
                                                break;                               
            
                                            case "Performance Severity:":
                                                expect(value).toMatch("Performance Severity:");
                                                break;                               
                                                
                                            case "Date:":
                                                expect(value).toMatch("Date:");
                                                break;     
                                        }

                                       })
                                }        
                            })                    
                    })
                }
                if(buttonValue == "monthly" && mactrakdropdownvalue == "spectral")
                {
                    expect(TotalRegionChartsResults).toBe(Monthly_SpectralGraphCount);
                }
               else if(buttonValue == "monthly" && mactrakdropdownvalue== "mactrak") 
                {
                    expect(TotalRegionChartsResults).toBe(Monthly_MacTrakGraphCount);
                }                
                else if(buttonValue == "daily" && mactrakdropdownvalue == "spectral")
                {
                    expect(TotalRegionChartsResults).toBe(Daily_SpectralGraphCount);
                }
               else if(buttonValue == "daily" && mactrakdropdownvalue== "mactrak") 
                {
                    expect(TotalRegionChartsResults).toBe(Daily_MacTrakGraphCount);
                }                
            })        
    }
this.verifyRegionHighChartItemsBoth = function(buttonValue,mactrakdropdownvalue,Monthly_BothGraphCount,Daily_BothGraphCount)
{
    eleregionHighchartsAll.count().then(function(size)
        {
            TotalRegionChartsResults = size;
            console.log("RegionChartsCount:" +TotalRegionChartsResults);
            if(buttonValue == "monthly" && mactrakdropdownvalue== "both")
            { 
                expect(TotalRegionChartsResults).toBe(Monthly_BothGraphCount);
            }
            else if(buttonValue == "daily" && mactrakdropdownvalue== "both")
            {
                expect(TotalRegionChartsResults).toBe(Daily_BothGraphCount);
            }
        })
}

this.verifyRegionMactrakDropdown = function(name)
 {  
     var name;
    eleRegionMacTrackbutton.click();
    eleRegionMacTrackbuttonOptions.each(function(item)
    {
        item.getAttribute("value").then(function(values)
        {
            if(values == name)
            {
                item.click();
                browser.sleep(5000);  
                return true;            
            }                      
            //mactrak , spectral,  both
        })
     })
     expect(eleregionHighchart.isDisplayed()).toBe(true);
 }
 

 this.clickRegionalDailyButton = function()
{
    eleRegionDailyButton.click(); 
  // eleregionHighchart.isPresent().toBe(true);   
}

this.uncheckRegionsCheck2 = function(chkShowAll,checkItem1,checkItem2)
    {
        //Uncheck one of the regions from the Regions panel
        element(by.id(checkItem2)).click().then(function()
            {
                expect(element(by.id(checkItem1)).isSelected()).toBe(true);
                expect(element(by.id(chkShowAll)).isSelected()).toBe(false);
                expect(eleregionHighchartforCheck1.isDisplayed()).toBe(true);
            })
    }
this.verifyRegiongraphdataDisplayed = function(checkItem1)
    {    
        browser.actions().mouseMove(eleregionHighchartforCheck1).perform();
        eleregionHighchartforCheck1.click().then(function()
            {
            browser.sleep(10000);
            element.all(by.css("g.highcharts-tooltip tspan")).count().then(function(size)
                {
                toolTipCount = size;
                //console.log(toolTipCount);
                })

                element.all(by.css("g.highcharts-tooltip")).each(function(item)			
                {                        
                    for(var Counter = 1; Counter<=toolTipCount; Counter++)
                        {
                            item.element(by.css("tspan:nth-of-type("+Counter+")")).getText().then(function(value)
                                {
                                    if(value==checkItem1)
                                    {
                                        expect(value).toMatch(checkItem1);
                                        console.log(value);                                    
                                    }
                                })
                        }
                })
            })    
    }
this.uncheckandCheckRegionShowAll = function(chkShowAll,checkItem1,checkItem2)
    {
        browser.refresh();
        browser.sleep(10000);
        element(by.id(chkShowAll)).click().then(function()
            {
                expect(element(by.id(checkItem1)).isSelected()).toBe(false);
                expect(element(by.id(checkItem2)).isSelected()).toBe(false);
                expect(eleregionHighchart.isPresent()).toBe(false);
            })
        element(by.id(chkShowAll)).click().then(function()
            {
                expect(element(by.id(checkItem1)).isSelected()).toBe(true);
                expect(element(by.id(checkItem2)).isSelected()).toBe(true);
                expect(eleregionHighchart.isDisplayed()).toBe(true);
            })
    }
this.unCheckRegionShowAll = function(chkShowAll,checkItem1,checkItem2)
    {
        element(by.id(checkItem1)).click();
        element(by.id(checkItem2)).click();
        expect(element(by.id(chkShowAll)).isSelected()).toBe(false);
        expect(eleregionHighchart.isPresent()).toBe(false);
       //expect(element(by.name("group")).get(1).isSelected()).toBe(true);      
       
    }

this.verifyclickRegionMenuButton = function()
    {
        eleRegionMenuButton.click().then(function()
            {
                //expect(element(by.xpath('//*[@id="snddiv"]/div/div[1]')).isDisplayed()).toBe(false);
                expect(eleRegionShowAllCheckbox.isDisplayed()).toBe(false);
                browser.sleep(5000);
            })
        //Click again on menu button
        eleRegionMenuButton.click().then(function()
            {
                //expect(element(by.xpath('//*[@id="snddiv"]/div/div[1]')).isDisplayed()).toBe(true);
                expect(eleRegionShowAllCheckbox.isDisplayed()).toBe(true);
            })    
    }
    

this.verifyRegionZoomButton = function()
    {    
        browser.refresh();
        browser.sleep(10000);    
        eleregionHighchart.click();
        browser.executeScript("document.body.style.zoom='90%';");
        browser.driver.actions().dragAndDrop(eleregionHighchart,eleRegionHighChartdestination).perform().then(function()
            {
                browser.sleep(3000);
                //executeScript('document.getElementsByName')
               // expect(eleRegionResetZoombutton.isPresent()).toBe(true);
              //  eleRegionResetZoombutton.click();
                browser.sleep(3000);
            })        
    };
}
module.exports = new EnterpriseRegionalChartObject();