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
            var data = Button.data()
            expect(typeof Button.data).to.equal('function')
            expect(data.isThin).to.false
            expect(vm.type).to.be.equal('default')
            expect(vm.size).to.be.equal('normal')
            expect(vm.plain).to.be.false
            expect(vm.sharp).to.be.false
        })
    })

    describe('Setting props', () => {
        it('Set the 1 pixel border correctly', () => {
            var wrapper = mount(Button, {
                propsData: {
                    borderWidth: 1,
                    borderRadius: '8px',
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
                    width: 90,
                    height: 40,
                    type: 'primary',
                    size: 'large',
                    fontSize: 16,
                    ghost: true,
                    bgColor: 'red',
                    borderRadius: '12px'
                }
            }).$mount()

            expect(vm.$el.style.height).to.be.equal('40px')
            expect(vm.$props.height).to.be.equal(40)
            expect(vm.$el.style.width).to.be.equal('90px')
            expect(vm.$props.height).to.be.equal(40)
            expect(vm.$el.style.fontSize).to.be.equal('16px')
            expect(vm.$el.style.background).to.be.equal('transparent')
            expect(vm.$props.fontSize).to.be.equal(16)
            expect(vm.$el.classList.contains('busy-button--primary')).to.be.true
            expect(vm.$el.classList.contains('busy-button--large')).to.be.true
        })

        it('Property rendering of unit is correct', () => {
            var wrapper = mount(Button, {
                propsData: {
                    width: '50rem',
                    height: '20%',
                    bgColor: 'rgba(0,2555,100,0.6)',
                    disabled: true
                }
            })
            let styles = wrapper.element.style
            expect(styles.width).to.be.equal('50rem')
            expect(wrapper.vm.width).to.be.equal('50rem')
            expect(styles.height).to.be.equal('20%')
            expect(styles.background).to.be.equal('rgba(0, 255, 100, 0.6)')
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
