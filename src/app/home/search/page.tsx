import SearchResultsPage from '@/components/home/search/search-results-page'

interface SearchPageProps {
  searchParams: {
    q?: string
  }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''

  return <SearchResultsPage initialQuery={query} />
}
