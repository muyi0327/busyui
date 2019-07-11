

import Icon from '../../../packages/icon/index.js';
import Vue from 'vue';

Vue.use(Icon);
var expect = chai.expect;

describe('Icon Module:', function () {
    it('Icon has method install', function () {
        expect(Icon).to.have.property('install');
    });

    describe('#install', function () {
        it('Icon.install is a function', function () {
            expect(typeof Icon.install).to.equal('function');
        });
    });

    describe('create instance of Icon:', function () {
        const vm = new Vue(Icon).$mount()

        it('is the classList of the instance contain busy-icon', function () {
            expect(vm.$el.classList.contains('busy-icon')).to.be.true;
        });
    });
});
