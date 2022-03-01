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

const lances = [
   {
      id: 1,
      valor: 200,
      data: '2022-03-01',
      leilao_id: 1
   },
   {
      id: 1,
      valor: 600,
      data: '2022-03-01',
      leilao_id: 1
   },
   {
      id: 1,
      valor: 850,
      data: '2022-03-01',
      leilao_id: 1
   },
   {
      id: 1,
      valor: 1500,
      data: '2022-03-01',
      leilao_id: 1
   }
]

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
      getLances.mockResolvedValueOnce(lances)

      const wrapper = mount(Leiloeiro, {
         propsData: {
            id: 1
         }
      })

      await flushPromises()

      const alert = wrapper.find('.alert-dark')

      expect(alert.exists()).toBe(false)
   })

   test('should be display the bid largest when product have bids', async () => {
      
      getLeilao.mockResolvedValueOnce(leilao)
      getLances.mockResolvedValueOnce(lances)

      const wrapper = mount(Leiloeiro, {
         propsData: {
            id: 1
         }
      })

      await flushPromises()

      const bidLargest = wrapper.find('.maior-lance').element
      const valueLargest = Math.max.apply(Math,lances.map(i => i.valor))
      expect(bidLargest.textContent).toContain(`Maior lance: R$ ${valueLargest}`)
   })

   test('should be display the bid smallest when product have bids', async () => {

      getLeilao.mockResolvedValueOnce(leilao)
      getLances.mockResolvedValueOnce(lances)

      const wrapper = mount(Leiloeiro, {
         propsData: {
            id: 1
         }
      })

      await flushPromises()

      const bidSmallest = wrapper.find('.menor-lance').element
      const valueSmallest = Math.min.apply(Math,lances.map(i => i.valor))
      expect(bidSmallest.textContent).toContain(`Menor lance: R$ ${valueSmallest}`)
   })

   test('should be display the bids existents when product have bids', async () => {
      
      getLeilao.mockResolvedValueOnce(leilao)
      getLances.mockResolvedValueOnce(lances)

      const wrapper = mount(Leiloeiro, {
         propsData: {
            id: 1
         }
      })

      await flushPromises()

      const bidList = wrapper.find('.list-inline')
      expect(bidList.exists()).toBe(true)
   })

})