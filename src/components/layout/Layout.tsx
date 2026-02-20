import { Outlet } from 'react-router-dom'
import Header from './Header'
import { useSeedN3Kanji } from '../../hooks/useSeedN3Kanji'
import { KanjiLookupProvider } from '../ui/KanjiTooltip'

export default function Layout() {
  useSeedN3Kanji()

  return (
    <KanjiLookupProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-6xl mx-auto px-4 py-6">
          <Outlet />
        </main>
      </div>
    </KanjiLookupProvider>
  )
}
