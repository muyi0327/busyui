import Vue from 'vue'
import Input from '../../../packages/input'
import { mount } from '@vue/test-utils'

describe('Input Module', () => {
    it('Input has method install', function () {
        Vue.use(Input)
        expect(Input).to.have.property('install');
        expect(typeof Input.install).to.equal('function');
    })

    it('Default props passes', () => {
        let wrapper = mount(Input, {
            propsData: {
                placeholder: '请输入内容'
            }
        })

        expect(wrapper.vm.disabled).to.be.false
        expect(wrapper.vm.readonly).to.be.false
        expect(wrapper.vm.type).to.be.equal('text')
        expect(wrapper.vm.maxlength).to.be.equal(50)
        expect(wrapper.vm.placeholder).to.be.equal('请输入内容')
    })

    it('Custom props passes', () => {
        let wrapper = mount(Input, {
            propsData: {
                value: 'hello input',
                autofocus: true
            }
        })

        let inputText = wrapper.find('input')
        expect(wrapper.vm.currentValue).to.be.equal('hello input')

        inputText.setValue('hello input change value')
        expect(wrapper.vm.currentValue).to.be.equal('hello input change value')
    })

    it('clear icon visiable', () => {
        let wrapper = mount(Input, {
            propsData: {
                value: 'hello input'
            }
        })

        let inputText = wrapper.find('input')
        expect(wrapper.find('.busy-input__clear').isVisible()).to.be.false

        inputText.trigger('focus')
        expect(wrapper.find('.busy-input__clear').isVisible()).to.be.true
    })

    it('format value', () => {
        let wrapper = mount(Input, {
            propsData: {
                value: '1250000.00',
                format: 'numberic'
            }
        })

        wrapper.find('input').trigger('input')

        return Vue.nextTick().then(() => {
            expect(wrapper.vm.$el.querySelector('input').value).to.be.equal('1,250,000.00')
        })
    })
})
