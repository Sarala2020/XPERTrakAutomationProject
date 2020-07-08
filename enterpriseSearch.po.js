const { browser, element } = require("protractor");


function EnterpriseSearchobject()
{
var eleallSearchitems = element.all(by.xpath('//div[@class="search-wrapper"]/div'));
var eleSearchfield = element(by.xpath('//*[@id="searchBox"]'));
var eleSearchbox = element(by.id("searchBox"));
var eleSugessionitem = element(by.xpath('//*[@id="suggestions"]/li[1]'));
var suggestionsList = element(by.xpath('//*[@id="suggestions"]'));
//var verifySugession = element.all(by.css("a[class='ng-binding']"));
var invalidSearch = element(by.xpath('//*[@id="spltcontnr"]/section/div/div[1]/div/div/div/div[2]/div[1]/div/span'));
//var eleInvaliderrormsgobject = element(by.css('div:nth-child(2) > span:nth-child(1)'));
//var eleInvaliderrormsg = element(by.css('div.alert.alert-danger.alert-dismissible div:nth-child(2) > span:nth-child(1)'));
var eleInvaliderrormsg = element(by.xpath('//html/body/app-root/div/main/app-search/div/div/div[1]/app-entsearch/div[2]/div/span'));
//var eleSugessionitemsList  = element.all(by.className("blockSpan ng-binding ng-scope"));
var eleSugessionitems = element.all(by.xpath('//*[@id="suggestions"]/li'));
//var eleFirstaccordionitem = element(by.xpath('*[@id="spltcontnr"]/section/div/accordion/accordion-group/div/div[1]'));
//var eleFirstaccordionitem = element(by.css('span:nth-child(1) > span:nth-child(1)'));
//var accordionssSize = element(by.xpath('*[@id="spltcontnr"]/section/div/accordion'));
//var eleAccordionsize = element.all(by.xpath('//div[@class="search-wrapper"]/div'));
//var eleFifthaccordionitem = element(by.xpath("/html/body/app-root/div/main/app-search/div/div/div[2]/app-accordion/div/div[1]/h4/a/span/span"));

var eleFirstaccordionitem = element(by.xpath("/html[1]/body[1]/app-root[1]/div[1]/main[1]/app-search[1]/div[1]/div[1]/div[3]/app-accordion[1]/div[1]/div[1]/h4[1]/a[1]/span[1]/span[1]"));
var eleFourthaccordionitem = element(by.xpath("/html[1]/body[1]/app-root[1]/div[1]/main[1]/app-search[1]/div[1]/div[1]/div[6]/app-accordion[1]/div[1]/div[1]/h4[1]/a[1]/span[1]/span[1]"));
                                             // /html[1]/body[1]/app-root[1]/div[1]/main[1]/app-search[1]/div[1]/div[1]/div[3]/app-accordion[1]/div[1]/div[1]
                                           ///html/body/app-root/div/main/app-search/div/div/div[3]/app-accordion/div/div[1]/h4/a/span/span 
                                           ///html/body/app-root/div/main/app-search/div/div/div[4]/app-accordion/div/div[1]/h4/a/span/span

var eleAccordionsize = element.all(by.css('span:nth-child(1) > span:nth-child(1)'));
var eleExpandaccordion = element(by.css("span:nth-child(1) span:nth-child(1) > i.fa.fa-chevron-up"));
var eleLinksinaccordion = element(by.css("a[class='ng-binding']"));
var eleCloseaccordion = element(by.xpath("//div[3]//app-accordion[1]//div[1]//div[1]//h4[1]//a[1]//span[1]//button[1]")); 
//var eleAccordionsize = element.all(by.xpath('*[@id="spltcontnr"]/section/div/accordion'));

//var eleAccordionsize = element.all(by.css('section:nth-child(1) div.container.search accordion accordion-group'));

this.get = function(url){

    browser.get(url);
};

/*this.searchEditboxClear = fuction()
{
  eleSearchfield.clear();
};*/

this.enterSearchitem = function(searchitem)
    {
    eleSearchfield.clear();  
    browser.actions().mouseMove(eleSearchbox).sendKeys(protractor.Key.ENTER).perform().then(function()
    {                 
      //eleSearchfield.sendKeys(searchitem + protractor.Key.ENTER).then(function()
      eleSearchfield.sendKeys(searchitem).then(function()
   {
     browser.sleep(5000);
   })
 })
    //eleSearchfield.sendKeys(searchitem);
};

this.verifyEditsearchbox = function()
{
      eleSearchfield.getText().then(function(eleSearchfieldtext)
      {
        eleFirstaccordionitem.getText().then(function(accordionValue)
          {
              expect(accordionValue).toContain(eleSearchfieldtext);
          })            
      })
}

this.clickSugessionItem = function()
{
    eleSugessionitem.click();
    browser.sleep(5000);
};

this.verifySugessionList = function()
{
  expect(eleSugessionitem.isDisplayed()).toBe(true);
};

this.verifyAccordion = function()
{
  expect(eleFirstaccordionitem.isPresent()).toBe(true);
};

this.invalidErrormsg = function(searchitem)
{
  eleSearchfield.clear();
  eleSearchfield.sendKeys(searchitem + protractor.Key.ENTER).then(function()
  {
    //eleInvaliderrormsg.click();
    browser.sleep(5000);
    expect(eleInvaliderrormsg.isDisplayed()).toBe(true);
    eleInvaliderrormsg.getText().then(function(invalidmsg)
    {
      expect(invalidmsg).toContain("QWE - Pick one from the suggested list, if there are no suggestions popping up then element not present.");      
    })
  })
};

this.addingMultiplesearch = function(searchItem)
{
  eleSugessionitems.count().then(function(count)
     {
       eleSugessionitems.getText().then(function(item)
       {        
          for(var i=0;i<count;i++)
             {            
                if(item[i] == searchItem)
               {     
                   element(by.xpath('//*[@id="suggestions"]/li['+(i+1)+']')).click().then(function()
                       {
                         browser.sleep(10000);
                         return true;
                       })          
                }
              }
        });      
    });
};
//RPM 1 Port 4,
this.verifyAddedmaxAccordion = function(firstSearchItem,fifthSearchItem)
{
    eleFirstaccordionitem.getText().then(function(text)
          {
            if(text.indexOf(fifthSearchItem) == -1)
                {                  
                  expect(text).toContain(fifthSearchItem);
                }
          })
    eleFourthaccordionitem.getText().then(function(text)
    {
      if(text.indexOf(firstSearchItem) == -1)
          {                  
            expect(text).not.toContain(firstSearchItem);
          }
    })      
  }
   
     /* eleFirstaccordionitem.getText().then(function(text)
        {
          //var valid = firstSearchitem;
          if(text.indexOf(firstSearchitem) == -1)
          {
            expect(text).toBe(false);
          }
        }*/ 

this.verifyAccordionsize = function()
{     
      eleAccordionsize.count().then(function(value)
          {
           console.log(value);
           expect(value).toEqual(4);
          })
      //eleSearchfield.clear();
};

this.verifyFirstaccordionElements = function()
{
  expect(eleExpandaccordion.isDisplayed()).toBe(true);
  expect(eleLinksinaccordion.isDisplayed()).toBe(true);
  //decrease the expand
  eleExpandaccordion.click().then(function()
  {
    expect(eleLinksinaccordion.isDisplayed()).toBe(false);
  })  
}; 

/*expand all records by cclicking on ^ n validate 5 live data presence*/

this.expandAllAccordion = function()
{            
  for(var i=3;i<6;i++)
    {      
      element(by.xpath('//div/main/app-search/div/div/div['+(i+1)+']')).click().then(function()
          {
            browser.sleep(7000);
            console.log(i+1);
            for(var a=4;a<=6;a++)
            {
              expect(element(by.xpath('//div['+a+']//app-accordion[1]//div[1]//div[2]//div[1]//ul[1]')).isPresent()).toBe(true);
            //expect(eleLinksinaccordion.isDisplayed()).toBe(true);
            //return true;
            }
            
          })           
    } 
};

/* Verify accordion 5 elements are clickable */
this.verifyAccordionelementclickable = function()
{            
  for(var a=0;a<=4;a++)
    {      
      browser.sleep(7000);
      var mylink = "http://173.165.99.66/pathtrak/direct";
      var hrefElement = element(by.xpath("/html/body/app-root/div/main/app-search/div/div/div[3]/app-accordion/div/div[2]/div/ul/li["+(a+1)+"]/a"));
      expect(hrefElement.getAttribute('href')).toContain(mylink);
      /*browser.getAllWindowHandles().then(function(handles)
          {
          browser.switchTo().window(handles[1]).then(function()
          {
          browser.sleep(15000);
          browser.switchTo().alert().accept();   
          console.log(browser.getTitle());
          })
          });
          return true;*/    
    }
  };


this.accordionClose = function()
  {
    for(var i=1;i<=4;i++)
    {
      //element(by.xpath("//div["+i+"]//app-accordion[1]//div[1]//div[1]//h4[1]//a[1]//span[1]//button[1]"));
      /*eleCloseaccordion.click().then(function()
      {
        expect(eleCloseaccordion.isPresent()).toBe(false);
      })*/
      eleCloseaccordion.click();      
    }
    expect(eleCloseaccordion.isPresent()).toBe(false);
    expect(element(by.css("a[class='ng-binding']")).isPresent()).toBe(false);
  }      
  
}
module.exports = new EnterpriseSearchobject();