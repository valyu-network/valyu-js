const { Valyu } = require('../src/api');
const assert = require('assert');

async function runTests() {
  console.log('Running Valyu SDK tests...');

  // Test constructor
  console.log('\nTesting constructor...');
  try {
    const valyu = new Valyu('H5TkbtiBau8WZDkthZZAlqp695btCXk9kZFiG2W9');
    assert(valyu instanceof Valyu, 'Should create Valyu instance');
    console.log('✓ Constructor test passed');
  } catch (e) {
    console.error('✗ Constructor test failed:', e.message);
  }

  // Test API call
  console.log('\nTesting API call...');
  try {
    const valyu = new Valyu('H5TkbtiBau8WZDkthZZAlqp695btCXk9kZFiG2W9');
    const response = await valyu.context(
      'Test query',
      'web',
      1,
      1,
      10
    );
    
    // Verify response structure
    assert(typeof response === 'object', 'Response should be an object');
    assert('success' in response, 'Response should have success field');
    assert('results' in response, 'Response should have results field');
    console.log('✓ API call test passed');
  } catch (e) {
    console.error('✗ API call test failed:', e.message);
  }
}

runTests().catch(console.error); 