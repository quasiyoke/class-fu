# class-fu &mdash; CSS classes kung fu :)
class-fu is a JavaScript library for manipulating CSS classes.

class-fu is leightweight and doesn't use third-party libraries.

## Example: cooking steaks using class-fu
The problem is to transform every cow on your page (marked with `cow` CSS class) to `well-done`, `delicious` `steak`. It is extremely simple with class-fu:
```javascript
ClassFu(function($){
  $('.cow', '- cow + well-done + delicious + steak');
});
```
Want to know more about this? Enjoy.

### Searching cows on the page
At first, we should collect our herd:
```javascript
var $cows = ClassFu('.cow');
```
Now all your cows are in `$cows` variable.

You may use `$` shortcut for class-fu factory `ClassFu`:
```javascript
var $cows = $('.cow');
```
Original value of `window.$` is saved in `$.previousDollarSign`.
### Transforming cows to steaks
```javascript
$cows.classes('well-done delicious steak');
```
Done! Now every `steak` have *only* `well-done`, `delicious` and, of course, `steak` classes.

What if you want to discriminate male- and female-made steaks? That means: if `cow` has any additional classes like `male` or `female`, we shouldn't touch them. class-fu would help you!

The following construction does exactly this: it *removes* `cow` class and *adds* `well-done`, `delicious` and `steak` classes for every element in `$cows`.
```javascript
$cows.classes({
  remove: ['cow'],
  add: ['well-done', 'delicious', 'steak']
});
```
So, this cow:
```html
<div class="male cow"></div>
```
...would be transformed to:
```html
<div class="well-done delicious male steak"></div>
```
Draw attention to keeping `male` class in this case. Amazing!

### Working with <s>cows</s> classes pure class-fu way
Last construction can be significantly shortened:
```javascript
$cows.classes('- cow + well-done + delicious + steak');
```
Where:

- `-` (minus) means *remove*. E.g. `$cows.classes('- cow')` &mdash; "remove `cow` class".
- `+` (plus) means *add*. E.g. `$cows.classes('+ steak')` &mdash; "add `steak` class".
- ...and `!` (exclamation mark, not introduced in example) means *toggle*. E.g. `$cows.classes('!odd')` &mdash; "toggle `odd` class".

One must:

- not use space in front of classes' command and between `!` (exclamation mark) and class name. 
 - `$cows.classes(' - cow')` &mdash; throws an exception.
 - `$cows.classes('! odd')` &mdash; throws an exception too.
- use space between `-` (minus) or `+` (plus) and class name.
 - `$cows.classes('-cow')` &mdash; **sets class attribute value to `-cow`**.
 - `$cows.classes('+cow')` &mdash; throws an exception.
 
This pretty hard rules were applied partially to enlarge your classes' commands readability, but at most because of necessity of working with minus-prefixed CSS classes like this: `-my-minus-prefixed-css-class`.

### Putting all together
Collecting and transforming:
```javascript
var $cows = $('.cow');
$cows.classes('- cow + well-done + delicious + steak');
```

Of course, you may throw away variable:
```javascript
$('.cow').classes('- cow + well-done + delicious + steak');
```

...and even pass classes' commands right into factory:
```javascript
$('.cow', '- cow + well-done + delicious + steak');
```
### Waiting until content loaded
If you just put your document's objects' manipulating code on the page, it won't work, because browser often runs scripts earlier than page is completely processed. To run your code right after all preparations, you must subscribe on `DOMContentLoaded` event. The simplest way to do it &mdash; use class-fu:
```javascript
ClassFu(function($){
  $('.cow', '- cow + well-done + delicious + steak');
});
```
Notice, we put cows' cooking into function which has `$` shortcut as argument &mdash; class-fu will call this function back when content loaded and pass its factory as first argument. This allows to redefine and use `window.$` as you want.

That's all! Cows will be ready right when you open the page.

## Example: blinking elements using class-fu
Suppose, we should make blink all elements with `blink` class.
```javascript
ClassFu(function($){
  setInterval(function(){
    $('.blink', '!highlighted');
  }, 500);
});
```
Every time inner function will be called, class-fu change `highlighted` class presence &mdash; that means "toggle" highlight.

If you cache your elements, this will work a bit faster:
```javascript
ClassFu(function($){
  var $blink = $('.blink');
  setInterval(function(){
    $blink.classes('!highlighted');
  }, 500);
});
```
Forget this. Never make anything blink on the web, please.