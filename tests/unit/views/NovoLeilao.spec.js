import { mount } from '@vue/test-utils'

import NovoLeilao from '@/views/NovoLeilao'
import { createLeilao } from '@/http'

jest.mock('@/http')

const $router = {
   push: jest.fn()
}

describe('NovoLeilaoComponentView', () => {

   test('should be create a new auction when form is filled correctly', () => {
      createLeilao.mockResolvedValueOnce()

      const wrapper = mount(NovoLeilao, {
         mocks: {
            $router
         }
      })

      wrapper.find('.valor').setValue(300)
      wrapper.find('.produto').setValue('Sony PlayStation 4')
      wrapper.find('.descricao').setValue('Entretenimento garantido todos os dias')
      wrapper.find('form').trigger('submit')

      expect(createLeilao).toHaveBeenCalled()
   })
})