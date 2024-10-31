import SearchBox from './components/search-box';
import SearchResult from './components/search-result';

export default function App() {
  return (
    <SearchBox className="fixed right-8 top-20 z-50">
      <SearchResult keyword="test" />
    </SearchBox>
  );
}
