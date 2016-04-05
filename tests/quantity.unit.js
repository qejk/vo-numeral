describe("Quantity", function() {

  beforeEach(function() {
    this.quantity = new Quantity(9);
  });

  it('is serializable', function() {
    let copy = EJSON.parse(EJSON.stringify(this.quantity));
    expect(copy.equals(this.quantity)).to.be.true;
  });

  // =============== CONSTRUCTION ================ //

  describe('construction', function() {

    it('takes a positive integer bigger or equal to 0', function() {
      expect(new Quantity(0).value).to.equal(0);
      expect(new Quantity(1).value).to.equal(1);
      expect(new Quantity(20).value).to.equal(20);
      expect(new Quantity(9999).value).to.equal(9999);
    });

    it('does not allow values outside the boundaries', function() {
      expect(function() {
        return new Quantity(-1);
      }).to.throw(Quantity.ERRORS.invalidRange);
    });

    it('only takes integer values', function() {

      expect(function() {
        return new Quantity(20.50);
      }).to.throw(Quantity.ERRORS.invalidType);

      expect(function() {
        return new Quantity("5");
      }).to.throw(Quantity.ERRORS.invalidType);

    });
  });

  // =============== COMPARISON ================ //

  describe('comparison', function() {

    describe('equality', function() {

      it('returns true for same values', function() {
        expect(new Quantity(1).equals(new Quantity(1))).to.be.true;
      });

      it('returns false for different values', function() {
        expect(new Quantity(2).equals(new Quantity(6))).to.be.false;
      });

    });

    describe('isEqual', function() {

      it('returns true for same values', function() {
        expect(new Quantity(1).isEqual(new Quantity(1))).to.be.true;
      });

      it('returns false for different values', function() {
        expect(new Quantity(2).isEqual(new Quantity(6))).to.be.false;
      });

      it('throws error if quantity is not a valid quantity', function() {
        expect(function() {
          new Quantity(5).isEqual('abcd');
        }).to.throw(Error);
      });

      it("also handles plain values", function() {
        expect(new Quantity(2).isEqual(2)).to.be.true;
        expect(new Quantity(2).isEqual(1)).to.be.false;
      });

      it('aliases', function() {
        expect(Quantity.prototype.eq === Quantity.prototype.isEqual).to.be.true;
      });

    });

    describe('isGreaterThan', function() {

      it('compares two quantities', function() {
        let value1 = new Quantity(2);
        let value2 = new Quantity(1);
        expect(value1.isGreaterThan(value2)).to.be.true;
        expect(value2.isGreaterThan(value1)).to.be.false;
      });

      it('throws error if quantity is not a valid quantity', function() {
        expect(function() {
          new Quantity(5).isGreaterThan('abcd');
        }).to.throw(Error);
      });

      it("also handles plain values", function() {
        expect(new Quantity(2).isGreaterThan(1)).to.be.true;
        expect(new Quantity(1).isGreaterThan(2)).to.be.false;
      });

      it('aliases', function() {
        expect(
          Quantity.prototype.greaterThan === Quantity.prototype.isGreaterThan
        ).to.be.true;
        expect(
          Quantity.prototype.gt === Quantity.prototype.isGreaterThan
        ).to.be.true;
        expect(
          Quantity.prototype.isMore === Quantity.prototype.isGreaterThan
        ).to.be.true;
      });

    });

    describe('isGreaterThanOrEqualTo', function() {

      it('compares two quantities', function() {
        let value1 = new Quantity(2);
        let value2 = new Quantity(2);
        expect(value1.isGreaterThanOrEqualTo(value2)).to.be.true;
        expect(value2.isGreaterThanOrEqualTo(value1)).to.be.true;
      });

      it('throws error if quantity is not a valid quantity', function() {
        expect(function() {
          new Quantity(5).isGreaterThanOrEqualTo('abcd');
        }).to.throw(Error);
      });

      it("also handles plain values", function() {
        expect(new Quantity(2).isGreaterThanOrEqualTo(1)).to.be.true;
        expect(new Quantity(2).isGreaterThanOrEqualTo(2)).to.be.true;
        expect(new Quantity(1).isGreaterThanOrEqualTo(2)).to.be.false;
      });

      it('aliases', function() {
        expect(
          Quantity.prototype.greaterThanOrEqualTo === Quantity.prototype.isGreaterThanOrEqualTo
        ).to.be.true;
        expect(
          Quantity.prototype.gte === Quantity.prototype.isGreaterThanOrEqualTo
        ).to.be.true;
      });

    });

    describe('isLessThan', function() {

      it('compares two quantities', function() {
        let value1 = new Quantity(1);
        let value2 = new Quantity(2);
        expect(value1.isLessThan(value2)).to.be.true;
        expect(value2.isLessThan(value1)).to.be.false;
      });

      it('throws error if quantity is not a valid quantity', function() {
        expect(function() {
          new Quantity(5).isLessThan('abcd');
        }).to.throw(Error);
      });


      it("also handles plain values", function() {
        expect(new Quantity(1).isLessThan(2)).to.be.true;
        expect(new Quantity(2).isLessThan(1)).to.be.false;
      });

      it('aliases', function() {
        expect(
          Quantity.prototype.lessThan === Quantity.prototype.isLessThan
        ).to.be.true;
        expect(
          Quantity.prototype.lt === Quantity.prototype.isLessThan
        ).to.be.true;
        expect(
          Quantity.prototype.isLess === Quantity.prototype.isLessThan
        ).to.be.true;
      });

    });

    describe('isLessThanOrEqualTo', function() {

      it('compares two quantities', function() {
        let value1 = new Quantity(2);
        let value2 = new Quantity(2);
        expect(value1.isLessThanOrEqualTo(value2)).to.be.true;
        expect(value2.isLessThanOrEqualTo(value1)).to.be.true;
      });

      it('throws error if quantity is not a valid quantity', function() {
        expect(function() {
          new Quantity(5).isLessThanOrEqualTo('abcd');
        }).to.throw(Error);
      });

      it("also handles plain values", function() {
        expect(new Quantity(1).isLessThanOrEqualTo(2)).to.be.true;
        expect(new Quantity(1).isLessThanOrEqualTo(1)).to.be.true;
        expect(new Quantity(2).isLessThanOrEqualTo(1)).to.be.false;
      });

      it('aliases', function() {
        expect(
          Quantity.lessThanOrEqualTo === Quantity.isLessThanOrEqualTo
        ).to.be.true;
        expect(
          Quantity.prototype.lte === Quantity.prototype.isLessThanOrEqualTo
        ).to.be.true;
      });

    });
  });

  // =============== MATH ================ //

  describe('math', function() {

    describe("addition", function() {

      it("returns a new quantity with the sum of both", function() {
        sum = new Quantity(1).add(new Quantity(2));
        expect(sum).to.be.instanceof(Quantity);
        expect(sum.value).to.equal(3);
      });

      it("also handles plain values", function() {
        result = new Quantity(1).add(2);
        expect(result).to.be.instanceof(Quantity);
        expect(result.value).to.equal(3);
      });

      it("throws error if plain number is not a valid quantity", function() {
        expect(function() {
          new Quantity(1).add(-1);
        }).to.throw(Quantity.ERRORS.invalidRange);
      });

      it("throws error if plain number is not a integer", function() {
        expect(function() {
          new Quantity(1).add(0.2);
        }).to.throw(Error);
      });

      it('aliases', function() {
        expect(Quantity.prototype.plus === Quantity.prototype.add).to.be.true;
      });

    });

    describe("subtraction", function() {

      it("returns a new quantity with the difference of both", function() {
        difference = new Quantity(2).subtract(new Quantity(1));
        expect(difference).to.be.instanceof(Quantity);
        expect(difference.value).to.equal(1);
      });

      it("also handles plain values", function() {
        result = new Quantity(2).subtract(1);
        expect(result).to.be.instanceof(Quantity);
        expect(result.value).to.equal(1);
      });

      it("throws error if plain number is not a valid quantity", function() {
        expect(function() {
          new Quantity(1).subtract(-1);
        }).to.throw(Quantity.ERRORS.invalidRange);
      });

      it("throws error if plain number is not a integer", function() {
        expect(function() {
          new Quantity(1).subtract(0.2);
        }).to.throw(Error);
      });

      it('aliases', function() {
        expect(
          Quantity.prototype.minus === Quantity.prototype.subtract
        ).to.be.true;
        expect(
          Quantity.prototype.sub === Quantity.prototype.subtract
        ).to.be.true;
      });

    });

    describe('multiplication', function() {

      it('returns a new quantity with value multiplied by another', function() {
        value1 = new Quantity(2);
        value2 = new Quantity(2);
        let result = value1.multiply(value2);
        expect(result).to.be.instanceof(Quantity);
        expect(result.value).to.equal(4);
      });

      it("also handles plain values", function() {
        result = new Quantity(2).multiply(2);
        expect(result).to.be.instanceof(Quantity);
        expect(result.value).to.equal(4);
      });

      it("throws error if plain number is not a valid quantity", function() {
        expect(function() {
          new Quantity(1).multiply(-1);
        }).to.throw(Quantity.ERRORS.invalidRange);
      });

      it("throws error if plain number is not a integer", function() {
        expect(function() {
          new Quantity(1).multiply(0.2);
        }).to.throw(Error);
      });

      it('aliases', function() {
        expect(
          Quantity.prototype.mul === Quantity.prototype.multiply
        ).to.be.true;
        expect(
          Quantity.prototype.times === Quantity.prototype.multiply
        ).to.be.true;
      });

    });

    describe('division', function() {

      it('returns a new quantity with value divided by another', function() {
        let value1 = new Quantity(4);
        let value2 = new Quantity(2);
        let result = value1.divide(value2);
        expect(result).to.be.instanceof(Quantity);
        expect(result.value).to.equal(2);
      });

      it("also handles plain values", function() {
        result = new Quantity(4).divide(2);
        expect(result).to.be.instanceof(Quantity);
        expect(result.value).to.equal(2);
      });

      it("throws error if plain number is not a valid quantity", function() {
        expect(function() {
          new Quantity(1).divide(-1);
        }).to.throw(Quantity.ERRORS.invalidRange);
      });


      it("throws error if result of division is not a integer", function() {
        expect(function() {
          new Quantity(2).divide(4);
        }).to.throw(Error);
      });

      it("throws error if plain number is not a integer", function() {
        expect(function() {
          new Quantity(1).divide(0.2);
        }).to.throw(Error);
      });

      it('aliases', function() {
        expect(
          Quantity.prototype.div === Quantity.prototype.divide
        ).to.be.true;
        expect(
          Quantity.prototype.dividedBy === Quantity.prototype.divide
        ).to.be.true;
      });

    });

    describe("percentage", function() {
      it('returns percent of a value', function() {
        let result = new Quantity(100).percentage(20);

        expect(result).to.be.instanceof(Quantity);
        expect(result.value).to.be.equal(20);
      });

      it("throws error if percentage is not a number", function() {
        expect(function() {
          new Quantity(1).percentage(new Quantity(1));
        }).to.throw(Error);
      });

      it('aliases', function() {
        expect(
          Quantity.prototype.percent === Quantity.prototype.percentage
        ).to.be.true;
        expect(
          Quantity.prototype.percentOf === Quantity.prototype.percentage
        ).to.be.true;
      });
    });

    describe("delta", function() {
      it("returns the delta", function() {
        let value1 = new Quantity(6);
        let value2 = new Quantity(2);
        expect(value1.delta(value2)).to.equal(4);
        expect(value2.delta(value1)).to.equal(-4);
      });

      it("also handles plain values", function() {
        result = new Quantity(6).delta(2);
        expect(typeof result == 'number').to.be.true;
        expect(result).to.equal(4);
      });

      it("throws error if plain number is not a valid quantity", function() {
        expect(function() {
          new Quantity(1).delta(-1);
        }).to.throw(Quantity.ERRORS.invalidRange);
      });

      it("throws error if plain number is not a integer", function() {
        expect(function() {
          new Quantity(1).delta(0.2);
        }).to.throw(Error);
      });

    });

    describe("calculating the delta between quantities", function() {

      it("returns the difference", function() {
        expect(new Quantity(2).delta(new Quantity(1))).to.equal(1);
        expect(new Quantity(1).delta(new Quantity(3))).to.equal(-2);
      });

      it("also handles plain numbers", function() {
        expect(new Quantity(2).delta(1)).to.equal(1);
        expect(new Quantity(1).delta(3)).to.equal(-2);
      });

    });

  });

  // =============== IMMUTABILITY ================ //

  describe('immutability', function() {

    it('freezes itself', function() {
      expect(Object.isFrozen(this.quantity)).to.be.true;
    });

  });
});
