import Vue from 'vue'
import Icon from '../../../packages/icon/index.js'
import { mount } from '@vue/test-utils'

Vue.use(Icon);
var expect = chai.expect;

describe('Icon Module:', function () {
    it('Icon has method install', function () {
        expect(Icon).to.have.property('install');
        expect(typeof Icon.install).to.equal('function');
    });

    describe('create instance of Icon:', function () {
        var vm = new Vue(Icon).$mount()

        it('is the classList of the instance contain busy-icon', function () {
            expect(vm.$el.classList.contains('busy-icon')).to.be.true;
        });
    });

    describe('Trigger event click', function () {
        var wrapper = mount(Icon)
        wrapper.trigger('click')
    });
});
