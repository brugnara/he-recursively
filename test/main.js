/**
 * Created by Daniele Brugnara on 4/20/14.
 */

var expect = require('chai').expect
  , assert = require('chai').assert
  //
  , HeRec = require('../')
;

describe('HeRec', function() {

  describe('#decode', function() {

    it('should decode a simple object keeping numbers', function() {
      var obj = {
        num: 1,
        num2: 2
      }
      expect(HeRec.decode(obj).num).to.equal(1);
      expect(HeRec.decode(obj).num2).not.to.equal('2');
    })

    it('should decode a simple object keeping null fields', function() {
      var obj = {
        f1: null,
        f2: null
      }
      //
      expect(HeRec.decode(obj).f1).to.equal(null);
      expect(HeRec.decode(obj).f2).to.equal(null);
    })

    it('should decode a simple object keeping boolean fields', function() {
      var obj = {
        f1: false,
        f2: true
      }
      //
      expect(HeRec.decode(obj).f1).to.equal(false);
      expect(HeRec.decode(obj).f2).to.equal(true);
    })

    it('should decode a object with strings', function() {
      var obj = {
        f1: false,
        f2: null,
        f3: 'string',
        f4: 'string&agrave;'
      }
      //
      expect(HeRec.decode(obj).f3).to.equal('string');
      expect(HeRec.decode(obj).f4).to.equal('stringà');
    })

    it('should decode recursively a object', function() {
      var obj = {
          f1: '&agrave;',
          f2: {
            f1: '&egrave;',
            f2: {
              f1: '&ugrave;'
            }
          },
          f3: [
            '&igrave;',
            1
          ]
        },
        objExpected = {
          f1: 'à',
          f2: {
            f1: 'è',
            f2: {
              f1: 'ù'
            }
          },
          f3: [
            'ì',
            1
          ]
        }
      //
      var result = HeRec.decode(obj);
      assert.deepEqual(result, objExpected);
    })

  })

})
