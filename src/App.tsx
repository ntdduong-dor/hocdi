import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import DashboardPage from './components/dashboard/DashboardPage'
import FolderPage from './components/folder/FolderPage'
import LessonPage from './components/lesson/LessonPage'
import StudyPage from './components/study/StudyPage'
import QuizPage from './components/quiz/QuizPage'
import KanjiLessonPage from './components/kanji/KanjiLessonPage'
import KanjiStudyPage from './components/kanji/KanjiStudyPage'
import KanjiQuizPage from './components/kanji/KanjiQuizPage'
import CreateKanjiLessonPage from './components/kanji/CreateKanjiLessonPage'
import GrammarPage from './components/grammar/GrammarPage'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/folder/:folderId" element={<FolderPage />} />
          <Route path="/lesson/:lessonId" element={<LessonPage />} />
          <Route path="/lesson/:lessonId/study" element={<StudyPage />} />
          <Route path="/lesson/:lessonId/quiz" element={<QuizPage />} />
          <Route path="/kanji/new" element={<CreateKanjiLessonPage />} />
          <Route path="/kanji/:kanjiLessonId" element={<KanjiLessonPage />} />
          <Route path="/kanji/:kanjiLessonId/study" element={<KanjiStudyPage />} />
          <Route path="/kanji/:kanjiLessonId/quiz" element={<KanjiQuizPage />} />
          <Route path="/grammar" element={<GrammarPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
