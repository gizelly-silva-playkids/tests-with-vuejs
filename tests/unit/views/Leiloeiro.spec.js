import { mount } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import Leiloeiro from '@/views/Leiloeiro'
import { getLeilao, getLances } from '@/http'

jest.mock('@/http')

const leilao = {
   produto: 'Sony PlayStation 4',
   lanceInicial: 300,
   descricao: 'Com seu console PlayStation 4 você terá entretenimento garantido todos os dias'
}

describe('LeiloeiroComponentView', () => {

   test('should be display alert when product don\'t have bids yet', async () => {

      getLeilao.mockResolvedValueOnce(leilao)
      getLances.mockResolvedValueOnce([])

      const wrapper = mount(Leiloeiro, {
         propsData: {
            id: 1
         }
      })

      await flushPromises()

      const alert = wrapper.find('.alert-dark')

      expect(alert.exists()).toBe(true)
   })

   test('should be not display alert when product have bids', async () => {

      getLeilao.mockResolvedValueOnce(leilao)
      getLances.mockResolvedValueOnce([
         {
            id: 1,
            valor: 200,
            data: '2022-03-01',
            leilao_id: 1
         }
      ])

      const wrapper = mount(Leiloeiro, {
         propsData: {
            id: 1
         }
      })

      await flushPromises()

      const alert = wrapper.find('.alert-dark')

      expect(alert.exists()).toBe(false)
   })

})