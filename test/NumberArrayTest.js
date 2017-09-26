import test from 'ava';
import NumberArrayConverter from '../lib-es5/Converters/NumberArrayConverter';

test('parse from string', (t) => {
    const arr = NumberArrayConverter("1,2,3,4,5");
    const correct = [1,2,3,4,5];
    t.true(arr instanceof Float32Array);
    t.true(correct.filter((v,i)=>arr[i] !== v).length === 0);
    t.true(arr.length === correct.length);
});


test('parse from raw array', (t) => {
    const arr = NumberArrayConverter([1,2,3,4,5]);
    const correct = [1,2,3,4,5];
    t.true(arr instanceof Float32Array);
    t.true(correct.filter((v,i)=>arr[i] !== v).length === 0);
    t.true(arr.length === correct.length);
});


test('parse from Float32Array', (t) => {
    const arr = NumberArrayConverter(new Float32Array([1,2,3,4,5]));
    const correct = [1,2,3,4,5];
    t.true(arr instanceof Float32Array);
    t.true(correct.filter((v,i)=>arr[i] !== v).length === 0);
    t.true(arr.length === correct.length);
});