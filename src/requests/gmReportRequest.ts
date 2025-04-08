import GMReportSearchResult from "../types/gmReportSearchResult";

async function GMReportSearchPlayer(input: string): Promise<GMReportSearchResult> {
  return await (
    await fetch("https://api.gm.report/Autocomplete", {
      method: "POST",
      headers: {
        "X-API-KEY": "Lab",
      },
      body: JSON.stringify({ input }),
    })
  ).json();
}

export { GMReportSearchPlayer };
