import test from 'ava';
import Color4 from '../src/Color4';

test('parse is correct', (t) => {
  t.truthy(!!Color4.parse("green", true));
  t.truthy(!!Color4.parse("#000", true));
  t.truthy(!!Color4.parse("#FFFF", true));
  t.truthy(!!Color4.parse("#000FFFFF", true));
  t.truthy(!!Color4.parse("rgb(0,0,0)", true));
  t.truthy(!!Color4.parse("rgba(0,0,0,0)", true));
  t.truthy(!!Color4.parse(" rgb  ( 0 , 0 , 0 ) ", true));
  t.truthy(!!Color4.parse(" rgba  ( 0 , 0 , 0 , 0 ) ", true));
  t.truthy(!!Color4.parse("rgb(1,255,0)", true));
  t.truthy(!!Color4.parse("rgba(1,255,0,0.3141)", true));
  t.truthy(!!Color4.parse("rgba(1,255,0,0)", true));
  t.truthy(!!Color4.parse("rgba(1,255,0,1)", true));


  t.truthy(!Color4.parse("gree", true));
  t.truthy(!Color4.parse("#00g", true));
  t.truthy(!Color4.parse("#FFFFF", true));
  t.truthy(!Color4.parse("#000gFF", true));
  t.truthy(!Color4.parse("rgb(-1,0,0)", true));
  t.truthy(!Color4.parse("rgb (0,,0)", true));
  t.truthy(!Color4.parse("rgb(,0,0)", true));
  t.truthy(!Color4.parse("rgb(0,0,0,0)", true));
  t.truthy(!Color4.parse("rgb(0,0,0", true));
  t.truthy(!Color4.parse("rgb(0,0,0))", true));
  t.truthy(!Color4.parse("rgba(-1,0,0,0)", true));
  t.truthy(!Color4.parse("rgba (0,,0)", true));
  t.truthy(!Color4.parse("rgba(,0,0)", true));
  t.truthy(!Color4.parse("rgba(0,0,0,5)", true));
  t.truthy(!Color4.parse("rgba(0,0,0", true));
  t.truthy(!Color4.parse("rgba(0,0,0))", true));
});
