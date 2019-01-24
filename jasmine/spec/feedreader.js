/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
 //Global Flags
 let firstClick = false;
 let secondClick = false;
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('url is valid', function(){
          allFeeds.forEach(function(element){
            expect(element.url).toBeDefined();
            expect(isStr(element.url)).toBe(true); //This checked is the value is a string and NOT null or empty
            expect(isURL(element.url)).toBe(true);
          });
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('name is valid', function(){
           allFeeds.forEach(function(element){
             expect(element.name).toBeDefined();
             expect(isStr(element.name)).toBe(true);
           });
         });
    });

    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function(){
      let element;
      let menu, spy;

      beforeEach(function(){
        element = document.querySelector('body');
        menu = document.querySelector('.menu-icon-link');
        spy = spyOn(menu, 'click').and.callThrough();
      });
      /* TODO: Write a test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
       it('is hidden by default', function(){
         expect(hasClass(element, 'menu-hidden')).toBe(true);
       });

       /* TODO: Write a test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('visibility changes when clicked', function(){
          //1st Click
          menu.click();
          expect(menu.click).toHaveBeenCalled();
          expect(hasClass(element, 'menu-hidden')).toBe(false);

          //2nd click
          menu.click();
          expect(menu.click).toHaveBeenCalled();
          expect(hasClass(element, 'menu-hidden')).toBe(true);
        });

    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function(){
      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
       beforeEach(function(done) {
         setTimeout(function() {
           loadFeed(0);
           done();
         }, 3000);
       });

       it("loadFeed function called and completed", function(done) {
         let container = document.querySelector('.feed');
         let link = container.firstElementChild;
         let entry = link.firstElementChild;

         let urlvalue = link.getAttributeNode('href').value;
         console.log(urlvalue);
         expect(container.hasChildNodes()).toBe(true);
         expect(hasClass(entry, 'entry')).toBe(true);
         done();
  });
    });

      /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
      /* TODO: Write a test that ensures when a new feed is loaded
       * by the loadFeed function that the content actually changes.
       * Remember, loadFeed() is asynchronous.
       */
       let urlvalue;

       beforeEach(function(done) {
         setTimeout(function() {
           loadFeed(0);
           done();
         }, 3000);
       });
       it("Initial call to loadFeed(0)", function(done) {
         let container = document.querySelector('.feed');
         let link = container.firstElementChild;
         urlvalue = link.getAttributeNode('href').value;
         expect(isURL(urlvalue)).toBe(true);
         done();
       });
       // let link = document.querySelector('.feed').firstElementChild;
       // let urlvalue = link.getAttributeNode('href').value;
       // console.log(urlvalue);

       beforeEach(function(done) {
         setTimeout(function() {
           loadFeed(1);
           done();
         }, 3000);
       });
       it("2nd call to loadFeed(1) - content changed", function(done) {
         let container = document.querySelector('.feed');
         let link = container.firstElementChild;
         let urlvalue2 = link.getAttributeNode('href').value;
         expect(isURL(urlvalue2)).toBe(true);
         expect(urlvalue === urlvalue2).toBe(false);
         done();
       });

    });

}());

function isURL(str){
  let pattern = new RegExp(/^((http[s]?|ftp):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?\s]+)(.*)?(#[\w\-]+)?$/);
  return pattern.test(str);
}

function isStr(str){
  return (typeof str === "string" && str.trim().length > 0 );
}

function hasClass(el, className){
  return (el.classList.contains(className));
}
