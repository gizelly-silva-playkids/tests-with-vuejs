import { mount } from '@vue/test-utils'

import Leilao from '@/components/Leilao'

const leilao = {
   produto: 'Sony PlayStation 4',
   lanceInicial: 300,
   descricao: 'Com seu console PlayStation 4 você terá entretenimento garantido todos os dias'
}

describe('LeilaoComponent', () => {
   test('should be show auction data in the card', () => {
      const wrapper = mount(Leilao, {
         propsData: {
            leilao
         }
      })

      const header = wrapper.find('.card-header').element
      const title = wrapper.find('.card-title').element
      const text = wrapper.find('.card-text').element

      expect(header.textContent).toContain(`Estamos leiloando um(a): ${leilao.produto}`)
      expect(title.textContent).toContain(`Lance inicial: R$ ${leilao.lanceInicial}`)
      expect(text.textContent).toContain(leilao.descricao)
   })
})