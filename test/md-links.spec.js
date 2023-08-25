const fs = require('fs');
const path = require('path');
const functions = require('../functions.js');

describe('thePathExistOrNot', () => {
  it('should return true if the path exists', () => {
    const existingPath = 'C:\\Users\\ldcpd\\Desktop\\Md-Lindks\\DEV008-md-links\\examplesOfLinks\\linksMd.md';
    const result = functions.thePathExistOrNot(existingPath);
    expect(result).toBe(true);
  });

  it('should return false if the path does not exist', () => {
    const nonExistingPath = '/path/that/does/not/exist';
    const result = functions.thePathExistOrNot(nonExistingPath);
    expect(result).toBe(false);
  });
});
