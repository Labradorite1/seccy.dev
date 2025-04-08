export default interface GMReportSearchResult {
  result: {
    results: GMReportSearchSingleResult[] | null;
  };
}

interface GMReportSearchSingleResult {
  id: string;
  display_name: string;
  display_code: number;
  emblem_hash: number;
  vanity: string;
}
