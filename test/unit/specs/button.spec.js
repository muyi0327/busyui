import Vue from 'vue'
import Button from '../../../packages/button'
import { mount } from '@vue/test-utils'

Vue.use(Button)
var expect = chai.expect;
const ButtonConstructor = Vue.extend(Button)
describe('Button Module', () => {

    describe('Default props', () => {
        it('Default props validation passes', () => {
            var vm = new Vue(Button).$mount()

            expect(data.isThin).to.false
            expect(vm.type).to.be.equal('default')
            expect(vm.size).to.be.equal('normal')
            expect(vm.sharp).to.be.false
        })
    })

    describe('Setting props', () => {
        it('Set the 1 pixel border correctly', () => {
            var wrapper = mount(Button, {
                propsData: {
                    radius: '8px',
                    icon: 'ok'
                }
            })

            expect(wrapper.vm.isThin).to.true
            expect(wrapper.contains('.busy-button__border')).to.be.true
            expect(wrapper.contains('.busy-button__icon')).to.be.true
        })

        it('Property rendering of width/height/type/size is correct', () => {
            var vm = new ButtonConstructor({
                propsData: {
                    type: 'primary',
                    size: 'large',
                    ghost: true,
                    radius: '12px'
                }
            }).$mount()

            expect(vm.$el.classList.contains('busy-button--primary')).to.be.true
            expect(vm.$el.classList.contains('busy-button--large')).to.be.true
        })

        it('Property rendering of size and type is correct', () => {
            var wrapper = mount(Button)
            var vm = wrapper.vm
            wrapper.trigger('click')
        })

        it('Property rendering of content is correct', () => {
            var wrapper = mount(Button, {
                propsData: {
                    content: '测试'
                }
            })

            expect(wrapper.vm.content).to.be.equal('测试')
            expect(wrapper.find('button').text()).to.be.equal('测试')
        })
    })
})
