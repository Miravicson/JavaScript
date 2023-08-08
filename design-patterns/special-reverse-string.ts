import { strict as assert } from 'node:assert';

function comp(i: number, length: number) {
  const i_comp = length - 1 - i;
  return i_comp;
}

function swap(arr: Array<any>, i: number, i_comp: number) {
  [arr[i_comp], arr[i]] = [arr[i], arr[i_comp]];
}

/**
 *
 * @param string>
 * @returns string: the string should be reversed according to the following conditions
 * 1. while reversing the string maintain the same position for non-string characters like ',', '#', '(', ')' and ' '
 * for other characters reverse them.
 */
function reverse(str: string): string {
  const arr = str.split('');
  const length = arr.length;
  for (let i = 0; i < Math.floor(length / 2); ++i) {
    const i_comp = comp(i, length);
    swap(arr, i, i_comp);
  }
  return arr.join('');
}

function main_reverse(str: string): string {
  const arr = str.split('');
  const specialCharsPos: Array<[number, string]> = []; // [[1, '#']]
  const specialChars = new Set([',', '#', '(', ')']);
  const normStringArr = [];
  for (let i = 0; i < arr.length; ++i) {
    const char = arr[i];
    if (specialChars.has(char)) {
      specialCharsPos.push([i, char]);
    } else {
      normStringArr.push(char);
    }
  }

  const revNormString = reverse(normStringArr.join(''));
  const revStringArr = revNormString.split('');

  for (const [pos, char] of specialCharsPos) {
    revStringArr.splice(pos, 0, char);
  }

  return revStringArr.join('');
}

function test() {
  const input1 = 'abc';
  const output1 = 'cba';
  const input2 = 'b#dfa';
  const output2 = 'a#fdb';
  const input3 = 'e(fd#cg';
  const output3 = 'g(cd#fe';

  assert.equal(main_reverse(input1), output1);
  assert.equal(main_reverse(input2), output2);
  assert.equal(main_reverse(input3), output3);
  console.log(`ALL TEST PASSED`);
}

test();
