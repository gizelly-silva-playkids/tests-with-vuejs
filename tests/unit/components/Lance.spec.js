import { mount } from '@vue/test-utils'

import Lance from '@/components/Lance'

describe('LanceComponent', () => {

   test('should be not accept bids when value is invalid', () => {
      const wrapper = mount(Lance)
      const input = wrapper.find('input')

      input.setValue(-5000)
      wrapper.trigger('submit')

      const emittedBids = wrapper.emitted('novo-lance')
      expect(emittedBids).toBeUndefined()
   })

   test('should be accept bids when value is valid', () => {
      const wrapper = mount(Lance)
      const input = wrapper.find('input')

      input.setValue(5000)
      wrapper.trigger('submit')

      const emittedBids = wrapper.emitted('novo-lance')
      expect(emittedBids).toHaveLength(1)
   })

   test('should be have bid bigger than value minimum when the value minimum is passed', () => {
      const minimumValue = 1000
      const wrapper = mount(Lance, {
         propsData: {
            lanceMinimo: minimumValue
         }
      })
      const input = wrapper.find('input')
      
      input.setValue(3000)
      wrapper.trigger('submit')

      const emittedBids = wrapper.emitted('novo-lance')
      expect(emittedBids).toHaveLength(1)
   })

   test('should not have bid minor than value minimum when the value minimum is passed', () => {
      const minimumValue = 1000
      const wrapper = mount(Lance, {
         propsData: {
            lanceMinimo: minimumValue
         }
      })
      const input = wrapper.find('input')
      
      input.setValue(800)
      wrapper.trigger('submit')

      const emittedBids = wrapper.emitted('novo-lance')
      expect(emittedBids).toBeUndefined()
   })

   test('should be show error alert when bid is minor than value minimum passed', async () => {
      const minimumValue = 1000
      const wrapper = mount(Lance, {
         propsData: {
            lanceMinimo: minimumValue
         }
      })

      const input = wrapper.find('input')
      input.setValue(800)
      wrapper.trigger('submit')

      await wrapper.vm.$nextTick()

      const errorMsg = wrapper.find('p.alert').element.textContent
      const expectedMsg = `O valor mínimo para o lance é de R$ ${minimumValue}`
      expect(errorMsg).toContain(expectedMsg)
   })

})