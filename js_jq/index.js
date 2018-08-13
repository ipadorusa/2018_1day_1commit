/**
 * es6를 빠르게 사용할수 있도록 짧은 메소드 제공.
 * User: DEV_JUNG
 * Date: 2018-07-04
 */
const doc = document;
const sel = (v, el = doc) => el.querySelector(v);
const selAll = (v, el = doc) => el.querySelectorAll(v);
const _sel = el => typeof el === 'string' ? sel(el) : el;
const _selAll = el => typeof el === 'string' ? selAll(el) : Array.isArray(el) ? el :[el];
const attr = (el, ...attr) =>( attr.some((k, i)=>{
    if(i % 2 || !el) return;
    const v = attr[i + 1];
    if(typeof el[k] === 'function') el[k](...(Array.isArray(v)? v :[v]));
    else if(k[0] === '@') el.style[k.substr(1)] = v;
    else el[k] = v, k.includes('class', 'value') && el.setAttribute(k, v);
}), el);
const celt = (tag, ...arg)=>attr(typeof tag === 'string' ? doc.createElement(tag) : tag, ...arg);
const prepend =(node, ...el)=>(el.reverse().forEach(v=>node.insertBefore(v, node.firstChild)), node);
const append =(node, ...el)=>(el.forEach(v=>node.appendChild(v)), node);
const err = (v = 'invalid') => { throw v; };
const override = () => err('override');
const prop = (t, p) => Object.assign({},t,p);
const is = (t, p) => t instanceof p;
const ready = f => doc.addEventListener('DOMContentLoaded', f);
const addEvent = (a, el, f) => _selAll(el).forEach(v=>v.addEventListener(a, f));
const removeEvent = (a, el, f) => _selAll(el).forEach(v=>v.removeEventListener(a, f));
const hide = (...arg) => arg.map(v=>attr(_sel(v), '@display', 'none'));
const show = (...arg) => arg.map(v=>attr(_sel(v), '@display', 'inline'));
const sval = (el, v = '') => (v ? _sel(el).value = v : _sel(el).value);
const getId = (() => { const c = {};
    return v => (c[v] = !!c[v] ? c[v] : doc.getElementById(v));
})();
const setAttr = (el, k, v = '') => _sel(el).setAttribute(k, v);
const getAttr = (el, k) => _sel(el).getAttribute(k);
const adjacent = (el, v, pos='beforeend') => _sel(el).insertAdjacentHTML(pos, v);
const prependHtml = (el, v) => adjacent(el, v, 'afterbegin');
const appendHtml = (el, v) => adjacent(el, v, 'beforeend');
