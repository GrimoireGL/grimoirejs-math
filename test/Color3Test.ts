import test from 'ava';
import Color3 from '../src/Color3';

test('parse is correct', (t) => {

  t.truthy(Color3.parse("green", true));
  t.truthy(Color3.parse("#000", true));
  t.truthy(Color3.parse("#FFF", true));
  t.truthy(Color3.parse("#000FFF", true));
  t.truthy(Color3.parse("rgb(0,0,0)", true));
  t.truthy(Color3.parse(" rgb  ( 0 , 0 , 0 ) ", true));
  t.truthy(Color3.parse("rgb(1,255,0)", true));

  t.truthy(!Color3.parse("gree", true));
  t.truthy(!Color3.parse("#00g", true));
  t.truthy(!Color3.parse("#FFFF", true));
  t.truthy(!Color3.parse("#000gFF", true));
  t.truthy(!Color3.parse("rgb(-1,0,0)", true));
  t.truthy(!Color3.parse("rgb (0,,0)", true));
  t.truthy(!Color3.parse("rgb(,0,0)", true));
  t.truthy(!Color3.parse("rgb(0,0,0,0)", true));
  t.truthy(!Color3.parse("rgb(0,0,0", true));
  t.truthy(!Color3.parse("rgb(0,0,0))", true));
});
