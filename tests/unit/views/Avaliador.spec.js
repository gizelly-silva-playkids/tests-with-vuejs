import { mount, RouterLinkStub } from '@vue/test-utils'
import flushPromises from 'flush-promises'

import Avaliador from '@/views/Avaliador'
import { getLeiloes } from '@/http'

jest.mock('@/http')

const leiloes = [
   {
      produto: 'Sony PlayStation 4',
      lanceInicial: 300,
      descricao: 'Com seu console PlayStation 4 você terá entretenimento garantido todos os dias'
   },
   {
      produto: 'XboX 360',
      lanceInicial: 400,
      descricao: 'Com seu console XboX 360 você terá entretenimento garantido todos os dias'
   },
]

describe('AvaliadorComponentView', () => {

   test('should be list auctions returned from back-end', async () => {
      getLeiloes.mockResolvedValueOnce(leiloes)

      const wrapper = mount(Avaliador, {
         stubs: {
            RouterLink: RouterLinkStub
         }
      })

      await flushPromises()

      const totalAuctionsDisplayed = wrapper.findAll('.leilao').length

      expect(totalAuctionsDisplayed).toBe(leiloes.length)
   })

   test('should return auctions list empty', async () => {
      getLeiloes.mockResolvedValueOnce([])

      const wrapper = mount(Avaliador, {
         stubs: {
            RouterLink: RouterLinkStub
         }
      })

      await flushPromises()

      const totalAuctionsDisplayed = wrapper.findAll('.leilao').length

      expect(totalAuctionsDisplayed).toBe(0)
   })

})