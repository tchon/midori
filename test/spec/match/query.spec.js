import {expect} from 'chai';
import sinon from 'sinon';

import tap from '../../../src/tap';
import match from '../../../src/match';
import query from '../../../src/match/query';

describe('query match', () => {
  it('should handle `if` branch', () => {
    const yes = sinon.spy();
    const no = sinon.spy();
    const next = sinon.spy();
    const app = match(
      query({baz: 'world'}),
      tap(yes),
      tap(no)
    )({request: next});

    app.request({
      url: '/foo?bar=hello&baz=world',
    }, {});

    expect(yes).to.be.calledOnce;
    expect(no).to.not.be.calledOnce;
    expect(next).to.be.calledOnce;
  });

  it('should handle `else` branch', () => {
    const yes = sinon.spy();
    const no = sinon.spy();
    const next = sinon.spy();
    const app = match(
      query({baz: 'world', qux: 'hello'}),
      tap(yes),
      tap(no)
    )({request: next});

    app.request({
      url: '/foo?bar=hello&baz=world',
    }, {});

    expect(yes).to.not.be.calledOnce;
    expect(no).to.be.calledOnce;
    expect(next).to.be.calledOnce;
  });

  it('should handle arrays', () => {
    const yes = sinon.spy();
    const no = sinon.spy();
    const next = sinon.spy();
    const app = match(
      query([{baz: 'hello'}, {baz: 'world'}]),
      tap(yes),
      tap(no)
    )({request: next});

    app.request({
      url: '/foo?bar=hello&baz=world',
    }, {});

    expect(yes).to.be.calledOnce;
    expect(no).to.not.be.calledOnce;
    expect(next).to.be.calledOnce;
  });

  it('should handle multiple parameters', () => {
    const yes = sinon.spy();
    const no = sinon.spy();
    const next = sinon.spy();
    const app = match(
      query({baz: 'hello'}),
      tap(yes),
      tap(no)
    )({request: next});

    app.request({
      url: '/foo?bar=hello&baz[]=hello&baz[]=world',
    }, {});

    expect(yes).to.be.calledOnce;
    expect(no).to.not.be.calledOnce;
    expect(next).to.be.calledOnce;
  });
});
