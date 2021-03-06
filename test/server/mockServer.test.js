import test from 'ava';
const rewire = require("rewire");
const mockServer = rewire('../../server/middleware/mockServer.js');
const matchApi = mockServer.__get__('matchApi');


test('matchApi', t => {
  const apiRule = '/user/:username';
  t.truthy(matchApi('/user/tom', apiRule));
  t.truthy(matchApi('/user/111$$%#$##$#2222222222!!!!!!!', apiRule))
  t.false(matchApi('/user/a/', apiRule))
  t.false(matchApi('/use/a', apiRule))
  
  const apiRule_2 = '/user/:username/kk';
  t.truthy(matchApi('/user/aa/kk', apiRule_2));
  t.truthy(matchApi('/user/!!!###kksdjfks***/kk', apiRule_2));
  t.false(matchApi('/user/aa/aa', apiRule_2));

  const apiRule_3 = '/user/:sdfsdfj/ttt/:sdkfjkj';
  t.truthy(matchApi('/user/a/ttt/b', apiRule_3));
  t.false(matchApi('/user/a/ttt2/b', apiRule_3))


});
