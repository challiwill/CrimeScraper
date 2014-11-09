// var cheerio = require('cheerio');
// $ = cheerio.load('<html><head></head><body><div id="content"><div id="sidebar"></div><div id="main"><div id="breadcrumbs"></div><table id="data"><tr><th>Name</th><th>Address</th></tr><tr><td class="name">John</td><td class="address">Address of John</td></tr><tr><td class="name">Susan</td><td class="address">Address of Susan</td></tr></table></div></div></body></html>');

// $('#data .name').each(function() {
//     console.log($(this).text());
// });

function main() 
{
    var a = 1;
    var f = (function(a) { return function() { console.log(a); } })(a);
    a = 2; 
    f();
}
main();
