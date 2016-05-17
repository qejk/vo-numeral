/**
 * Quantity: A ValueObject that represents an a positive integer value.
 * EJSON compatible, can be transparently used in Meteor.methods and MongoDB.
 */
Quantity = Space.domain.ValueObject.extend('Quantity', {

  // Create with either `new Quantity(1)` or `new Quantity({ value: 1 })`
  Constructor(data) {
    let value = (data && data.value !== undefined) ? data.value : data;
    try {
      Quantity.__super__.constructor.call(this, { value });
    } catch (e) {
      throw new Error(Quantity.ERRORS.invalidType);
    }
    if (value < 0) {
      throw new Error(Quantity.ERRORS.invalidRange);
    }
    Object.freeze(this);
  },

  // Defines the EJSON fields that are automatically serialized
  fields() {
    return {
      value: Match.Integer
    };
  },

  toString() {
    return "" + this.value;
  },

  toNumber() {
    return this.value;
  },

  valueOf() {
    return this.value;
  },

  isEqual(other) {
    return new BigNumber(this.value).isEqual(
      this._instantiateOrReturn(other)
    );
  },

  isGreaterThan(other) {
    return new BigNumber(this.value).isGreaterThan(
      this._instantiateOrReturn(other)
    );
  },

  isGreaterThanOrEqualTo(other) {
    return new BigNumber(this.value).isGreaterThanOrEqualTo(
      this._instantiateOrReturn(other)
    );
  },

  isLessThan(other) {
    return new BigNumber(this.value).isLessThan(
      this._instantiateOrReturn(other)
    );
  },

  isLessThanOrEqualTo(other) {
    return new BigNumber(this.value).isLessThanOrEqualTo(
      this._instantiateOrReturn(other)
    );
  },

  add(other) {
    let result = new BigNumber(this.value).add(
      this._instantiateOrReturn(other)
    ).toNumber();
    return new Quantity({value: result});
  },

  increment() {
    return this.add(new Quantity({value: 1}));
  },

  subtract(other) {
    let result = new BigNumber(this.value).subtract(
      this._instantiateOrReturn(other)
    ).toNumber();
    return new Quantity({value: result});
  },

  decrement() {
    return this.subtract(new Quantity({value: 1}));
  },

  multiply(other) {
    let result = new BigNumber(this.value).multiply(
      this._instantiateOrReturn(other)
    ).toNumber();
    return new Quantity({value: result});
  },

  divide(other) {
    let result = new BigNumber(this.value).divide(
      this._instantiateOrReturn(other)
    ).toNumber();
    return new Quantity({value: result});
  },

  percentage(percentage) {
    let result = new BigNumber(this.value).percentage(percentage).toNumber();
    return new Quantity({value: result});
  },

  delta(other) {
    return new BigNumber(this.value).subtract(
      this._instantiateOrReturn(other)
    ).toNumber();
  },

  _instantiateOrReturn(other) {
    let instance = other;
    if (!(instance instanceof Quantity)) {
      instance = new Quantity(other);
    }
    return instance.value;
  }

});

Quantity.ERRORS = {
  invalidType: 'Quantity must be an integer.',
  invalidRange: 'Quantity must be bigger than 0.'
};

Quantity.prototype.eq = Quantity.prototype.isEqual
Quantity.prototype.isMore = Quantity.prototype.gt = Quantity.prototype.greaterThan = Quantity.prototype.isGreaterThan
Quantity.prototype.gte = Quantity.prototype.greaterThanOrEqualTo = Quantity.prototype.isGreaterThanOrEqualTo
Quantity.prototype.isLess = Quantity.prototype.lt = Quantity.prototype.lessThan = Quantity.prototype.isLessThan
Quantity.prototype.lte = Quantity.prototype.lessThanOrEqualTo = Quantity.prototype.isLessThanOrEqualTo
Quantity.prototype.plus = Quantity.prototype.add
Quantity.prototype.inc = Quantity.prototype.increment
Quantity.prototype.sub = Quantity.prototype.minus = Quantity.prototype.subtract
Quantity.prototype.dec = Quantity.prototype.decrement
Quantity.prototype.div = Quantity.prototype.dividedBy = Quantity.prototype.divide
Quantity.prototype.mul = Quantity.prototype.times = Quantity.prototype.multiply
Quantity.prototype.percent = Quantity.prototype.percentOf = Quantity.prototype.percentage
