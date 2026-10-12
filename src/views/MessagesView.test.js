import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/vue'
import MessagesView from './MessagesView.vue'

vi.mock('../services/api', () => ({
  fetchMessages: vi.fn().mockResolvedValue([
    { id: 1, date: '2026-10-01', from: 'Padelhallen Sundby', text: 'Din bana är bokad: Bana 2, 15 oktober kl 18.' },
    { id: 2, date: '2026-10-02', from: 'Okänd avsändare', text: '<img src=x onerror=alert(1)>' }
  ])
}))

describe('MessagesView', () => {
  it('visar meddelandets text och avsändare', async () => {
    render(MessagesView)
    expect(await screen.findByText('Din bana är bokad: Bana 2, 15 oktober kl 18.')).toBeInTheDocument()
    expect(screen.getByText(/Padelhallen Sundby/)).toBeInTheDocument()
  })

  it('visar HTML från ett meddelande som text', async () => {
    const { container } = render(MessagesView)
    const hostileText = '<img src=x onerror=alert(1)>'

    expect(await screen.findByText(hostileText)).toBeInTheDocument()
    expect(container.querySelector('img')).toBeNull()
  })
})
