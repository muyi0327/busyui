import Vue from 'vue'
import Button from '../../../packages/button'

var expect = chai.expect;
const ButtonConstructor = Vue.extend(Button)
describe('Button Module', () => {


    describe('sets the correct default props', () => {
        it('sets the correct default data', () => {
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

    describe('#props', () => {
        it('render the correct borderWidth to 1', () => {
            var vm = new ButtonConstructor({
                propsData: {
                    borderWidth: 1
                }
            }).$mount()

            expect(vm.$data.isThin).to.true
        })

        it('render the correct height or width', () => {
            var vm = new ButtonConstructor({
                propsData: {
                    width: 90,
                    height: 40
                }
            }).$mount()

            expect(vm.$el.style.height).to.be.equal('40px')
            expect(vm.$props.height).to.be.equal(40)
            expect(vm.$el.style.width).to.be.equal('90px')
            expect(vm.$props.height).to.be.equal(40)
        })

        it('render correctly with content', () => {
            var vm = new ButtonConstructor({
                propsData: {
                    content: '测试'
                }
            }).$mount()

            expect(vm.$el.querySelector('label').innerText).to.be.equal('测试')
        })
    })
})
